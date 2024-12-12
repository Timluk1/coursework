import { localStorageManager } from "../localStorageManager.js";
import { Modal } from "../modal.js"

class Auth {
    constructor() {
        this.modal = new Modal();

        this.buttonAuth = null;
        this.inputUsername = null;
    }
    init() {
        this.getDomElements();
        this.addListeners();
        return this;
    }
    addListeners() {
        this.buttonAuth.addEventListener("click", () => this.onClickButtonAuth());
    }
    getDomElements() {
        this.buttonAuth = document.getElementById("button-auth");
        this.inputUsername = document.getElementById("username");
    }
    onClickButtonAuth() {
        const username = this.inputUsername.value;
        if (username === "") {
            this.modal.changeModalText("Введите корректный username, состоящий хотя бы из 1 символа");
            this.modal.openModal();
        } else {
            localStorageManager.setUser(username);
            document.location = "game.html"
        }
    }
}

// очищаем localstorage
localStorageManager.deleteUser();
localStorageManager.deleteUserResult();

new Auth().init();