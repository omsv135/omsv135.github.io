(function () {
  'use strict';

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  prefersDarkScheme.addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
      const expanded = navLinks.classList.contains('show');
      mobileNavToggle.setAttribute('aria-expanded', expanded);
    });

    document.addEventListener('click', function (event) {
      if (!navLinks.contains(event.target) && !mobileNavToggle.contains(event.target)) {
        navLinks.classList.remove('show');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

})();
