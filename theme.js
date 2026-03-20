(function () {
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');

  // Only apply stored theme if user manually chose one
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }

  function getEffectiveTheme() {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Toggle — saves preference to localStorage
  toggle.addEventListener('click', function () {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Respect system changes — clear manual override so CSS media query takes over
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!localStorage.getItem('theme')) {
      document.documentElement.removeAttribute('data-theme');
    }
  });
})();
