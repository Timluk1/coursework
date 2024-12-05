const tasks = [
    {
        type: "easy",
        name: "Четные или нечетные числа",
        firstBlockText: "Четные",
        secondBlockText: "Нечетные",
    },
    {
        type: "medium",
        name: "Простые или составные числа",
        firstBlockText: "Простые",
        secondBlockText: "Составные",
    },
    {
        type: "hard",
        name: "Числа Фибоначчи или не Фибоначчи",
        firstBlockText: "Фибоначчи",
        secondBlockText: "Не Фибоначчи",
    }
];

export class FirstTask {
    constructor(type) {
        this.task = tasks.find(task => task.type === type);
        this.numbers = [];
    }

    genereateNumbers() {
        for (let i = 0; i < 10; i++) {
            this.numbers.push(Math.floor(Math.random() * 100));
        }
    }

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

    checkEvenOdd(block1Numbers, block2Numbers) {
        const isBlock1Even = block1Numbers.every(number => number % 2 === 0);
        const isBlock2Odd = block2Numbers.every(number => number % 2 !== 0);
        return isBlock1Even && isBlock2Odd;
    }

    checkPrimeComposite(block1Numbers, block2Numbers) {
        const isBlock1Prime = block1Numbers.every(number => this.isPrime(number));
        const isBlock2Composite = block2Numbers.every(number => !this.isPrime(number));
        return isBlock1Prime && isBlock2Composite;
    }

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

    checkFibonacci(block1Numbers, block2Numbers) {
        const isBlock1Fibonacci = block1Numbers.every(number => this.isFibonacci(number));
        const isBlock2NotFibonacci = block2Numbers.every(number => !this.isFibonacci(number));
        return isBlock1Fibonacci && isBlock2NotFibonacci;
    }

    isFibonacci(number) {
        return this.isPerfectSquare(5 * number * number + 4) || this.isPerfectSquare(5 * number * number - 4);
    }

    isPerfectSquare(number) {
        return Math.sqrt(number) % 1 === 0;
    }
}