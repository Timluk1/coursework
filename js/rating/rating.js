import { localStorageManager } from "../localStorageManager.js";

const sortArray = (ratings) => {
    return ratings.sort((a, b) => {
        const pointsA = a.firstLevel.points + a.secondLevel.points + a.thirdLevel.points;
        const pointsB = b.firstLevel.points + b.secondLevel.points + b.thirdLevel.points;
        return pointsB - pointsA; 
    });
};

const getUserGameResultsHtml = (props) => {
    return `
        <div class="game-results">
        <h2 class="game-results__title">Результат пользователя</h2>
        <div class="game-results__content">
            <p class="game-results__item">Имя пользователя: <span class="game-results__value" id="username">${props.username}</span></p>
            <div class="divider"></div>
            <p class="game-results__item">Баллы за первую задачу: <span class="game-results__value">${props.firstLevelPoints} из ${props.firstLevelMaxPoints}</span></p>
            <p class="game-results__item">Баллы за вторую задачу: <span class="game-results__value">${props.secondLevelPoints} из ${props.secondLevelMaxPoints}</span></p>
            <p class="game-results__item">Баллы за третью задачу: <span class="game-results__value">${props.thirdLevelPoints} из ${props.thirdLevelMaxPoints}</span></p>
            <div class="divider"></div>
            <p class="game-results__item">Максимальные очки: <span class="game-results__value" id="maxPoints">${props.maxPoints}</span></p>
            <p class="game-results__item">Очки набраны: <span class="game-results__value" id="userPoints">${props.points}</span></p>
        </div>
    </div>
    `;
};

const getButtonRestart = () => {
    return `
        <button class="button-nav" id="button-restart">Начать заново</button>
    `
}

const getGameRatingItemHtml = (rank, username, points) => {
    return `
        <div class="game-rating__item">
            <p class="game-rating__rank">${rank}</p>
            <p class="game-rating__player">${username}</p>
            <p class="game-rating__score">${points}</p>
        </div>
    `;
};

const getRatingHtml = (ratings) => {
    let ratingsHtml = "";
    ratings.forEach(({ username, firstLevel, secondLevel, thirdLevel }, index) => {
        const points = firstLevel.points + secondLevel.points + thirdLevel.points;
        ratingsHtml += getGameRatingItemHtml(index + 1, username, points);
    });
    return `
        <div class="game-rating">
            <h2 class="game-rating__title">Рейтинг</h2>
            <div class="game-rating__list">
                ${ratingsHtml}
            </div>
        </div>
    `;
};

const renderRating = (ratings) => {
    const sortedRatings = sortArray(ratings);
    const body = document.querySelector("body");
    body.insertAdjacentHTML("beforeend", getRatingHtml(sortedRatings));
};

const renderUserResults = (props) => {
    if (props) {
        const body = document.querySelector("body");
        body.insertAdjacentHTML("beforeend", getUserGameResultsHtml(props));
    }
};

const renderButtonRestart = () => {
    const body = document.querySelector("body");
    body.insertAdjacentHTML("beforeend", getButtonRestart());
}

const parseUserResultToProps = ({ username, firstLevel, secondLevel, thirdLevel }) => {
    const props = {
        username: username,
        firstLevelPoints: firstLevel.points,
        firstLevelMaxPoints: firstLevel.maxPoints,

        secondLevelPoints: secondLevel.points,
        secondLevelMaxPoints: secondLevel.maxPoints,

        thirdLevelPoints: thirdLevel.points,
        thirdLevelMaxPoints: thirdLevel.maxPoints,

        points: firstLevel.points + secondLevel.points + thirdLevel.points,
        maxPoints: firstLevel.maxPoints + secondLevel.maxPoints + thirdLevel.maxPoints,
    };
    return props;
};

class Rating {
    constructor() {
        this.buttonRestart = null;
    }

    init() {
        this.renderElements();
        this.getDomElements();
        this.addListeners();
    }

    getDomElements() {
        this.buttonRestart = document.getElementById("button-restart");
    }

    addListeners() {
        this.buttonRestart.addEventListener("click", () => this.onClickRestart())
        document.addEventListener("keypress", () => this.onClickRestart())
    }

    renderElements() {
        renderUserResults(parseUserResultToProps(localStorageManager.getUserResult()));
        renderRating(localStorageManager.getRatingResult());
        renderButtonRestart();
    }

    onClickRestart() {
        document.location.href = "auth.html"
    }
}

new Rating().init();