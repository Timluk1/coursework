import { questionsList } from "../utils/questionsList.js";

export class SecondTask {
    constructor(type) {
        this.questions = questionsList.filter(question => question.type === type);
        this.input = null;
        this.question = null;
    }

    init() {
        this.getDomElements();
        this.choiceQuestion();
        this.renderQuestion();
        return this;
    }

    choiceQuestion() {
        this.question = this.getQuestion();
    }

    getDomElements() {
        this.input = document.getElementById("answer");
        this.questionHtml = document.getElementById("question");
    }

    getInputValue() {
        return this.input.value;
    }

    isAnswerCorrect() {
        const answer = this.getInputValue();
        return answer === this.question.answer;
    }

    getPoints() {
        return this.isAnswerCorrect();
    }

    renderQuestion() {
        
        this.questionHtml.innerHTML = this.question.question;
    }

    getQuestion() {
        return this.questions[Math.floor(Math.random() * this.questions.length)];
    }
}