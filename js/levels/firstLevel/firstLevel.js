import { tasksList } from "./tasksList.js";
import { clearTask } from "../global.js";

// Утилитарные функции для работы с числами
const isPrime = (number) => {
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
};

const isFibonacci = (number) => {
    if (number === 0 || number === 1) return true;
    let prev = 0, curr = 1;
    while (curr < number) {
        [prev, curr] = [curr, prev + curr];
    }
    return curr === number;
};


const getfirstLevelHtml = () => {
    return `
            <div id="task-1" class="task">
                <div>
                    <div>
                        <p>Задание: Разделите числа на типы</p>
                    </div>
                </div>
                <div id="numbers" class="numbers"></div>
                <div class="blocks">
                    <div id="block-1" class="block">
                        <h2 id="title-block-1">Блок 1</h2>
                    </div>
                    <div id="block-2" class="block">
                        <h2 id="title-block-2">Блок 2</h2>
                    </div>
                </div>
            </div>
    `
}

// функции для работы с UI
const renderFirstLevel = () => {
    // Находим первый элемент с классом "divider"
    const firstDivider = document.querySelector(".divider");
    firstDivider.insertAdjacentHTML("afterend", getfirstLevelHtml());
}

// Класс для работы с первой задачей вне зависимости от уровня сложности
export class FirstLevel {
    constructor(type) {
        this.task = tasksList.find(task => task.type === type);
        this.numbers = [];
    }

    init() {
        clearTask();
        renderFirstLevel();
        this.getDomElements();
        this.setDataElements();
        this.addListeners();
        return this;
    }

    getDomElements() {
        this.block1 = document.getElementById('block-1');
        this.block2 = document.getElementById('block-2');
        this.block1Title = document.getElementById('title-block-1');
        this.block2Title = document.getElementById('title-block-2');
        this.numbersContainer = document.getElementById('numbers');
    }

    addListeners() {
        [this.block1, this.block2].forEach(block => {
            block.addEventListener('dragover', this.allowDrop);
            block.addEventListener('drop', (event) => this.drop(event));
        });
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

    dragStart(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    setDataElements() {
        this.setTitles();
        this.generateNumbers();
        this.renderNumbers();
    }

    setTitles() {
        this.block1Title.textContent = this.task.firstBlockText;
        this.block2Title.textContent = this.task.secondBlockText;
    }

    generateNumbers() {
        this.numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    }

    renderNumbers() {
        this.numbersContainer.innerHTML = '';
        this.numbers.forEach((number, index) => {
            const numberElement = document.createElement('div');
            numberElement.className = 'number';
            numberElement.textContent = number;
            numberElement.draggable = true;
            numberElement.id = `number-${index}`;
            numberElement.addEventListener('dragstart', this.dragStart);
            this.numbersContainer.appendChild(numberElement);
        });
    }

    checkDistribution() {
        const block1Numbers = this.getBlockNumbers(this.block1);
        const block2Numbers = this.getBlockNumbers(this.block2);

        if (block1Numbers.length + block2Numbers.length !== 10) {
            return { isCorrect: false, firstPoint: 0, secondPoint: 0 };
        }

        return { isCorrect: true, ...this.calculatePoints(block1Numbers, block2Numbers) };
    }

    getBlockNumbers(block) {
        return Array.from(block.children)
            .filter(el => el.classList.contains('number'))
            .map(el => parseInt(el.textContent, 10))
            .filter(num => !isNaN(num));
    }

    calculatePoints(block1Numbers, block2Numbers) {
        switch (this.task.type) {
            case "easy":
                return this.calculateEvenOddPoints(block1Numbers, block2Numbers);
            case "medium":
                return this.calculatePrimeCompositePoints(block1Numbers, block2Numbers);
            case "hard":
                return this.calculateFibonacciPoints(block1Numbers, block2Numbers);
            default:
                return { firstPoint: 0, secondPoint: 0 };
        }
    }

    calculateEvenOddPoints(block1Numbers, block2Numbers) {
        const firstPoint = block1Numbers.filter(num => num % 2 === 0).length;
        const secondPoint = block2Numbers.filter(num => num % 2 !== 0).length;
        return { firstPoint, secondPoint };
    }

    calculatePrimeCompositePoints(block1Numbers, block2Numbers) {
        const firstPoint = block1Numbers.filter(isPrime).length;
        const secondPoint = block2Numbers.filter(num => !isPrime(num)).length;
        return { firstPoint, secondPoint };
    }

    calculateFibonacciPoints(block1Numbers, block2Numbers) {
        const firstPoint = block1Numbers.filter(isFibonacci).length;
        const secondPoint = block2Numbers.filter(num => !isFibonacci(num)).length;
        return { firstPoint, secondPoint };
    }

    getPoints() {
        const { firstPoint, secondPoint } = this.checkDistribution();
        return { firstPoint, secondPoint };
    }
}
