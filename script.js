document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const content = document.querySelector(".content");
  const MAX_ITEMS = 4;

  dropdownMenu.style.maxHeight = "0";
  dropdownMenu.style.overflow = "hidden";
  dropdownMenu.style.opacity = "0";

  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (dropdownMenu.style.maxHeight === "0px" || dropdownMenu.style.maxHeight === "0") {
      dropdownMenu.style.maxHeight = "500px";
      dropdownMenu.style.padding = "10px 0";
      dropdownMenu.style.opacity = "1";
    } else {
      dropdownMenu.style.maxHeight = "0";
      dropdownMenu.style.padding = "0";
      dropdownMenu.style.opacity = "0";
    }
  });

  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
      dropdownMenu.style.maxHeight = "0";
      dropdownMenu.style.padding = "0";
      dropdownMenu.style.opacity = "0";
    }
  });

  const enforceContentLimit = () => {
    const items = Array.from(content.children);
    if (items.length > MAX_ITEMS) {
      while (content.children.length > MAX_ITEMS) {
        content.removeChild(content.lastChild);
      }
    }
  };

  const observer = new MutationObserver(() => {
    enforceContentLimit();
  });

  observer.observe(content, { childList: true });

  window.addEventListener("scroll", () => {
  });

  enforceContentLimit();

  const logo = document.querySelector(".intro-logo img");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (!isMobile && logo) {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const rect = logo.getBoundingClientRect();
      const logoX = rect.left + rect.width / 2;
      const logoY = rect.top + rect.height / 2;

      const deltaX = (mouseX - logoX) * 0.05;
      const deltaY = (mouseY - logoY) * 0.05;

      logo.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
    });

    document.addEventListener("mouseleave", () => {
      logo.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  } else {
    console.log("Efeito 3D desativado para dispositivos móveis.");
  }

  logo.addEventListener("mouseenter", () => {
    console.log("Logo interagida.");
  });

  logo.addEventListener("mouseleave", () => {
    console.log("Logo desinteragida.");
  });
});

