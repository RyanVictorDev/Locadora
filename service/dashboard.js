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
const paginacaoItems = document.querySelectorAll('.paginacaoItem');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', function() {
    changePage(-1);
});

nextButton.addEventListener('click', function() {
    changePage(1);
});

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
}