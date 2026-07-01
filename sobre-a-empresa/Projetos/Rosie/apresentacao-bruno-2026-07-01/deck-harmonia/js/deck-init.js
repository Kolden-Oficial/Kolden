// Deck Rosie 360 (Harmonia) — config reveal.js + acessibilidade
(function () {
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
        76: function () { toggleMode(); }, // L
        77: function () { window.print(); } // M
      }
    });
  }

  function toggleMode() {
    var btn = document.getElementById('modeToggle');
    var isLive = document.body.classList.toggle('live-mode');
    if (btn) {
      // WCAG 4.1.2 — state via aria-pressed
      btn.setAttribute('aria-pressed', isLive ? 'true' : 'false');
      btn.textContent = isLive ? '◉ Live (Core only) · L' : '○ Full (Core + Apêndice) · L';
    }
    if (window.Reveal) { Reveal.layout(); Reveal.sync(); }
  }
  window.toggleMode = toggleMode;

  document.addEventListener('DOMContentLoaded', function () {
    // Modo via URL
    var params = new URLSearchParams(location.search);
    if (params.get('mode') === 'live') document.body.classList.add('live-mode');

    // atom-skip-link (WCAG 2.4.1) — primeiro elemento do tab
    var skipLink = document.createElement('a');
    skipLink.href = '#main-deck';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Marca o container do deck como destino de skip
    var revealContainer = document.querySelector('.reveal');
    if (revealContainer) revealContainer.id = 'main-deck';

    // Botão Mode Toggle com aria-pressed
    var btn = document.createElement('button');
    btn.id = 'modeToggle';
    btn.className = 'mode-toggle';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-pressed', document.body.classList.contains('live-mode') ? 'true' : 'false');
    btn.setAttribute('aria-label', 'Alternar entre modo Live (somente core) e Full (core + apêndice)');
    btn.textContent = document.body.classList.contains('live-mode')
      ? '◉ Live (Core only) · L'
      : '○ Full (Core + Apêndice) · L';
    btn.onclick = toggleMode;
    document.body.appendChild(btn);

    // Audit log (DevTools)
    var core = document.querySelectorAll('.reveal section[data-section="core"]').length;
    var apx = document.querySelectorAll('.reveal section[data-section="apendice"]').length;
    console.log('[Deck Rosie 360 · Harmonia] Core:', core, '· Apêndice:', apx);
    console.log('[Acessibilidade] skip-link, aria-pressed, focus-visible aplicados.');
  });
})();
