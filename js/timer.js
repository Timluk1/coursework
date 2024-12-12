export class Timer {
    constructor(timeLimit, onEnd) {
        this.timeLimit = timeLimit;
        this.onEnd = onEnd;
        this.timer = null; // DOM-элемент таймера
        this.intervalId = null; // ID интервала
    }

    init() {
        this.getDomElements();
        this.setTime();
        this.startTimer();
        return this
    }

    startTimer() {
        this.intervalId = setInterval(() => {
            this.timeLimit--;
            this.setTime();
            if (this.timeLimit === 0) {
                clearInterval(this.intervalId);
                this.onEnd();
            }
        }, 1000);
    }

    setTime() {
        this.timer.innerHTML = this.timeLimit;
    }

    getDomElements() {
        this.timer = document.getElementById('timer');
        if (!this.timer) {
            console.error('Element with ID "timer" not found.');
        }
    }
}
