// Ícones lineares da identidade RB (traço único, 24x24, cor herdada do texto).
// Elementos estáticos usam <span data-icon="nome"></span>, trocados pelo SVG
// no carregamento; o JS usa Icons.svg("nome").

// replaceChildren só existe a partir do Safari 14 / Chrome 86; o Modo Turma
// depende dele, então tablets e celulares mais antigos ganham esta versão.
if (!Element.prototype.replaceChildren) {
  Element.prototype.replaceChildren = function (...nodes) {
    this.textContent = "";
    this.append(...nodes);
  };
}

const Icons = (() => {
  const PATHS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/>',
    back: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    play: '<path d="M7 4.5v15l12-7.5z"/>',
    chart: '<path d="M3 3v18h18"/><path d="M8 17v-5"/><path d="M13 17V8"/><path d="M18 17v-9"/>',
    trophy:
      '<path d="M8 21h8"/><path d="M12 16v5"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/>' +
      '<path d="M17 6h3v1.5A3.5 3.5 0 0 1 16.6 11"/><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.4 11"/>',
    sliders:
      '<path d="M4 6h9"/><path d="M17 6h3"/><circle cx="15" cy="6" r="2"/>' +
      '<path d="M4 12h3"/><path d="M11 12h9"/><circle cx="9" cy="12" r="2"/>' +
      '<path d="M4 18h11"/><path d="M19 18h1"/><circle cx="17" cy="18" r="2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users:
      '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/>' +
      '<path d="M15.5 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18 14.3a6.5 6.5 0 0 1 3.5 5.7"/>',
    heart: '<path d="M12 20s-7.5-4.4-9.2-9.3A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 9.2 4.5C19.5 15.6 12 20 12 20z"/>',
    flame:
      '<path d="M12 22c4 0 7-2.8 7-6.8 0-4.4-3.6-6.7-4.6-10.2-2.2 1.3-3 3.6-3 5.6-1.4-.7-2.4-2-2.6-3.6C6.6 9 5 11.6 5 15.2 5 19.2 8 22 12 22z"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/>',
    bulb:
      '<path d="M9 18h6"/><path d="M10 21h4"/>' +
      '<path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    wheel:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/>' +
      '<path d="M12 3v6.5"/><path d="M12 14.5V21"/><path d="M3 12h6.5"/><path d="M14.5 12H21"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    crown: '<path d="m3 7 4.5 4L12 5l4.5 6L21 7l-2 11H5z"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    list:
      '<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/>' +
      '<circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3"/>',
    keyboard:
      '<rect x="2" y="6" width="20" height="12" rx="2"/>' +
      '<path d="M6 10h.01"/><path d="M10 10h.01"/><path d="M14 10h.01"/><path d="M18 10h.01"/><path d="M7 14h10"/>'
  };

  function svg(name, className = "") {
    const body = PATHS[name];
    if (!body) return "";
    return (
      `<svg class="icon${className ? " " + className : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
      `stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
    );
  }

  function hydrate(root = document) {
    root.querySelectorAll("[data-icon]").forEach(el => {
      el.outerHTML = svg(el.dataset.icon, el.className);
    });
  }

  hydrate();

  return { svg, hydrate };
})();
