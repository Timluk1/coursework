import { tasksList } from "../utils/tasksList.js";
import { SecondTask } from "./secondTask.js";

// Класс для работы с первой задачей вне зависимости от уровня сложности
export class FirstTask {
    constructor(type) {
        // Находим задачу по типу из списка задач
        this.task = tasksList.find(task => task.type === type);
        this.numbers = []; // Список чисел для распределения
    }

    // Инициализация задачи
    init() {
        this.getDomElments(); // Получение ссылок на DOM-элементы
        this.setDataElements(); // Установка начальных данных и отображение чисел
        this.addListeners(); // Добавление обработчиков событий
        return this;
    }

    // Получение необходимых DOM-элементов
    getDomElments() {
        this.block1 = document.getElementById('block-1'); // Первый блок для чисел
        this.block2 = document.getElementById('block-2'); // Второй блок для чисел
        this.block1Title = document.getElementById('title-block-1'); // Заголовок первого блока
        this.block2Title = document.getElementById('title-block-2'); // Заголовок второго блока
    }

    // Добавление слушателей событий для взаимодействия с блоками
    addListeners() {
        this.block1.addEventListener('dragover', this.allowDrop); // Разрешение сбрасывать элементы в блок 1
        this.block2.addEventListener('dragover', this.allowDrop); // Разрешение сбрасывать элементы в блок 2
        this.block1.addEventListener('drop', (event) => this.drop(event)); // Обработка события "drop" для блока 1
        this.block2.addEventListener('drop', (event) => this.drop(event)); // Обработка события "drop" для блока 2
    }

    // Начало перетаскивания числа
    dragStart(event) {
        event.dataTransfer.setData('text', event.target.id); // Сохраняем ID элемента
    }

    // Разрешение сброса элемента
    allowDrop(event) {
        event.preventDefault(); // Отмена действия по умолчанию
    }

    // Обработка сброса числа в блок
    drop(event) {
        event.preventDefault(); // Отмена действия по умолчанию
        const data = event.dataTransfer.getData('text'); // Получаем ID перетаскиваемого элемента
        const numberElement = document.getElementById(data); // Находим элемент
        if (event.target.classList.contains('block')) {
            event.target.appendChild(numberElement); // Добавляем элемент в целевой блок
        }
    }

    // Установка данных для отображения в DOM
    setDataElements() {
        this.setTitles(); // Установка заголовков блоков
        this.setNumbers(); // Генерация и отображение чисел
    }

    // Установка заголовков блоков
    setTitles() {
        this.block1Title.textContent = this.task.firstBlockText; // Заголовок для первого блока
        this.block2Title.textContent = this.task.secondBlockText; // Заголовок для второго блока
    }

    // Генерация чисел и их отображение
    setNumbers() {
        this.generateNumbers(); // Генерация случайных чисел
    }

    // Генерация случайных чисел
    generateNumbers() {
        const numbersContainer = document.getElementById('numbers'); // Контейнер для чисел
        this.numbers = [];
        for (let i = 0; i < 10; i++) {
            this.numbers.push(Math.floor(Math.random() * 100)); // Генерация случайного числа
        }
        const numbers = this.numbers;
        numbersContainer.innerHTML = ''; // Очищаем контейнер

        // Создаем элементы для каждого числа
        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];
            const numberElement = document.createElement('div');
            numberElement.className = 'number'; // Класс для числа
            numberElement.textContent = number; // Устанавливаем текст числа
            numberElement.draggable = true; // Делаем элемент перетаскиваемым
            numberElement.id = `number-${i}`; // Уникальный ID элемента
            numberElement.addEventListener('dragstart', this.dragStart); // Слушатель события "dragstart"
            numbersContainer.appendChild(numberElement); // Добавляем элемент в контейнер
        }
    }

    // Проверка корректности распределения чисел по блокам
    checkDistribution() {
        // Фильтруем только числовые элементы в блоках (игнорируя заголовки)
        const block1Numbers = Array.from(this.block1.children)
            .filter(el => !el.tagName.toLowerCase().startsWith('h'))  // Ищем элементы, которые не являются заголовками
            .map(el => parseInt(el.textContent, 10))                   // Преобразуем текстовое содержимое в числа
            .filter(num => !isNaN(num));                               // Отфильтровываем только те, которые действительно являются числами
    
        const block2Numbers = Array.from(this.block2.children)
            .filter(el => !el.tagName.toLowerCase().startsWith('h'))  // Ищем элементы, которые не являются заголовками
            .map(el => parseInt(el.textContent, 10))                   // Преобразуем текстовое содержимое в числа
            .filter(num => !isNaN(num));                               // Отфильтровываем только те, которые действительно являются числами
    
        // Теперь проверяем распределение чисел
        const isCorrect = this.checkCorrectness(block1Numbers, block2Numbers) && block1Numbers.length + block2Numbers.length === 10;
        return isCorrect;
    }

    getPoints() {
        return this.checkDistribution();
    }
    

    // Проверка распределения чисел в зависимости от типа задачи
    checkCorrectness(block1Numbers, block2Numbers) {
        switch (this.task.type) {
            case "easy":
                return this.checkEvenOdd(block1Numbers, block2Numbers);
            case "medium":
                return this.checkPrimeComposite(block1Numbers, block2Numbers);
            case "hard":
                return this.checkFibonacci(block1Numbers, block2Numbers);
        }
    }

    // Проверка на четные и нечетные числа
    checkEvenOdd(block1Numbers, block2Numbers) {
        const isBlock1Even = block1Numbers.every(number => number % 2 === 0); // Все числа в блоке 1 четные
        const isBlock2Odd = block2Numbers.every(number => number % 2 !== 0); // Все числа в блоке 2 нечетные
        return isBlock1Even && isBlock2Odd;
    }

    // Проверка на простые и составные числа
    checkPrimeComposite(block1Numbers, block2Numbers) {
        const isBlock1Prime = block1Numbers.every(number => this.isPrime(number)); // Все числа в блоке 1 простые
        const isBlock2Composite = block2Numbers.every(number => !this.isPrime(number)); // Все числа в блоке 2 составные
        return isBlock1Prime && isBlock2Composite;
    }

    // Проверка числа на простоту
    isPrime(number) {
        if (number < 2) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }

    // Проверка на числа Фибоначчи и не Фибоначчи
    checkFibonacci(block1Numbers, block2Numbers) {
        const isBlock1Fibonacci = block1Numbers.every(number => this.isFibonacci(number)); // Все числа в блоке 1 — числа Фибоначчи
        const isBlock2NotFibonacci = block2Numbers.every(number => !this.isFibonacci(number)); // Все числа в блоке 2 — не числа Фибоначчи
        return isBlock1Fibonacci && isBlock2NotFibonacci;
    }

    // Проверка, является ли число числом Фибоначчи
    isFibonacci(number) {
        return this.isPerfectSquare(5 * number * number + 4) || this.isPerfectSquare(5 * number * number - 4);
    }

    // Проверка, является ли число идеальным квадратом
    isPerfectSquare(number) {
        return Math.sqrt(number) % 1 === 0;
    }
}
