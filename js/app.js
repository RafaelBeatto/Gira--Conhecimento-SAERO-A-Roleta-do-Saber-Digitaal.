// Orquestrador da V2.0: navegação entre telas, tema, configurações,
// conquistas e registro do Service Worker (PWA/offline).

const App = (() => {
  const SCREENS = [
    "screen-home",
    "screen-mode-select",
    "screen-turma",
    "screen-solo-game",
    "screen-solo-result",
    "screen-achievements",
    "screen-stats",
    "screen-settings"
  ];

  function showScreen(id) {
    SCREENS.forEach(s => {
      document.getElementById(s).classList.toggle("active", s === id);
    });
    window.scrollTo(0, 0);
  }

  function refreshHomeMiniStats() {
    const stats = Storage.getStats();
    document.getElementById("home-best-score").textContent = stats.maiorPontuacao;
    document.getElementById("home-best-combo").textContent = stats.maiorCombo;
  }

  function applyTheme() {
    const settings = Storage.getSettings();
    const root = document.documentElement;
    if (settings.temaEscuro === true) root.setAttribute("data-theme", "dark");
    else if (settings.temaEscuro === false) root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme"); // segue o tema do sistema

    document.body.classList.toggle("reduce-motion", settings.animacoesOn === false);
  }

  function renderAchievementsScreen() {
    const list = getAllAchievementsWithStatus();
    const grid = document.getElementById("achievements-grid");
    grid.innerHTML = list
      .map(
        a => `
        <div class="achievement-card ${a.desbloqueada ? "unlocked" : ""}">
          <span class="ach-emoji">${a.emoji}</span>
          <h4>${a.nome}</h4>
          <p>${a.descricao}</p>
          <p style="opacity:.7;font-size:11px;margin-top:6px;">${a.desbloqueada ? "✅ Desbloqueada" : "🔒 Bloqueada"}</p>
        </div>`
      )
      .join("");
  }

  let toastTimeout = null;
  function showAchievementToast(a) {
    const toast = document.getElementById("achievement-toast");
    toast.textContent = `🏆 Conquista desbloqueada: ${a.emoji} ${a.nome}`;
    toast.classList.add("show");
    GameAudio.achievement();
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function loadSettingsIntoForm() {
    const s = Storage.getSettings();
    document.getElementById("cfg-som").checked = !!s.somOn;
    document.getElementById("cfg-tema").checked = s.temaEscuro === true;
    document.getElementById("cfg-dificuldade").value = s.dificuldade;
    document.getElementById("cfg-cronometro").checked = !!s.cronometroOn;
    document.getElementById("cfg-vidas").checked = !!s.vidasOn;
    document.getElementById("cfg-animacoes").checked = !!s.animacoesOn;
    GameAudio.setEnabled(!!s.somOn);
  }

  function wireSettings() {
    document.getElementById("cfg-som").addEventListener("change", e => {
      Storage.saveSettings({ somOn: e.target.checked });
      GameAudio.setEnabled(e.target.checked);
    });
    document.getElementById("cfg-tema").addEventListener("change", e => {
      Storage.saveSettings({ temaEscuro: e.target.checked });
      applyTheme();
    });
    document.getElementById("cfg-dificuldade").addEventListener("change", e => {
      Storage.saveSettings({ dificuldade: e.target.value });
    });
    document.getElementById("cfg-cronometro").addEventListener("change", e => {
      Storage.saveSettings({ cronometroOn: e.target.checked });
    });
    document.getElementById("cfg-vidas").addEventListener("change", e => {
      Storage.saveSettings({ vidasOn: e.target.checked });
    });
    document.getElementById("cfg-animacoes").addEventListener("change", e => {
      Storage.saveSettings({ animacoesOn: e.target.checked });
      applyTheme();
    });
    document.getElementById("btn-restaurar-progresso").addEventListener("click", () => {
      if (confirm("Tem certeza? Essa ação não pode ser desfeita.")) {
        Storage.resetProgress();
        refreshHomeMiniStats();
        alert("Progresso restaurado com sucesso.");
      }
    });
  }

  function wireNavigation() {
    document.getElementById("btn-jogar-agora").addEventListener("click", () => showScreen("screen-mode-select"));
    document.getElementById("btn-ver-desempenho").addEventListener("click", () => {
      StatsScreen.render();
      showScreen("screen-stats");
    });
    document.getElementById("btn-conquistas").addEventListener("click", () => {
      renderAchievementsScreen();
      showScreen("screen-achievements");
    });
    document.getElementById("btn-configuracoes").addEventListener("click", () => {
      loadSettingsIntoForm();
      showScreen("screen-settings");
    });

    document.getElementById("btn-mode-select-back").addEventListener("click", () => showScreen("screen-home"));

    document.getElementById("card-modo-solo").addEventListener("click", () => {
      SoloGame.start();
      showScreen("screen-solo-game");
    });
    document.getElementById("card-modo-turma").addEventListener("click", () => showScreen("screen-turma"));

    document.getElementById("btn-turma-home").addEventListener("click", () => showScreen("screen-home"));
    document.getElementById("btn-solo-home-top").addEventListener("click", () => {
      if (confirm("Sair da partida atual? O progresso desta rodada será perdido.")) {
        SoloGame.stopClock();
        showScreen("screen-home");
      }
    });

    document.getElementById("btn-jogar-novamente").addEventListener("click", () => {
      SoloGame.start();
      showScreen("screen-solo-game");
    });
    document.getElementById("btn-resultado-home").addEventListener("click", () => {
      refreshHomeMiniStats();
      showScreen("screen-home");
    });
    document.getElementById("btn-resultado-desempenho").addEventListener("click", () => {
      StatsScreen.render();
      showScreen("screen-stats");
    });

    document.getElementById("btn-achievements-home").addEventListener("click", () => showScreen("screen-home"));
    document.getElementById("btn-stats-home").addEventListener("click", () => showScreen("screen-home"));
    document.getElementById("btn-settings-home").addEventListener("click", () => showScreen("screen-home"));
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(err => console.warn("Service Worker não registrado:", err));
      });
    }
  }

  function init() {
    applyTheme();
    loadSettingsIntoForm();
    wireNavigation();
    wireSettings();
    refreshHomeMiniStats();
    showScreen("screen-home");
    registerServiceWorker();
  }

  init();

  return { showScreen, refreshHomeMiniStats, showAchievementToast };
})();
