// Tela "Meu desempenho" — estatísticas cumulativas do Modo Solo,
// lidas do LocalStorage (js/storage.js). Usa Chart.js (via CDN) quando
// disponível; se o gráfico não puder carregar (ex.: offline sem cache),
// os cartões numéricos continuam funcionando normalmente.

const StatsScreen = (() => {
  let chartInstance = null;

  function render() {
    const stats = Storage.getStats();
    const grid = document.getElementById("stats-grid");
    const emptyEl = document.getElementById("stats-empty");
    const chartCardEl = document.getElementById("chart-card");

    if (stats.perguntasRespondidas === 0) {
      emptyEl.style.display = "block";
      grid.style.display = "none";
      chartCardEl.style.display = "none";
      return;
    }
    emptyEl.style.display = "none";
    grid.style.display = "";

    const aproveitamento =
      stats.perguntasRespondidas > 0 ? ((stats.acertos / stats.perguntasRespondidas) * 100).toFixed(1) : "0.0";
    const tempoMedio =
      stats.respostasComTempo > 0 ? (stats.somaTempoResposta / stats.respostasComTempo).toFixed(1) : "0.0";

    const tiles = [
      { icon: "play", label: "Partidas", value: stats.partidas },
      { icon: "list", label: "Perguntas", value: stats.perguntasRespondidas },
      { icon: "check", label: "Acertos", value: stats.acertos },
      { icon: "x", label: "Erros", value: stats.erros },
      { icon: "percent", label: "Aproveitamento", value: aproveitamento + "%" },
      { icon: "flame", label: "Maior combo", value: stats.maiorCombo },
      { icon: "trophy", label: "Melhor pontuação", value: stats.maiorPontuacao },
      { icon: "timer", label: "Tempo médio", value: tempoMedio + "s" }
    ];

    grid.innerHTML = tiles
      .map(
        t => `
      <div class="stat-tile">
        <div class="stat-label">${Icons.svg(t.icon)}${t.label}</div>
        <div class="stat-value">${t.value}</div>
      </div>`
      )
      .join("");

    renderChart(stats);
  }

  function renderChart(stats) {
    const canvas = document.getElementById("chart-categorias");
    const cardEl = document.getElementById("chart-card");
    if (!canvas) return;

    const categorias = Object.keys(stats.categorias);
    if (categorias.length === 0) {
      cardEl.style.display = "none";
      return;
    }
    cardEl.style.display = "";

    if (typeof Chart === "undefined") {
      canvas.style.display = "none";
      showChartFallback(cardEl);
      return;
    }
    canvas.style.display = "";
    hideChartFallback();

    const data = categorias.map(c => {
      const s = stats.categorias[c];
      return s.total > 0 ? Math.round((s.acertos / s.total) * 100) : 0;
    });
    const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const muted = css("--rb-muted");
    const grid = css("--rb-border");
    const mono = { family: "'JetBrains Mono', ui-monospace, monospace", size: 11 };

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: categorias,
        datasets: [
          {
            label: "Aproveitamento por categoria (%)",
            data,
            backgroundColor: css("--rb-blue"),
            borderRadius: 3,
            maxBarThickness: 36
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: muted, font: mono, callback: v => v + "%" },
            grid: { color: grid },
            border: { display: false }
          },
          x: { ticks: { color: muted, font: mono }, grid: { display: false }, border: { color: grid } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function showChartFallback(cardEl) {
    let fallback = document.getElementById("chart-fallback");
    if (!fallback) {
      fallback = document.createElement("p");
      fallback.id = "chart-fallback";
      fallback.className = "chart-fallback";
      fallback.textContent = "Gráfico indisponível no momento. Conecte-se à internet e volte a esta tela.";
      cardEl.appendChild(fallback);
    }
    fallback.style.display = "block";
  }

  function hideChartFallback() {
    const fallback = document.getElementById("chart-fallback");
    if (fallback) fallback.style.display = "none";
  }

  return { render };
})();
