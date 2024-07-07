const openModalExcluir = document.querySelectorAll(".openModalExcluir");
const closeModalBtn = document.querySelector("#closeBtn");
const modal = document.querySelector("#modalExcluir");
const fade = document.querySelector("#fade");
const cancelar = document.querySelector(".cancelarBtn");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

[closeModalBtn, cancelar, fade].forEach(element => {
    element.addEventListener("click", () => toggleModal());
});

openModalExcluir.forEach(button => {
    button.addEventListener("click", toggleModal);
});