(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var yearEl = document.getElementById('year');

  // Tahun otomatis di footer
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Tema gelap/terang
  function getSavedTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }

  function saveTheme(value) {
    try {
      localStorage.setItem('theme', value);
    } catch (e) {}
  }

  function applyTheme(value) {
    root.setAttribute('data-theme', value);
    if (btn) {
      btn.setAttribute('aria-pressed', value === 'dark' ? 'true' : 'false');
    }
  }

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(getSavedTheme() || (prefersDark ? 'dark' : 'light'));

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveTheme(next);
    });
  }

  // Tandai menu yang sedang dilihat saat scroll
  var links = document.querySelectorAll('#nav a');
  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id && id.charAt(0) === '#') {
      var section = document.querySelector(id);
      if (section) sections.push({ link: link, section: section });
    }
  });

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          sections.forEach(function (item) {
            if (item.section === entry.target) item.link.classList.add('active');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (item) { observer.observe(item.section); });
  }
})();
