const firstLevelQuestions = [
    {
        question: "Найдите наибольший общий делитель (НОД) чисел 56 и 98.",
        answer: "14"
    },
    {
        question: "Найдите наименьшее общее кратное (НОК) чисел 12 и 15.",
        answer: "60"
    },
    {
        question: "Решите уравнение: 3x + 5 = 20. Найдите x.",
        answer: "5"
    },
    {
        question: "Найдите значение выражения: 2^5.",
        answer: "32"
    },
    {
        question: "Найдите корень квадратного уравнения: x^2 - 4x + 4 = 0.",
        answer: "2"
    },
    {
        question: "Найдите значение синуса угла 30 градусов. (в формате 0.1, 0.2)",
        answer: "0.5"
    },
    {
        question: "Найдите наибольший общий делитель (НОД) чисел 45 и 75.",
        answer: "15"
    },
    {
        question: "Найдите наименьшее общее кратное (НОК) чисел 9 и 12.",
        answer: "36"
    },
    {
        question: "Решите уравнение: 2x - 7 = 13. Найдите x.",
        answer: "10"
    },
    {
        question: "Найдите значение выражения: 3^4.",
        answer: "81"
    }
];

const secondLevelQuestions = [
    {
        question: "Найдите производную функции: f(x) = 3x^2 + 2x + 1. (для степени пишите ^)",
        answer: "6x + 2"
    },
    {
        question: "Найдите интеграл функции: ∫(2x)dx. (для степени пишите ^, например x^8, для свободного члена пишите +C, например x^8 + C)",
        answer: "x^2 + C"
    },
    {
        question: "Найдите сумму первых 10 членов арифметической прогрессии, если первый член равен 2, а разность равна 3.",
        answer: "95"
    },
    {
        question: "Найдите площадь круга с радиусом 7.",
        answer: "154"
    },
    {
        question: "Найдите корень квадратного уравнения: x^2 - 6x + 9 = 0.",
        answer: "3"
    },
    {
        question: "Найдите производную функции: f(x) = 4x^3 - 2x^2 + x. (для степени пишите ^)",
        answer: "12x^2 - 4x + 1"
    },
    {
        question: "Найдите интеграл функции: ∫(3x^2)dx. (для степени пишите ^, например x^8, для свободного члена пишите +C, например x^8 + C)",
        answer: "x^3 + C"
    },
    {
        question: "Найдите сумму первых 5 членов геометрической прогрессии, если первый член равен 3, а знаменатель равен 2.",
        answer: "93"
    },
    {
        question: "Найдите площадь треугольника с основанием 10 и высотой 5.",
        answer: "25"
    },
    {
        question: "Найдите значение косинуса угла 60 градусов.",
        answer: "0.5"
    }
];

const thirdLevelQuestions = [
    {
        question: "Найдите наибольший общий делитель (НОД) чисел 32 и 48.",
        answer: "16"
    },
    {
        question: "Найдите наименьшее общее кратное (НОК) чисел 14 и 20.",
        answer: "140"
    },
    {
        question: "Решите уравнение: 5x + 2 = 27. Найдите x.",
        answer: "5"
    },
    {
        question: "Найдите значение выражения: 5^3.",
        answer: "125"
    },
    {
        question: "Найдите корень квадратного уравнения: x^2 - 10x + 25 = 0.",
        answer: "5"
    },
    {
        question: "Найдите производную функции: f(x) = 5x^2 - 3x + 2.  (для степени пишите ^, например x^8)",
        answer: "10x - 3"
    },
    { 
        question: "Найдите интеграл функции: ∫(4x)dx. (для степени пишите ^, например x^8, для свободного члена пишите +C, например x^8 + C)",
        answer: "2x^2 + C"
    },
    {
        question: "Найдите сумму первых 6 членов арифметической прогрессии, если первый член равен 1, а разность равна 2.",
        answer: "36"
    },
    {
        question: "Найдите площадь прямоугольника с длиной 8 и шириной 6.",
        answer: "48"
    },
    {
        question: "Найдите значение тангенса угла 45 градусов.",
        answer: "1"
    },
    {
        question: "Найдите наибольший общий делитель (НОД) чисел 50 и 75.",
        answer: "25"
    }
];

export class Questions {
    constructor(type) {
        switch (type) {
            case 'easy':
                this.questions = firstLevelQuestions;
                break;
            case 'medium':
                this.questions = secondLevelQuestions;
                break;
            case 'hard':
                this.questions = thirdLevelQuestions;
                break;
            default:
                this.questions = firstLevelQuestions;
        }
    }

    getQuestion() {
        return this.questions[Math.floor(Math.random() * this.questions.length)];
    }

    randomQuestion() {
        const question = this.getQuestion();
        return {
            question: question.question,
            answer: question.answer
        }
    }
}
