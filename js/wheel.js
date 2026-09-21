// Roleta de categorias da V2.0 (Modo Solo).
// Reaproveita a mesma técnica do Modo Turma (ponteiro fixo no topo + cálculo
// do segmento sorteado), mas desenhando as 7 categorias em vez de números de
// pergunta, e com uma curva de easing que acelera e desacelera (mais realista).

const CategoryWheel = (() => {
  let canvas = null;
  let ctx = null;
  let angle = 0;
  let spinning = false;
  const categorias = CATEGORIAS;

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    draw();
  }

  function draw() {
    if (!ctx) return;
    const n = categorias.length;
    const angleStep = (2 * Math.PI) / n;
    const r = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < n; i++) {
      const startAngle = i * angleStep;
      const endAngle = startAngle + angleStep;

      ctx.fillStyle = categorias[i].cor;
      ctx.beginPath();
      ctx.moveTo(r, r);
      ctx.arc(r, r, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(startAngle + angleStep / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(r * 0.14)}px Arial`;
      ctx.fillText(categorias[i].emoji, r - 16, 8);
      ctx.restore();
    }
  }

  function spin(onDone) {
    if (spinning || !canvas) return;
    spinning = true;

    const n = categorias.length;
    const voltas = 3 + Math.floor(Math.random() * 2); // 3 a 4 voltas completas
    const randomSpin = voltas * 360 + Math.floor(Math.random() * 360);
    const finalAngle = angle + randomSpin;
    const duracao = 3.4; // segundos

    canvas.style.transition = `transform ${duracao}s cubic-bezier(0.32, 0.72, 0.14, 1)`;
    canvas.style.transform = `rotate(${finalAngle}deg)`;

    if (window.GameAudio) GameAudio.spin();

    setTimeout(() => {
      angle = finalAngle % 360;
      const anglePerSegment = 360 / n;
      // Ponteiro fixo no topo (270° no sistema de ângulos do canvas) — mesmo
      // raciocínio usado no Modo Turma para descobrir a fatia sob o ponteiro.
      const pointerAngle = ((270 - angle) % 360 + 360) % 360;
      const selectedIndex = Math.floor(pointerAngle / anglePerSegment) % n;

      spinning = false;
      if (typeof onDone === "function") onDone(categorias[selectedIndex], selectedIndex);
    }, duracao * 1000);
  }

  return {
    init,
    draw,
    spin,
    isSpinning: () => spinning
  };
})();
