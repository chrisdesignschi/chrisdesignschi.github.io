
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