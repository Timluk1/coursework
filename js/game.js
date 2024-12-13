import { FirstLevel } from "./levels/firstLevel/firstLevel.js"
import { SecondLevel } from "./levels/secondLevel/secondLevel.js"
import { ThirdLevel } from "./levels/thirdLevel/thirdLevel.js"
import { Timer } from "./timer.js"
import { Modal } from "./modal.js"
import { getRandomType } from "./levels/global.js"
import { localStorageManager } from "./localStorageManager.js"

const getPointsFirstLevel = (firstLevel) => {
    const { isCorrect, firstPoint, secondPoint } = firstLevel.checkDistribution()
    if (isCorrect) {
        return {
            points: Number(firstPoint) + Number(secondPoint),
            maxPoints: 10
        };
    }
    return false;
}

const defaultState = {
    firstLevel: {
        maxPoints: null,
        points: null,
    },
    secondLevel: {
        maxPoints: null,
        points: null,
    },
    thirdLevel: {
        maxPoints: null,
        points: null,
    }
}

class Game {
    constructor() {
        this.pointsState = defaultState;

//        this.firstLevel = new FirstLevel(getRandomType()).init()
        this.secondLevel = null;
        this.thirdLevel = new ThirdLevel().init();

        this.timer = new Timer(60 * 4, () => this.onEndTimer()).init()
        this.modal = new Modal();

        this.activeLevel = "first";
        this.activeLevelDom = null;
        this.buttonRestart = null;
        this.buttonNextLevel = null;

        this.gameComplete = false;
    }

    init() {
        this.getDomElements()
        this.addListeners()
    }

    getDomElements() {
        this.buttonNextLevel = document.getElementById("next-level")
        this.buttonRestart = document.getElementById("restart")
        this.activeLevelDom = document.getElementById("level")
    }

    addListeners() {
        this.buttonNextLevel.addEventListener('click', () => this.onNextLevel())
        this.buttonRestart.addEventListener("click", () => this.onClickRestart())
    }

    onNextLevel() {
        switch (this.activeLevel) {
            case "first":
                const points = getPointsFirstLevel(this.firstLevel)
                if (points) {
                    this.pointsState.firstLevel = points;

                    this.modal.openModal()
                    this.modal.changeModalText(`Баллы за первый уровень: ${points.points} из ${points.maxPoints} баллов`)
                    
                    this.changeActiveLevel("second")
                } else {
                    this.modal.changeModalText("Вы не добавили все числа в ячейки, чтобы перейти на следующий уровень. Пожалуйста, попробуйте еще раз")
                    this.modal.openModal()
                }
                break;
            case "second":
                if (!this.secondLevel.inputIsClear()) {
                    let modalMessage = ""
                    if (this.secondLevel.checkCorrectAnswer()) {
                        this.pointsState.secondLevel = {
                            points: 10,
                            maxPoints: 10
                        };
                        modalMessage = "Вы получили за второй уровень: 10 из 10 баллов"
                    } else {
                        this.pointsState.secondLevel = {
                            points: 0,
                            maxPoints: 10
                        };
                        modalMessage = "Вы получили за второй уровень: 0 из 10 баллов"
                    }
                    this.modal.changeModalText(modalMessage)
                    this.modal.openModal()

                    this.changeActiveLevel("third")
                } else {
                    // open modal with message
                    this.modal.changeModalText("Вы не ввели ответ, попробуйте еще раз")
                    this.modal.openModal()
                }
                break;
            case "third":
                this.pointsState.thirdLevel = {
                    points: this.thirdLevel.calculateCorrectSelections(),
                    maxPoints: 20
                };
    
                localStorageManager.addResultToRating(this.pointsState, localStorageManager.getUser());
                localStorageManager.addUserResult({ username: localStorageManager.getUser(), ...this.pointsState })
                this.gameComplete = true;

                window.location.href = "rating.html"
                break;
        }
    }


    changeActiveLevel(newLevel) {
        this.activeLevel = newLevel;
        switch (newLevel) {
            case "second":
                this.activeLevelDom.textContent = "2";
                this.secondLevel = new SecondLevel().init();
                break;
            case "third":
                this.activeLevelDom.textContent = "3";
                this.thirdLevel = new ThirdLevel().init();
                break;
        }
    }

    onClickRestart() {
        window.location.reload();
    }

    onEndTimer() {
        this.modal.openModal()
        this.modal.changeModalText("К сожалению, время вышло. Вас перебросит на регистрацию, где вы можете повторно попробовать пройти тест")
        document.location.href = "auth.html"
    }
}

new Game().init()