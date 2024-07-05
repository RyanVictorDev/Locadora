const openModalBtn = document.querySelector("#openModalExcluir");
const closeModalBtn = document.querySelector("#closeBtn");
const modal = document.querySelector("#modalExcluir");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

[openModalBtn, closeModalBtn, fade].forEach(element => {
    element.addEventListener("click", () => toggleModal());
});
