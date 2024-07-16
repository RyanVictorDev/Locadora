const ctx = document.getElementById('relacoesLivrosChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Alugados', 'Atrasados', 'Devolvidos no prazo', 'Devolvidos fora do prazo'],
    datasets: [{
      label: ['Relação de livros'],
      data: [400, 500, 184, 395],
      backgroundColor:['#509358', '#B22222', '#46769A', '#C65F15'] ,
      borderWidth: 0,
      borderRadius: 5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const ctx2 = document.getElementById('LivrosChart');

new Chart(ctx2, {
  type: 'pie',
  data: {
    labels: ['Harry Potter', 'The Boys', 'Receitas da Vovó'],
    datasets: [{
      label: 'Livros mais alugados',
      data: [999, 400, 297],
      backgroundColor:['#509358', '#B22222', '#46769A'] ,
      borderWidth: 0
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// paginacao

const data = [
  { user: "João Silva", total: 12, active: 2 },
  { user: "Maria Souza", total: 16, active: 8 },
  { user: "Pedro Oliveira", total: 50, active: 5 },
  { user: "Ana Costa", total: 20, active: 4 },
  { user: "Lucas Lima", total: 22, active: 6 },
  { user: "Clara Menezes", total: 18, active: 7 },
  { user: "Paulo Ricardo", total: 30, active: 1 },
  { user: "Juliana Alves", total: 40, active: 3 },
  { user: "Rafael Dias", total: 25, active: 2 },
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
          <td>${row.user}</td>
          <td>${row.total}</td>
          <td>${row.active}</td>
      `;
      tableBody.appendChild(tr);
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
