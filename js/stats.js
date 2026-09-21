// Tela "📊 Meu Desempenho" — estatísticas cumulativas do Modo Solo,
// lidas do LocalStorage (js/storage.js). Usa Chart.js (via CDN) quando
// disponível; se o gráfico não puder carregar (ex.: offline sem cache),
// os cartões numéricos continuam funcionando normalmente.

const StatsScreen = (() => {
  let chartInstance = null;

  function render() {
    const stats = Storage.getStats();
    const grid = document.getElementById("stats-grid");

    const aproveitamento =
      stats.perguntasRespondidas > 0 ? ((stats.acertos / stats.perguntasRespondidas) * 100).toFixed(1) : "0.0";
    const tempoMedio =
      stats.respostasComTempo > 0 ? (stats.somaTempoResposta / stats.respostasComTempo).toFixed(1) : "0.0";

    const tiles = [
      { label: "Partidas", value: stats.partidas },
      { label: "Perguntas", value: stats.perguntasRespondidas },
      { label: "Acertos", value: stats.acertos },
      { label: "Erros", value: stats.erros },
      { label: "Aproveitamento", value: aproveitamento + "%" },
      { label: "Maior combo", value: stats.maiorCombo },
      { label: "Melhor pontuação", value: stats.maiorPontuacao },
      { label: "Tempo médio", value: tempoMedio + "s" }
    ];

    grid.innerHTML = tiles
      .map(t => `<div class="stat-tile"><div class="stat-value">${t.value}</div><div class="stat-label">${t.label}</div></div>`)
      .join("");

    renderChart(stats);
  }

  function renderChart(stats) {
    const canvas = document.getElementById("chart-categorias");
    if (!canvas) return;

    const categorias = Object.keys(stats.categorias);
    if (categorias.length === 0 || typeof Chart === "undefined") {
      canvas.style.display = "none";
      return;
    }
    canvas.style.display = "";

    const data = categorias.map(c => {
      const s = stats.categorias[c];
      return s.total > 0 ? Math.round((s.acertos / s.total) * 100) : 0;
    });
    const cores = categorias.map(c => {
      const cat = CATEGORIAS.find(x => x.nome === c);
      return cat ? cat.cor : "#3498db";
    });

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: categorias,
        datasets: [
          {
            label: "Aproveitamento por categoria (%)",
            data,
            backgroundColor: cores,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 100, ticks: { color: "#fff" } }, x: { ticks: { color: "#fff" } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  return { render };
})();
