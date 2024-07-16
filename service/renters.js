document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('apiToken');

    if (token != null) {
        }

        const data = [
            { name: "João Silva", email: "joao.silva@example.com", phone: "(xx) xxxxxxxxx" },
            { name: "Maria Souza", email: "maria.souza@example.com", phone: "(xx) xxxxxxxxx" },
            { name: "Pedro Oliveira", email: "pedro.oliveira@example.com", phone: "(xx) xxxxxxxxx" },
            { name: "Ana Costa", email: "ana.costa@example.com", phone: "(xx) xxxxxxxxx" },
            { name: "Lucas Lima", email: "lucas.lima@example.com", phone: "(xx) xxxxxxxxx" },
            { name: "Clara Menezes", email: "clara.menezes@example.com", phone: "(xx) xxxxxxxxx" }
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
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.phone}</td>
                    <td>
                        <button class="openModalDetalhes"><i class="fa-solid fa-eye"></i></button>
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
            const modalCadastrar = document.querySelector("#modalCadastrar");
            const formCadastrar = document.querySelector("#formCadastro")
            const openModalCadastrar = document.querySelectorAll(".cadastrarBtn");
            const closeModalCadastrar = document.querySelector("#closeBtnCadastrar");
            const cancelarCadastrar = document.querySelector(".cancelarCadastroBtn");
            const cancelarCadastrar2 = document.querySelector(".cancelarCadastroBtn2");
            const proximoBtn = document.querySelector(".proximoCadastroBtn");
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

            cancelarCadastrar2.addEventListener("click", function() {
                prevStep();
                toggleModalCadastrar();
            });            

            // Steps
            let currentStep = 0;
            const steps = document.getElementsByClassName("step");
    
            function showStep(step) {
                steps[step].classList.add("activeStep");
            }
    
            function hideStep(step) {
                steps[step].classList.remove("activeStep");
            }
    
            function nextStep() {
                hideStep(currentStep);
                currentStep++;
                showStep(currentStep);
            }

            function prevStep() {
                hideStep(currentStep);
                currentStep--;
                showStep(currentStep);
            }

            proximoBtn.addEventListener("click", nextStep)

            // checkando se o formulario foi preenchido
            formCadastrar.addEventListener("submit", (event) => {
                event.preventDefault();

                const camposObrigatorios = formCadastrar.querySelectorAll('[required]');
                let camposPreenchidos = true;

                camposObrigatorios.forEach(field => {
                    if (!field.value){
                        camposPreenchidos = false;
                        console.log("eima")
                    }
                });

                if (camposPreenchidos){
                    proximoBtn.addEventListener("click", nextStep)
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
    });
