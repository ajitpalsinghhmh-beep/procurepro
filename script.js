// script.js

// 1) Apply background images from data-bg on each section
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".page-section");

  sections.forEach(section => {
    const bg = section.getAttribute("data-bg");
    if (bg) {
      section.style.backgroundImage = `url('${bg}')`;
    }
  });

  // 2) Smooth scroll for buttons/links with .scroll-to
  document.querySelectorAll(".scroll-to").forEach(btn => {
    btn.addEventListener("click", e => {
      const targetId = btn.getAttribute("data-target");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 70; // navbar height
        const rect = targetEl.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = rect.top + scrollTop - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // 3) Simple active nav state on scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionIds = Array.from(navLinks).map(link => link.getAttribute("href"));

  const handleScroll = () => {
    const scrollPos = window.scrollY + 90;

    sectionIds.forEach(href => {
      const section = document.querySelector(href);
      if (!section) return;

      const offsetTop = section.offsetTop;
      const offsetBottom = offsetTop + section.offsetHeight;

      const link = document.querySelector(`.nav-link[href="${href}"]`);
      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        navLinks.forEach(l => l.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 4) Modal handling
  const openButtons = document.querySelectorAll(".open-modal");
  const backdrops = document.querySelectorAll(".modal-backdrop");

  const closeAllModals = () => {
    backdrops.forEach(b => b.classList.remove("active"));
  };

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal-id");
      const backdrop = document.querySelector(`.modal-backdrop[data-modal="${id}"]`);
      if (backdrop) {
        backdrop.classList.add("active");
      }
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener("click", e => {
      // close when clicking on backdrop or close button
      if (
        e.target.classList.contains("modal-backdrop") ||
        e.target.classList.contains("modal-close")
      ) {
        closeAllModals();
      }
    });
  });

  // Escape key closes modals
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });
});
