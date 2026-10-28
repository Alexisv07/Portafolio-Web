(function () {
  var menuButton = document.querySelector('.menu-toggle');
  var menu = document.getElementById('main-nav');
  var header = document.querySelector('.top');

  function setMenuOpen(open) {
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  menuButton.addEventListener('click', function () {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 641px)').matches) setMenuOpen(false);
  });

  var btn = document.getElementById('copy-btn');
  var txt = document.getElementById('mail-text');
  function select() {
    try {
      var r = document.createRange(); r.selectNodeContents(txt);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    } catch (e) {}
  }
  btn.addEventListener('click', function () {
    var value = txt.textContent.trim();
    var done = function (ok) {
      btn.textContent = ok ? 'Copiado' : 'Selecciona y copia el correo';
      if (!ok) select();
      setTimeout(function () { btn.textContent = 'Copiar correo'; }, 2200);
    };
    try {
      navigator.clipboard.writeText(value).then(function () { done(true); }, function () { done(false); });
    } catch (e) { done(false); }
  });
})();
