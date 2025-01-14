export class ButtonNextLevel {
    constructor(onClick) {
        this.button = null;
        this.onClick = onClick;
    }

    init() {
        this.getDomElements();
        this.addListeners();
        return this;
    }

    getDomElements() {
        this.button = document.getElementById("next-level");
    }

    addListeners() {
        this.button.addEventListener("click", this.onClick);
    }

    changeTheme() {
        this.button.classList.add("dark")
    }

    deleteTheme() {
        this.button.classList.remove("dark")
    }
}
