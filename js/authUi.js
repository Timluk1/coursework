import { authServeice } from "./authService.js";

class AuthUi {
    constructor() {
        this.authButton = document.getElementById("button-auth");
        this.authButton.addEventListener("click", (event) => this.login(event));
    }

    login(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        authServeice.loginUser(username);
        window.location.href = "game.html";
    }

    addToLocalStorage(key, item) {
        localStorage.setItem(key, item);
    }
}

// если пользователь авторизован, то редиректим его на игру
if (authServeice.checkAuth()) {
    window.location.href = "game.html";
}

const auth = new AuthUi();
