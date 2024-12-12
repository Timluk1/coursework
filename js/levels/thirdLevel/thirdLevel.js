import { clearTask } from "../global.js";

const getRandomArrayLinks = () => {
    const array = [
        "../assets/oneCats.jpg", 
        "../assets/twoCats.jpg", 
        "../assets/threeCats.jpg", 
        "../assets/fiveCats.jpg"
    ];
    let shuffled = array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    return shuffled
};

const getRandomTypeTask = () => {
    const types = ["even", "odd"]
    return types[Math.floor(Math.random() * 2)]
}

const getImageHtml = (imageSrc) => {
    return `
        <div class="image" data-cats="${extractCatCount(imageSrc)}">
            <button>
                <img src="${imageSrc}" alt="cats"/>
            </button>
        </div>
    `;
};

const extractCatCount = (imageSrc) => {
    const match = imageSrc.match(/(one|two|three|five)Cats/);
    const countMap = {
        one: 1,
        two: 2,
        three: 3,
        five: 5
    };
    return match ? countMap[match[1]] : 0;
};

const getThirdLevelHtml = (images, selectedCondition) => {
    return `
        <div>
            <h3>${selectedCondition === "even" 
                ? 
                "Выберите изображения, на которых четное количество котов" 
                : 
                "Выберите изображения, на которых нечетное количество котов"
            }
            </h3>
            <div class="images">
                ${images.map(getImageHtml).join("")}
            </div>
        </div>
    `;
};

const renderThirdLevel = (images, selectedCondition) => {
    const firstDivider = document.querySelector(".divider");
    firstDivider.insertAdjacentHTML("afterend", getThirdLevelHtml(images, selectedCondition));
};

export class ThirdLevel {
    constructor() {
        this.selectedCondition = getRandomTypeTask();
        this.correctCount = 0;
    }

    init() {
        clearTask();
        const images = getRandomArrayLinks();
        renderThirdLevel(images, this.selectedCondition);
        this.getDomElements();
        this.addListeners();
        return this;
    }

    getDomElements() {
        this.imagesContainer = document.querySelector(".images");
        this.images = document.querySelectorAll(".image");
        this.conditionButtons = document.querySelectorAll(".condition-button"); // Optional UI for condition switching
    }

    addListeners() {
        this.images.forEach((image) => {
            image.addEventListener("dblclick", () => this.toggleActive(image));
        });

        // Optional: Add listeners to switch conditions
        this.conditionButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                this.selectedCondition = event.target.dataset.condition;
                this.resetSelection();
            });
        });
    }

    toggleActive(image) {
        image.classList.toggle("active");
    }

    resetSelection() {
        this.images.forEach((image) => image.classList.remove("active"));
    }

    calculateCorrectSelections() {
        const isEven = this.selectedCondition === "even";
        const activeImages = document.querySelectorAll(".image.active");
    
        // Подсчёт общего количества активных изображений
        const totalImages = activeImages.length;
    
        // Подсчёт количества правильных выборов
        const correctSelections = Array.from(activeImages).filter((image) => {
            const catCount = parseInt(image.dataset.cats, 10);
            return isEven ? catCount % 2 === 0 : catCount % 2 !== 0;
        }).length;
    
        // Если изображений нет, вернуть 0 баллов
        if (totalImages === 0) {
            this.correctCount = 0;
            return 0;
        }
    
        // Расчёт процента правильных выборов и преобразование в оценку от 0 до 20
        const percentage = (correctSelections / totalImages) * 100;
        const score = Math.round((percentage / 100) * 20);
    
        // Сохранение результата в свойство
        this.correctCount = score;
    
        return score;
    }
}
