class LocalStorageManager {
    constructor() {}

    setUser(username) {
        localStorage.setItem("username", username);
    }

    deleteUser() {
        localStorage.removeItem("username");
    }

    getUser() {
        return localStorage.getItem("username");
    }

    getUserResult() {
        return JSON.parse(localStorage.getItem("result"))
    }

    addUserResult(result) {
        localStorage.setItem(`result`, JSON.stringify(result));
    }

    deleteUserResult() {
        localStorage.removeItem('result')
    }

    getRatingResult() {
        let rating = JSON.parse(localStorage.getItem('rating')) || [];
        return rating
    }
 
    addResultToRating(result, username) {
        let rating = JSON.parse(localStorage.getItem('rating')) || [];
        rating.push({ username, ...result });
        localStorage.setItem('rating', JSON.stringify(rating));
    }

    deleteResultFromRating(username) {
        let rating = JSON.parse(localStorage.getItem('rating')) || [];
        rating = rating.filter(result => result.username !== username);
        localStorage.setItem('rating', JSON.stringify(rating));
    }
}

export const localStorageManager = new LocalStorageManager()