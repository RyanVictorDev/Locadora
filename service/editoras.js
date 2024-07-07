import { apiClient } from "./cliente.js";

document.addEventListener("DOMContentLoaded", () => {
    // Função para buscar os dados da API e preencher a tabela
    function fetchEditoras() {
        

        apiClient.get("/publisher/1")
            .then(response => {
                console.log(response.data)
                const editora = response.data;
                const tableBody = document.querySelector("#editorasTable tbody");

                tableBody.innerHTML = '';   

                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${editora.name}</td>
                        <td>${editora.telephone}</td>
                        <td>${editora.email}</td>
                        <td>
                            <button><i class="fa-solid fa-eye"></i></button>
                            <button><i class="fa-solid fa-pencil"></i></button>
                            <button class="openModalExcluir"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                

                // Adiciona os event listeners para os botões de exclusão
                addModalEventListeners();
            })
            .catch(error => {
                console.error('Erro ao buscar as editoras:', error);
            });
    }

    // Função para adicionar event listeners aos botões de exclusão
    function addModalEventListeners() {
        const openModalBtns = document.querySelectorAll(".openModalExcluir");
        const closeModalBtn = document.querySelector("#closeBtn");
        const modal = document.querySelector("#modalExcluir");
        const fade = document.querySelector("#fade");

        const toggleModal = () => {
            modal.classList.toggle("hide");
            fade.classList.toggle("hide");
        };

        openModalBtns.forEach(button => {
            button.addEventListener("click", toggleModal);
        });

        closeModalBtn.addEventListener("click", toggleModal);
        fade.addEventListener("click", toggleModal);
    }

    // Verifica se o apiClient está definido antes de chamar fetchEditoras
    const checkApiClient = setInterval(() => {
        if (apiClient) {
            clearInterval(checkApiClient);
            fetchEditoras();
        }
    }, 100);
});