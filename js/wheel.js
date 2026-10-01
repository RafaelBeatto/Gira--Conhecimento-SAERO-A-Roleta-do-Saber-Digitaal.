// Desenho das roletas (Modo Solo e Modo Turma) na identidade RB: fatias em
// tons neutros alternados, rótulos em fonte mono e miolo em forma de "nó de
// circuito". As cores vêm das variáveis CSS do tema (--wheel-*).

const WheelPaint = (() => {
  const MONO = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // size = tamanho lógico (px CSS); o canvas é redimensionado para a
  // densidade da tela para o texto não ficar borrado.
  function draw(canvas, size, labels, { fontSize = 12 } = {}) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const n = labels.length;
    if (!n) return;

    const segs = [cssVar("--wheel-seg-1"), cssVar("--wheel-seg-2"), cssVar("--wheel-seg-3")];
    const line = cssVar("--wheel-line");
    const text = cssVar("--wheel-text");
    const ring = cssVar("--wheel-ring");
    const hub = cssVar("--wheel-hub");

    const c = size / 2;
    const radius = c - 2;
    const step = (2 * Math.PI) / n;

    for (let i = 0; i < n; i++) {
      // Alterna dois tons; com número ímpar de fatias a última usa um terceiro
      // tom para não ficar igual à primeira (vizinhas).
      const fill = n > 1 && n % 2 === 1 && i === n - 1 ? segs[2] : segs[i % 2];
      const start = i * step;
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.arc(c, c, radius, start, start + step);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (n > 1) {
        ctx.strokeStyle = line;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(start + step / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${fontSize}px ${MONO}`;
      ctx.fillStyle = text;
      ctx.fillText(String(labels[i]), radius - 14, 0);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(c, c, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = ring;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(c, c, 20, 0, 2 * Math.PI);
    ctx.fillStyle = hub;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(c, c, 6, 0, 2 * Math.PI);
    ctx.fillStyle = segs[0];
    ctx.fill();
  }

  // Redesenha quando a fonte mono terminar de carregar (o canvas não espera).
  function whenFontReady(callback) {
    if (document.fonts && document.fonts.load) {
      document.fonts.load(`600 12px ${MONO}`).then(callback, () => {});
    }
  }

  return { draw, whenFontReady };
})();

// Roleta de categorias do Modo Solo. Ponteiro fixo no topo + cálculo do
// segmento sorteado (mesma técnica do Modo Turma).
const CategoryWheel = (() => {
  const SIZE = 320;
  let canvas = null;
  let angle = 0;
  let rotation = 0;
  let spinning = false;
  const categorias = CATEGORIAS;

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;
    draw();
    WheelPaint.whenFontReady(draw);
  }

  function draw() {
    if (!canvas) return;
    WheelPaint.draw(canvas, SIZE, categorias.map(c => c.rotulo), { fontSize: 11 });
  }

  function spin(onDone) {
    if (spinning || !canvas) return;
    spinning = true;

    const n = categorias.length;
    const voltas = 3 + Math.floor(Math.random() * 2); // 3 a 4 voltas completas
    const randomSpin = voltas * 360 + Math.floor(Math.random() * 360);
    // Soma sobre a rotação acumulada (não sobre angle % 360): assim o CSS
    // sempre gira para frente, nunca "volta" em relação ao giro anterior.
    rotation += randomSpin;
    const finalAngle = rotation;
    const duracao = 3.4; // segundos

    canvas.style.transition = `transform ${duracao}s cubic-bezier(0.32, 0.72, 0.14, 1)`;
    canvas.style.transform = `rotate(${finalAngle}deg)`;

    GameAudio.spin();

    setTimeout(() => {
      angle = finalAngle % 360;
      const anglePerSegment = 360 / n;
      // Ponteiro fixo no topo (270° no sistema de ângulos do canvas).
      const pointerAngle = ((270 - angle) % 360 + 360) % 360;
      const selectedIndex = Math.floor(pointerAngle / anglePerSegment) % n;

      spinning = false;
      if (typeof onDone === "function") onDone(categorias[selectedIndex], selectedIndex);
    }, duracao * 1000);
  }

  document.addEventListener("rb:themechange", draw);

  return {
    init,
    draw,
    spin,
    isSpinning: () => spinning
  };
})();
