function checkAuth() {
    return Boolean(localStorage.getItem("isAuth"));
}

function clearAuth() {
    
}

export class Game {
    constructor() {
        if (checkAuth()) {
            this.level = 1;
            this.numbersContainer = document.getElementById('numbers');
            this.evenBlock = document.getElementById('even');
            this.oddBlock = document.getElementById('odd');
            this.levelDisplay = document.getElementById('level');
            this.message = document.getElementById('message');
            this.nextLevelButton = document.getElementById('next-level');

            this.init();
        } else {
            window.location.href = "auth.html";
        }
    }

    init() {
        this.generateNumbers();
        this.evenBlock.addEventListener('dragover', this.allowDrop);
        this.oddBlock.addEventListener('dragover', this.allowDrop);
        this.evenBlock.addEventListener('drop', (event) => this.drop(event));
        this.oddBlock.addEventListener('drop', (event) => this.drop(event));
        this.nextLevelButton.addEventListener('click', () => this.checkLevel());
    }

    generateNumbers() {
        this.numbersContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const number = Math.floor(Math.random() * 100);
            const numberElement = document.createElement('div');
            numberElement.className = 'number';
            numberElement.textContent = number;
            numberElement.draggable = true;
            numberElement.id = `number-${i}`;
            numberElement.addEventListener('dragstart', this.dragStart);
            this.numbersContainer.appendChild(numberElement);
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

    checkLevel() {
        const evenNumbers = Array.from(this.evenBlock.querySelectorAll('.number')).map(el => parseInt(el.textContent, 10));
        const oddNumbers = Array.from(this.oddBlock.querySelectorAll('.number')).map(el => parseInt(el.textContent, 10));
        if (evenNumbers.every(num => num % 2 === 0) && oddNumbers.every(num => num % 2 !== 0)) {
            this.level++;
            this.levelDisplay.textContent = this.level;
            this.message.textContent = '';
            this.generateNumbers();
        } else {
            this.message.textContent = 'Неправильное распределение чисел!';
        }
    }
}

export const game = new Game();