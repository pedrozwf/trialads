document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const content = document.querySelector(".content");
  const MAX_ITEMS = 4; // Limite máximo de content items

  // Garante que o submenu inicie fechado
  dropdownMenu.style.maxHeight = "0"; // Define a altura inicial como 0
  dropdownMenu.style.overflow = "hidden"; // Esconde o conteúdo excedente
  dropdownMenu.style.opacity = "0"; // Começa invisível

  // Toggle dropdown menu com animação suave
  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (dropdownMenu.style.maxHeight === "0px" || dropdownMenu.style.maxHeight === "0") {
      dropdownMenu.style.maxHeight = "500px"; // Define a altura máxima ao abrir
      dropdownMenu.style.padding = "10px 0"; // Adiciona padding ao abrir
      dropdownMenu.style.opacity = "1"; // Torna visível
    } else {
      dropdownMenu.style.maxHeight = "0"; // Fecha o menu
      dropdownMenu.style.padding = "0"; // Remove o padding ao fechar
      dropdownMenu.style.opacity = "0"; // Torna invisível
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
      dropdownMenu.style.maxHeight = "0"; // Fecha o menu ao clicar fora
      dropdownMenu.style.padding = "0"; // Remove o padding ao fechar
      dropdownMenu.style.opacity = "0"; // Torna invisível
    }
  });

  // Remove qualquer conteúdo extra e garante o limite de content items
  const enforceContentLimit = () => {
    const items = Array.from(content.children);
    if (items.length > MAX_ITEMS) {
      console.warn("Removendo itens extras.");
      while (content.children.length > MAX_ITEMS) {
        content.removeChild(content.lastChild);
      }
    }
  };

  // Observa mudanças no container e remove qualquer novo card adicionado
  const observer = new MutationObserver(() => {
    enforceContentLimit();
  });

  observer.observe(content, { childList: true });

  // Remove o carregamento infinito
  window.addEventListener("scroll", () => {
    console.warn("Carregamento infinito desativado.");
  });

  // Garante que apenas os itens originais sejam mantidos
  enforceContentLimit();

  const logo = document.querySelector(".intro-logo img");

  // Verifica se o dispositivo é móvel
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (!isMobile && logo) {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const rect = logo.getBoundingClientRect();
      const logoX = rect.left + rect.width / 2;
      const logoY = rect.top + rect.height / 2;

      const deltaX = (mouseX - logoX) * 0.05; // Ajusta a intensidade do efeito
      const deltaY = (mouseY - logoY) * 0.05;

      logo.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
    });

    // Restaura a posição original ao sair do container
    document.addEventListener("mouseleave", () => {
      logo.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  } else {
    console.log("Efeito 3D desativado para dispositivos móveis.");
  }

  logo.addEventListener("mouseenter", () => {
    console.log("Logo interagida."); // Apenas um log simples para interação
  });

  logo.addEventListener("mouseleave", () => {
    console.log("Logo desinteragida."); // Apenas um log simples para interação
  });
});