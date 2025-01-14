import { clearTask } from "../global.js";
import { Questions } from "./questions.js";
import { getRandomType } from "../global.js";

const getSecondLevelHtml = (question) => {
    return `
        <div class="task">
            <p class="task__text">Введите ответ на задание: ${question}</p>
            <input type="text" class="task__input" id="task-2-input" placeholder="Ваш ответ...">
        </div>
    `
}

const renderSecondLevel = (question) => {
    // Находим первый элемент с классом "divider"
    const firstDivider = document.querySelector(".divider");
    firstDivider.insertAdjacentHTML("afterend", getSecondLevelHtml(question));
}

export class SecondLevel {
    constructor() {
        const { answer, question } = new Questions(getRandomType()).getQuestion();
        this.question = question;
        this.answer = answer;
    }

    init() {
        clearTask();
        renderSecondLevel(this.question);
        return this;
    }

    getInputValue() {
        const input = document.getElementById("task-2-input");
        const value = input.value;
        return value;
    }

    checkCorrectAnswer() {
        return this.getInputValue() === this.answer
    }

    inputIsClear() {
        return this.getInputValue() === ""
    }

    getAnswer() {
        return this.answer;
    }
}