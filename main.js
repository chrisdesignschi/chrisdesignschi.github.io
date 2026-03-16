
const root = document.documentElement; 
const toggleBtn = document.getElementById('theme-toggle');

// --- Load saved theme on page load ---
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
} else if (savedTheme === 'dark') {
  root.removeAttribute('data-theme'); // your default
}

// --- Toggle theme ---
toggleBtn.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';

  if (isLight) {
    // Switch to dark (your default theme)
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    // Switch to light
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

let scrollY = 0;

function lockScroll() {
  scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
}

function unlockScroll() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollY);
}

// Open modal
document.querySelectorAll("[data-modal-target]").forEach(trigger => {
  trigger.addEventListener("click", () => {
    const modal = document.querySelector(trigger.dataset.modalTarget);

    modal.classList.add("active");
    lockScroll();           // 🚫 disable background scrolling

    // trigger animation
    requestAnimationFrame(() => {
      modal.classList.add("show");
    });
  });
});

// Close modal (button)
document.querySelectorAll(".modal .close").forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("show");

    modal.addEventListener("transitionend", () => {
      modal.classList.remove("active");
    }, { once: true });

    unlockScroll();
  });
});

// Close modal by clicking outside modal-content
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");

      modal.addEventListener("transitionend", () => {
        modal.classList.remove("active");
      }, { once: true });

      unlockScroll();
    }
  });
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach(modal => {
      modal.classList.remove("show");

      modal.addEventListener("transitionend", () => {
        modal.classList.remove("active");
      }, { once: true });

      unlockScroll();
    });
  }
});