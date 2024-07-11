document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('apiToken');

    if (token != null) {
        const apiClient = axios.create({
            baseURL: "https://livraria-api.altislabtech.com.br",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        function fetchEditoras() {
            apiClient.get("/publisher")
                .then(response => {
                    const editoras = response.data.content;
                    const tableBody = document.querySelector("#editorasTable tbody");

                    tableBody.innerHTML = '';   

                    editoras.forEach(editora => {
                        const row = document.createElement('tr');

                        row.innerHTML = `
                            <td>${editora.name}</td>
                            <td>
                                <button class="openModalDetalhes"><i class="fa-solid fa-eye"></i></button>
                                <button class="openModalEditar"><i class="fa-solid fa-pencil"></i></button>
                                <button class="openModalExcluir"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        `;

                        tableBody.appendChild(row);
                    });

                    addModalEventListeners();
                })
                .catch(error => {
                    console.error('Erro ao buscar as editoras:', error);
                });
        }

        function addModalEventListeners() {
            const modalCadastrar = document.querySelector("#modalCadastrar");
            const formCadastrar = document.querySelector("#formCadastro")
            const openModalCadastrar = document.querySelectorAll(".cadastrarBtn");
            const closeModalCadastrar = document.querySelector("#closeBtnCadastrar");
            const cancelarCadastrar = document.querySelector(".cancelarCadastroBtn");
            const cadastrarBtn = document.querySelector(".salvarCadastroBtn");
            const fadeCadastrar = document.querySelector("#fadeCadastrar")

            const modalExcluir = document.querySelector("#modalExcluir");
            const openModalExcluirBtns = document.querySelectorAll(".openModalExcluir");
            const closeModalExcluir = document.querySelector("#closeBtn");
            const cancelarExcluir = document.querySelector(".cancelarBtn");
            const excluirBtn = document.querySelector(".excluirBtn")
            const fade = document.querySelector("#fade");

            const modalEditar = document.querySelector("#modalEditar");
            const openModalEditarBtns = document.querySelectorAll(".openModalEditar");
            const closeModalEditar = document.querySelector("#closeBtnEditar");
            const fadeEditar = document.querySelector("#fadeEditar");
            const openModalEditarConfirm = document.querySelectorAll(".salvarEditarBtn")
            const cancelarEditarBtn = document.querySelector(".cancelarEditarBtn");

            const modalEditarConfirm = document.querySelector("#modalEditarConfirm");
            const closeModalEditarConfirm = document.querySelector("#closeBtnEditarConfirm");
            const editarBtnConfirm = document.querySelector(".editarBtnConfirm")
            const cancelarEditarConfirm = document.querySelector(".cancelarBtnEditarConfirm");
            const fadeEditarConfirm = document.querySelector("#fadeEditarConfirm");

            const modalDetalhes = document.querySelector("#modalDetalhes");
            const openModalDetalhesBtn = document.querySelectorAll(".openModalDetalhes");
            const closeModalDetalhes = document.querySelector("#closeBtnDetalhes");
            const sairDetalhesBtn = document.querySelector(".sairDetalhesBtn");
            const fadeDetalhes = document.querySelector("#fadeDetalhes");

            const toggleModalCadastrar = () => {
                modalCadastrar.classList.toggle("hide");
                fadeCadastrar.classList.toggle("hide");
            };

            openModalCadastrar.forEach(button => {
                button.addEventListener("click", toggleModalCadastrar);
            });

            closeModalCadastrar.addEventListener("click", toggleModalCadastrar);
            fadeCadastrar.addEventListener("click", toggleModalCadastrar);
            cancelarCadastrar.addEventListener("click", toggleModalCadastrar);

            // checkando se o formulario foi preenchido
            formCadastrar.addEventListener("submit", (event) => {
                event.preventDefault();

                const camposObrigatorios = formCadastrar.querySelectorAll('[required]');
                let camposPreenchidos = true;

                camposObrigatorios.forEach(field => {
                    if (!field.value){
                        camposPreenchidos = false;
                    }
                });

                if (camposPreenchidos){
                    cadastrarBtn.addEventListener("click", toggleModalCadastrar)
                    toggleModalCadastrar();
                }
            })


            const toggleModalExcluir = () => {
                modalExcluir.classList.toggle("hide");
                fade.classList.toggle("hide");
            };

            openModalExcluirBtns.forEach(button => {
                button.addEventListener("click", toggleModalExcluir);
            });
            
            closeModalExcluir.addEventListener("click", toggleModalExcluir);
            fade.addEventListener("click", toggleModalExcluir);
            excluirBtn.addEventListener("click", toggleModalExcluir);
            cancelarExcluir.addEventListener("click", toggleModalExcluir);


            const toggleModalEditar = () => {
                modalEditar.classList.toggle("hide");
                fadeEditar.classList.toggle("hide");
            };

            openModalEditarBtns.forEach(button => {
                button.addEventListener("click", toggleModalEditar);
            });

            closeModalEditar.addEventListener("click", toggleModalEditar);
            fadeEditar.addEventListener("click", toggleModalEditar);
            cancelarEditarBtn.addEventListener("click", toggleModalEditar);


            const toggleModalEditarConfirm = () => {
                modalEditar.classList.toggle("hide");
                fadeEditar.classList.toggle("hide");
                modalEditarConfirm.classList.toggle("hide");
                fadeEditarConfirm.classList.toggle("hide");
            };

            openModalEditarConfirm.forEach(button => {
                button.addEventListener("click", toggleModalEditarConfirm);
            });

            closeModalEditarConfirm.addEventListener("click", toggleModalEditarConfirm);
            fadeEditarConfirm.addEventListener("click", toggleModalEditarConfirm);
            cancelarEditarConfirm.addEventListener("click", toggleModalEditarConfirm);

            const confirmEdit = () => {
                modalEditarConfirm.classList.toggle("hide");
                fadeEditarConfirm.classList.toggle("hide");
            };

            editarBtnConfirm.addEventListener("click", confirmEdit);


            const exitDetails = () => {
                modalDetalhes.classList.toggle("hide");
                fadeDetalhes.classList.toggle("hide");
            }

            openModalDetalhesBtn.forEach(button => {
                button.addEventListener("click", exitDetails);
            });

            sairDetalhesBtn.addEventListener("click", exitDetails);
            fadeDetalhes.addEventListener("click", exitDetails);
            closeModalDetalhes.addEventListener("click", exitDetails);
        }



        const checkApiClient = setInterval(() => {
            if (apiClient) {
                clearInterval(checkApiClient);
                fetchEditoras();
            }
        }, 100);    
    } else {
        window.location.href = "../index.html";
    }
});
