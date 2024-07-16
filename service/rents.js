document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('apiToken');

    if (token != null) {
        }

        const data = [
            { locatario: "Luiz", title: "Pica-Pau", author: "José da Fonseca", publisher: "Editorando", returnDate: "dd-mm-aaaa", status: "No prazo" },
            { locatario: "Luiz", title: "Livro 2", author: "Autor 2", publisher: "Editora 2", returnDate: "dd-mm-aaaa", status: "No prazo" },
            { locatario: "Luiz", title: "Livro 3", author: "Autor 3", publisher: "Editora 3", returnDate: "dd-mm-aaaa", status: "No prazo" },
            { locatario: "Luiz", title: "Livro 4", author: "Autor 4", publisher: "Editora 4", returnDate: "dd-mm-aaaa", status: "No prazo" },
            { locatario: "Luiz", title: "Livro 5", author: "Autor 5", publisher: "Editora 5", returnDate: "dd-mm-aaaa", status: "No prazo" },
            { locatario: "Luiz", title: "Livro 6", author: "Autor 6", publisher: "Editora 6", returnDate: "dd-mm-aaaa", status: "No prazo" }
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
                    <td>${row.locatario}</td>
                    <td>${row.title}</td>
                    <td>${row.author}</td>
                    <td>${row.publisher}</td>
                    <td>${row.returnDate}</td>
                    <td>${row.status}</td>
                    <td>
                        <button class="openModalEditar"><i class="fa-solid fa-pencil"></i></button>
                        <button class="openModalDevolver"><i class="fa-solid fa-book-bookmark"></i></button>
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
            const modalDevolver = document.querySelector("#modalDevolver");
            const openModalDevolverBtns = document.querySelectorAll(".openModalDevolver");
            const closeModalDevolver = document.querySelector("#closeBtn");
            const cancelarExcluir = document.querySelector(".cancelarBtn");
            const devolverBtn = document.querySelector(".devolverBtn")
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

            const toggleModalDevolver = () => {
                modalDevolver.classList.toggle("hide");
                fade.classList.toggle("hide");
            };

            openModalDevolverBtns.forEach(button => {
                button.addEventListener("click", toggleModalDevolver);
            });
            
            closeModalDevolver.addEventListener("click", toggleModalDevolver);
            fade.addEventListener("click", toggleModalDevolver);
            devolverBtn.addEventListener("click", toggleModalDevolver);
            cancelarExcluir.addEventListener("click", toggleModalDevolver);


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
