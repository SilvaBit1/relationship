/******************************************************************************
 * ANIMAÇÃO DE CORAÇÕES CAINDO
 ******************************************************************************/
function createHeart() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
  
    // Define posição e velocidade aleatórias
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (2 + Math.random() * 3) + 's';
  
    heartsContainer.appendChild(heart);
  
    // Remove o coração após 5s
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
  
  // Cria um coração a cada 500ms
  setInterval(createHeart, 500);
  
  /******************************************************************************
   * MODAL - Tempo Juntos
   ******************************************************************************/
  let updateInterval = null; // Controla o setInterval para atualizar o contador
  
  document.addEventListener('DOMContentLoaded', () => {
    const btnTempo = document.getElementById('btn-tempo');
    const modalTempo = document.getElementById('modal-tempo');
    const closeTempo = document.getElementById('close-tempo');
  
    // Elementos para carregamento e conteúdo carregado
    const loadingContainer = document.getElementById('loading-container');
    const loadedContent = document.getElementById('loaded-content');
  
    // Ao clicar em "tempo juntos", exibe o modal
    btnTempo.addEventListener('click', () => {
      modalTempo.classList.add('active');
      
      // Exibe apenas o carregamento (com flores já visíveis) e oculta o conteúdo carregado
      loadingContainer.style.display = 'block';
      loadedContent.style.display = 'none';
  
      // Limpa intervalo anterior, se houver
      if (updateInterval) clearInterval(updateInterval);
  
      // Após 2 segundos, oculta o carregamento e revela o conteúdo na ordem: título, imagem, contador
      setTimeout(() => {
        loadingContainer.style.display = 'none';
        loadedContent.style.display = 'block';
        // Inicia a atualização do contador a cada segundo
        updateInterval = setInterval(updateTimeTogether, 1000);
      }, 2000);
    });
  
    // Ao clicar no botão "X", fecha o modal e para o contador
    closeTempo.addEventListener('click', () => {
      modalTempo.classList.remove('active');
      if (updateInterval) clearInterval(updateInterval);
    });
  });
  
  /******************************************************************************
   * Atualiza o contador de "tempo juntos" (iniciado em 07/11/2024 às 21:00)
   ******************************************************************************/
  function updateTimeTogether() {
    const startDate = new Date("2024-11-07T21:00:00");
    const now = new Date();
    let diffMs = now - startDate;
  
    // Se a data ainda não começou
    if (diffMs < 0) {
      document.getElementById('anos').textContent = '0';
      document.getElementById('meses').textContent = '0';
      document.getElementById('dias').textContent = '0';
      document.getElementById('hms').textContent = 'Ainda não começou!';
      return;
    }
  
    let seconds = Math.floor(diffMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
  
    // Aproximação simples para anos, meses e dias
    let years = Math.floor(days / 365);
    let months = Math.floor((days % 365) / 30);
    let remainingDays = (days % 365) % 30;
  
    let remainingHours = hours % 24;
    let remainingMinutes = minutes % 60;
    let remainingSeconds = seconds % 60;
  
    // Atualiza os elementos HTML com os valores calculados
    document.getElementById('anos').textContent = years;
    document.getElementById('meses').textContent = months;
    document.getElementById('dias').textContent = remainingDays;
    document.getElementById('hms').textContent =
      `${pad(remainingHours)}:${pad(remainingMinutes)}:${pad(remainingSeconds)}`;
  }
  
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }
  