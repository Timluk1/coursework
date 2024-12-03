class Auth {
    constructor() {
        this.authButton = document.getElementById("button-auth");
        this.authButton.addEventListener("click", (event) => this.login(event));
    }

    login(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        this.addToLocalStorage("username", username)
        this.addToLocalStorage("isAuth", true)
        window.location.href = "game.html";
    }

    addToLocalStorage(key, item) {
        localStorage.setItem(key, item);
    }
}

const auth = new Auth();
