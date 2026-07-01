// Deck Rosie 360 — config reveal.js + filtro core/apendice
(function () {
  // 1) Inicializa reveal.js
  if (window.Reveal) {
    Reveal.initialize({
      width: 1280,
      height: 800,
      margin: 0.04,
      minScale: 0.4,
      maxScale: 1.8,
      hash: true,
      progress: true,
      controls: true,
      controlsTutorial: false,
      slideNumber: 'c/t',
      transition: 'fade',
      transitionSpeed: 'default',
      backgroundTransition: 'fade',
      pdfSeparateFragments: false,
      keyboard: {
        76: function () { toggleMode(); }, // L = toggle live/full
        77: function () { window.print(); } // M = print
      }
    });
  }

  // 2) Modo live (oculta apêndice) vs full
  function toggleMode() {
    document.body.classList.toggle('live-mode');
    var btn = document.getElementById('modeToggle');
    if (btn) {
      btn.textContent = document.body.classList.contains('live-mode')
        ? '◉ Live (Core only) · L'
        : '○ Full (Core + Apêndice) · L';
    }
    // Atualiza reveal layout
    if (window.Reveal) { Reveal.layout(); Reveal.sync(); }
  }
  window.toggleMode = toggleMode;

  // 3) Atalho ?live ou ?full pela URL
  document.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(location.search);
    if (params.get('mode') === 'live') document.body.classList.add('live-mode');

    // Botão de toggle no canto superior direito
    var btn = document.createElement('button');
    btn.id = 'modeToggle';
    btn.className = 'mode-toggle';
    btn.textContent = document.body.classList.contains('live-mode')
      ? '◉ Live (Core only) · L'
      : '○ Full (Core + Apêndice) · L';
    btn.onclick = toggleMode;
    document.body.appendChild(btn);

    // Conta slides core e apêndice
    var core = document.querySelectorAll('.reveal section[data-section="core"]').length;
    var apx = document.querySelectorAll('.reveal section[data-section="apendice"]').length;
    console.log('[Deck Rosie 360] Core:', core, '· Apêndice:', apx);
  });
})();
