import { FirstTask } from "./tasks/firstTask.js";   
import { SecondTask } from "./tasks/secondTask.js";
import { Timer } from "./timer.js";

class Game {
    constructor() {
        this.type = "easy";
        this.firstTask = null;
        this.secondTask = null
    }

    init() {
        this.getClasses();
        this.getDomElements();
        this.addListeners();    
    }

    getDomElements() {
        this.buttonNextLevel = document.getElementById("next-level");
    }

    addListeners() {
        this.buttonNextLevel.addEventListener("click", this.onClikNextLevel.bind(this));
    }

    onClikNextLevel() {
        // выводим в консоль результаты
        const points = this.firstTask.getPoints() + this.secondTask.getPoints();
        if (points === 0) {
            alert("Вы не выполнили не одну задачу, попробуйте еще раз")
        } else {
            alert("Вы выполнили задачи, переходите на следующий уровень")
        }
    }

    onTimerEnd() {
        alert("Время вышло")
    }

    // получаем классов
    getClasses() {
        // классы задач
        this.firstTask = new FirstTask(this.type).init();
        this.secondTask = new SecondTask(this.type).init();

        // класс для таймера
        this.timer = new Timer(20, this.onTimerEnd).init();
    }
}

new Game().init();