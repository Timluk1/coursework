export class Modal {
    constructor(modalText="") {
        this.buttonClose = null;
        this.modal = null;
        this.modalOverlay = null;
        this.modalText = null;

        this.modalText = modalText;

        this.getDomElements();
        this.addListeners();
        this.changeModalText(modalText);
    }

    addListeners() {
        this.buttonClose.addEventListener("click", () => this.closeModal());
    }

    getDomElements() {
        this.buttonClose = document.getElementById("close-modal-button");
        this.modal = document.getElementById("modal");
        this.modalOverlay = document.getElementById("modal-overlay");
        this.modalText = document.querySelector(".modal__text");
    }

    changeModalText(newText) {
        this.modalText.textContent = newText;
    }

    openModal() {
        if (!this.modal) {
            console.log("Не найдена модалка");
            return;
        }
        this.modal.classList.add("active");
        this.modalOverlay.classList.add("active");
    }

    closeModal() {
        if (!this.modal) {
            console.log("Не найдена модалка");
            return;
        }

        this.modal.classList.add("closing");

        setTimeout(() => {
            this.modal.classList.remove("active", "closing");
            this.modalOverlay.classList.remove("active");
        }, 400);

    }
}
