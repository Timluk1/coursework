import { authService } from "./authService.js";
import { Questions } from "./questions.js";
import { ScrollManager } from "./scrollManager.js";
import { FirstTask } from "./firstTask.js";

export class Level {
    constructor(levelNumber, timeLimit, gameType, onLevelComplete, onTimeExpired) {
        this.levelNumber = levelNumber;
        this.timeLimit = timeLimit;
        this.timeLeft = timeLimit;
        this.gameType = gameType; 
        this.timerInterval = null;

        this.onLevelComplete = onLevelComplete; // Коллбэк для завершения уровня
        this.onTimeExpired = onTimeExpired; // Коллбэк для истечения времени

        this.block1 = document.getElementById('block-1');
        this.block2 = document.getElementById('block-2');
        this.timerDisplay = document.getElementById('timer');
        this.message = document.getElementById('message');
        this.question = document.getElementById('question');
        
        switch (this.levelNumber) {
            case 1:
                this.firstTask = new FirstTask('easy');
                this.questions = new Questions('easy');
                break;
            case 2:
                this.firstTask = new FirstTask('medium');
                this.questions = new Questions('medium');
                break;
            case 3:
                this.firstTask = new FirstTask('hard');
                this.questions = new Questions('hard');
                break;
        }
        this.numbers = [];
        this.init();
    }

    init() {
        this.startTimer();
        this.generateNumbers();
        this.generateQuestion();
        this.block1.addEventListener('dragover', this.allowDrop);
        this.block2.addEventListener('dragover', this.allowDrop);
        this.block1.addEventListener('drop', (event) => this.drop(event));
        this.block2.addEventListener('drop', (event) => this.drop(event));
    }

    // начало таймера
    startTimer() {
        this.timeLeft = this.timeLimit;
        this.updateTimerDisplay(); // Сразу обновляем, чтобы не ждать 1 секунду
        this.timerInterval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateTimerDisplay();
            } else {
                clearInterval(this.timerInterval);
                this.onTimeExpired();
            }
        }, 1000);
    }
    

    // обновление таймера
    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }
    
    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    

    generateQuestion() {
        const { question, answer } = this.questions.randomQuestion();
        this.question.textContent = question;
    }
    // генерация чисел для задачи по перетаскиванию
    generateNumbers() {
        const numbersContainer = document.getElementById('numbers');
        numbersContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const number = Math.floor(Math.random() * 100);
            this.numbers.push(number);
            const numberElement = document.createElement('div');
            numberElement.className = 'number';
            numberElement.textContent = number;
            numberElement.draggable = true;
            numberElement.id = `number-${i}`;
            numberElement.addEventListener('dragstart', this.dragStart);
            numbersContainer.appendChild(numberElement);
        }
    }

    dragStart(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    allowDrop(event) {
        event.preventDefault();
    }

    drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const numberElement = document.getElementById(data);
        if (event.target.classList.contains('block')) {
            event.target.appendChild(numberElement);
        }
    }

    // завершение уровня
    completeLevel() {
        this.numbers = [];
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.onLevelComplete();
    }

    showError(message) {
        this.message.textContent = message;
    }

    isPrime(num) {
        if (num < 2) return false;
        for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    isFibonacci(num) {
        const isPerfectSquare = (x) => Math.sqrt(x) % 1 === 0;
        return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
    }
}

export class Game {
    constructor() {
        this.currentLevelNumber = 1;
        this.levels = [];
        this.maxLevels = 5;

        this.levelDisplay = document.getElementById('level');
        this.nextLevelButton = document.getElementById('next-level');
        this.restartButton = document.getElementById('restart');

        this.gameTypes = ["first", "second", "third"]; 

        this.init();
    }

    init() {
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.nextLevelButton.addEventListener('click', () => this.startNextLevel());
        this.startLevel(this.currentLevelNumber);
    }

    startLevel(levelNumber) {
        const gameType = this.gameTypes[(levelNumber - 1) % this.gameTypes.length];
        this.levelDisplay.textContent = `Уровень ${levelNumber}: ${this.getGameTypeDescription(gameType)}`;

        const onLevelComplete = () => {
            if (this.currentLevelNumber < this.maxLevels) {
                this.nextLevelButton.disabled = false;
            } else {
                alert('Поздравляем! Вы прошли игру!');
                this.restartGame();
            }
        };

        const onTimeExpired = () => {
            alert('Время вышло! Попробуйте снова.');
            this.restartGame();
        };

        const newLevel = new Level(levelNumber, 120, gameType, onLevelComplete, onTimeExpired);
        for (let level of this.levels) {
            level.completeLevel();
        }
        this.levels.push(newLevel);
    }

    getGameTypeDescription(gameType) {
        switch (gameType) {
            case 'first': return 'Четные/Нечетные';
            case 'second': return 'Простые числа';
            case 'third': return 'Числа Фибоначчи';
            default: return 'Неизвестный тип';
        }
    }

    startNextLevel() {
        this.currentLevelNumber++;
        this.startLevel(this.currentLevelNumber);
        ScrollManager.scrollToTop(); // Прокрутка вверх при переходе на следующий уровень
    }

    restartGame() {
        window.location.reload(); // Можно заменить более сложной логикой сброса состояния
    }
}

if (!authService.checkAuth()) {
    window.location.href = "auth.html";
} else {
    new Game();
}