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
                                <button><i class="fa-solid fa-eye"></i></button>
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
            const openModalExcluirBtns = document.querySelectorAll(".openModalExcluir");
            const openModalEditarBtns = document.querySelectorAll(".openModalEditar");
            const closeModalExcluir = document.querySelector("#closeBtn");
            const closeModalEditar = document.querySelector("#closeBtnEditar");
            const modalExcluir = document.querySelector("#modalExcluir");
            const modalEditar = document.querySelector("#modalEditarConfirm");
            const fade = document.querySelector("#fade");
            const fadeEditar = document.querySelector("#fadeEditar");
            const cancelarExcluir = document.querySelector(".cancelarBtn");
            const cancelarEditar = document.querySelector(".cancelarBtnEditar");

            const toggleModalExcluir = () => {
                modalExcluir.classList.toggle("hide");
                fade.classList.toggle("hide");
            };

            openModalExcluirBtns.forEach(button => {
                button.addEventListener("click", toggleModalExcluir);
            });
            
            closeModalExcluir.addEventListener("click", toggleModalExcluir);
            fade.addEventListener("click", toggleModalExcluir);
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
            cancelarEditar.addEventListener("click", toggleModalEditar);
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
