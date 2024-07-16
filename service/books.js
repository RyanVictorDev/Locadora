document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('apiToken');

    if (token != null) {
        }

        const data = [
            { title: "Pica-Pau", author: "José da Fonseca", publisher: "Editorando", available: 50, rented: 50, release: "dd-mm-aaaa", status: "Disponível" },
            { title: "Livro 2", author: "Autor 2", publisher: "Editora 2", available: 20, rented: 30, release: "dd-mm-aaaa", status: "Disponível" },
            { title: "Livro 3", author: "Autor 3", publisher: "Editora 3", available: 15, rented: 35, release: "dd-mm-aaaa", status: "Indisponível" },
            { title: "Livro 4", author: "Autor 4", publisher: "Editora 4", available: 10, rented: 40, release: "dd-mm-aaaa", status: "Disponível" },
            { title: "Livro 5", author: "Autor 5", publisher: "Editora 5", available: 5, rented: 45, release: "dd-mm-aaaa", status: "Disponível" },
            { title: "Livro 6", author: "Autor 6", publisher: "Editora 6", available: 0, rented: 50, release: "dd-mm-aaaa", status: "Indisponível" }
        ];

        const rowsPerPage = 3;
        let currentPage = 0;

        const tableBody = document.getElementById('table-body');
        const paginacaoItems = document.querySelectorAll('.paginacaoItem');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        function renderTable(page) {
            tableBody.innerHTML = '';
            const start = page * rowsPerPage;
            const end = start + rowsPerPage;
            const pageData = data.slice(start, end);
            pageData.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.title}</td>
                    <td>${row.author}</td>
                    <td>${row.publisher}</td>
                    <td>${row.available}</td>
                    <td>${row.rented}</td>
                    <td>${row.release}</td>
                    <td>${row.status}</td>
                    <td>
                        <button class="alugarBtn"><i class="fa-solid fa-book-bookmark"></i></button>
                        <button class="openModalEditar"><i class="fa-solid fa-pencil"></i></button>
                        <button class="openModalExcluir"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `;
                tableBody.appendChild(tr);
                addModalEventListeners();

            });
        }

        function changePage(direction) {
            const activeItem = document.querySelector('.paginacaoItem.active');
            let currentIndex = Array.from(paginacaoItems).indexOf(activeItem);
            let newIndex = currentIndex + direction;

            if (newIndex < 0) {
                newIndex = paginacaoItems.length - 1; 
            } else if (newIndex >= paginacaoItems.length) {
                newIndex = 0; 
            }

            activeItem.classList.remove('active');
            paginacaoItems[newIndex].classList.add('active');
            currentPage = newIndex;
            renderTable(currentPage);
        }

        prevButton.addEventListener('click', function() {
            changePage(-1);
        });

        nextButton.addEventListener('click', function() {
            changePage(1);
        });

        paginacaoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                document.querySelector('.paginacaoItem.active').classList.remove('active');
                item.classList.add('active');
                currentPage = index;
                renderTable(currentPage);
            });
        });

        renderTable(currentPage);


        function addModalEventListeners() {
            const modalAlugar = document.querySelector("#modalAlugar");
            const formAlugar = document.querySelector("#formAluguel")
            const openModalAlugar = document.querySelectorAll(".alugarBtn");
            const closeModalAlugar = document.querySelector("#closeBtnAlugar");
            const cancelarAlugar = document.querySelector(".cancelarAluguelBtn");
            const alugarBtn = document.querySelector(".salvarAluguelBtn");
            const fadeAlugar = document.querySelector("#fadeAlugar")

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


            const toggleModalAlugar = () => {
                modalAlugar.classList.toggle("hide");
                fadeAlugar.classList.toggle("hide");
            };

            openModalAlugar.forEach(button => {
                button.addEventListener("click", toggleModalAlugar);
            });

            closeModalAlugar.addEventListener("click", toggleModalAlugar);
            fadeAlugar.addEventListener("click", toggleModalAlugar);
            cancelarAlugar.addEventListener("click", toggleModalAlugar);

            // checkando se o formulario foi preenchido
            formAlugar.addEventListener("submit", (event) => {
                event.preventDefault();

                const camposObrigatorios = formAlugar.querySelectorAll('[required]');
                let camposPreenchidos = true;

                camposObrigatorios.forEach(field => {
                    if (!field.value){
                        camposPreenchidos = false;
                    }
                });

                if (camposPreenchidos){
                    alugarBtn.addEventListener("click", toggleModalAlugar)
                    toggleModalAlugar();
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


        // const checkApiClient = setInterval(() => {
        //     if (apiClient) {
        //         clearInterval(checkApiClient);
        //     }
        // }, 100);    
}});
