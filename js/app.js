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

  // O jogo começa pela tela inicial, então suas telas marcam "Início" no menu.
  const NAV_PARENT = {
    "screen-mode-select": "screen-home",
    "screen-solo-game": "screen-home",
    "screen-solo-result": "screen-home",
    "screen-turma": "screen-home"
  };
  const NAV_COLLAPSED_KEY = "gira_nav_collapsed";

  // Efeito de clique em algo que já está aberto (não troca de tela).
  function pressFeedback(el) {
    el.classList.remove("is-pressed");
    void el.offsetWidth;
    el.classList.add("is-pressed");
    el.addEventListener("animationend", () => el.classList.remove("is-pressed"), { once: true });
  }

  function showScreen(id) {
    SCREENS.forEach(s => {
      document.getElementById(s).classList.toggle("active", s === id);
    });
    const navId = NAV_PARENT[id] || id;
    document.querySelectorAll(".nav-item").forEach(item => {
      const active = item.dataset.nav === navId;
      item.classList.toggle("active", active);
      if (active) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }

  function currentScreen() {
    const el = document.querySelector(".screen.active");
    return el ? el.id : null;
  }

  // Sair de uma partida em andamento sempre pede confirmação.
  function canLeaveCurrentScreen() {
    const current = currentScreen();
    if (current === "screen-solo-game" && SoloGame.isActive()) {
      if (!confirm("Sair da partida atual? O progresso desta rodada será perdido.")) return false;
      SoloGame.abandon();
    }
    if (current === "screen-turma") return TurmaGame.requestExit();
    return true;
  }

  // Abre uma tela principal preparando o conteúdo dela.
  function goTo(id) {
    if (id === currentScreen()) return;
    if (!canLeaveCurrentScreen()) return;
    if (id === "screen-home") refreshHomeMiniStats();
    if (id === "screen-stats") StatsScreen.render();
    if (id === "screen-achievements") renderAchievementsScreen();
    if (id === "screen-settings") loadSettingsIntoForm();
    showScreen(id);
  }

  function refreshHomeMiniStats() {
    const stats = Storage.getStats();
    document.getElementById("home-best-score").textContent = stats.maiorPontuacao;
    document.getElementById("home-best-combo").textContent = stats.maiorCombo;

    const unlockedCount = Object.keys(Storage.getAchievements()).length;
    document.getElementById("home-achievements-count").textContent = `${unlockedCount}/${ACHIEVEMENTS.length}`;
  }

  function applyTheme() {
    const settings = Storage.getSettings();
    const root = document.documentElement;
    if (settings.temaEscuro === true) root.setAttribute("data-theme", "dark");
    else if (settings.temaEscuro === false) root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme"); // segue o tema do sistema

    document.body.classList.toggle("reduce-motion", settings.animacoesOn === false);
    updateThemeControls();
    // As roletas são desenhadas em canvas com cores do tema: avisa para redesenhar.
    document.dispatchEvent(new Event("rb:themechange"));
  }

  function isDarkActive() {
    const forced = document.documentElement.getAttribute("data-theme");
    if (forced) return forced === "dark";
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  // Botão rápido do menu (alterna claro/escuro) e escolha em Configurações.
  function updateThemeControls() {
    const dark = isDarkActive();
    const btn = document.getElementById("nav-theme");
    const label = dark ? "Modo claro" : "Modo escuro";
    btn.innerHTML = Icons.svg(dark ? "sun" : "moon") + `<span class="nav-label">${label}</span>`;
    btn.setAttribute("aria-label", label);
    if (document.body.classList.contains("nav-collapsed")) btn.title = label;

    const pref = Storage.getSettings().temaEscuro;
    const current = pref === true ? "escuro" : pref === false ? "claro" : "auto";
    document.querySelectorAll("#cfg-tema [data-tema]").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.tema === current));
    });
  }

  function setThemePreference(temaEscuro) {
    Storage.saveSettings({ temaEscuro });
    applyTheme();
  }

  function renderAchievementsScreen() {
    const list = getAllAchievementsWithStatus();
    const grid = document.getElementById("achievements-grid");
    const unlockedCount = list.filter(a => a.desbloqueada).length;

    document.getElementById("achievements-progress-fill").style.width = `${(unlockedCount / list.length) * 100}%`;
    document.getElementById("achievements-progress-text").textContent = `${unlockedCount}/${list.length}`;

    grid.innerHTML = list
      .map(a => {
        const dataFormatada = a.desbloqueadaEm ? new Date(a.desbloqueadaEm).toLocaleDateString("pt-BR") : null;
        return `
        <div class="achievement-card ${a.desbloqueada ? "unlocked" : "locked"}">
          <span class="ach-badge">${Icons.svg(a.desbloqueada ? a.icone : "lock")}</span>
          <div class="ach-info">
            <h4>${a.nome}</h4>
            <p>${a.descricao}</p>
            ${
              a.desbloqueada
                ? `<p class="ach-date">Desbloqueada em ${dataFormatada}</p>`
                : `<p class="ach-locked-tag">Bloqueada</p>`
            }
          </div>
        </div>`;
      })
      .join("");
  }

  let toastTimeout = null;
  function showAchievementToast(a) {
    const toast = document.getElementById("achievement-toast");
    toast.innerHTML =
      Icons.svg(a.icone) +
      `<span class="toast-text"><span class="toast-eyebrow">Conquista desbloqueada</span>${a.nome}</span>`;
    toast.classList.add("show");
    GameAudio.achievement();
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function loadSettingsIntoForm() {
    const s = Storage.getSettings();
    document.getElementById("cfg-som").checked = !!s.somOn;
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
    document.querySelectorAll("#cfg-tema [data-tema]").forEach(b =>
      b.addEventListener("click", () => {
        const map = { auto: null, claro: false, escuro: true };
        setThemePreference(map[b.dataset.tema]);
      })
    );
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
    const on = (id, fn) => document.getElementById(id).addEventListener("click", fn);

    on("btn-jogar-agora", () => goTo("screen-mode-select"));
    on("btn-ver-desempenho", () => goTo("screen-stats"));
    on("btn-conquistas", () => goTo("screen-achievements"));
    on("btn-configuracoes", () => goTo("screen-settings"));

    on("card-modo-solo", () => {
      SoloGame.start();
      showScreen("screen-solo-game");
    });
    on("card-modo-turma", () => {
      TurmaGame.open();
      showScreen("screen-turma");
    });

    on("btn-jogar-novamente", () => {
      SoloGame.start();
      showScreen("screen-solo-game");
    });
    on("btn-resultado-desempenho", () => goTo("screen-stats"));

    [
      "btn-mode-select-back",
      "btn-turma-home",
      "turma-result-home",
      "btn-solo-home-top",
      "btn-resultado-home",
      "btn-achievements-home",
      "btn-stats-home",
      "btn-settings-home"
    ].forEach(id => on(id, () => goTo("screen-home")));
  }

  function wireMenu() {
    const nav = document.getElementById("app-nav");
    const toggle = document.getElementById("nav-toggle");
    const backdrop = document.getElementById("nav-backdrop");

    function setOpen(open) {
      nav.classList.toggle("open", open);
      backdrop.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      if (open) nav.querySelector(".nav-item.active, .nav-item").focus();
    }

    toggle.addEventListener("click", () => setOpen(true));
    document.getElementById("nav-close").addEventListener("click", () => {
      setOpen(false);
      toggle.focus();
    });
    backdrop.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    const brand = document.getElementById("nav-brand");
    brand.addEventListener("click", () => {
      if (currentScreen() === "screen-home") pressFeedback(brand);
      else goTo("screen-home");
    });

    nav.querySelectorAll(".nav-item[data-nav]").forEach(item =>
      item.addEventListener("click", () => {
        // Já está nessa tela: só o efeito de clique, sem trocar nem fechar.
        if (currentScreen() === item.dataset.nav) {
          pressFeedback(item);
          return;
        }
        setOpen(false);
        goTo(item.dataset.nav);
      })
    );

    document.getElementById("nav-theme").addEventListener("click", () => setThemePreference(!isDarkActive()));

    // Recolher (só no computador): fica lembrado no navegador.
    const collapseBtn = document.getElementById("nav-collapse");
    function setCollapsed(collapsed) {
      document.body.classList.toggle("nav-collapsed", collapsed);
      const label = collapsed ? "Expandir menu" : "Recolher menu";
      collapseBtn.setAttribute("aria-label", label);
      collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      collapseBtn.querySelector(".nav-label").textContent = label;
      // No modo recolhido o nome some: a dica do mouse mostra para onde vai.
      nav.querySelectorAll(".nav-item").forEach(item => {
        if (collapsed) item.title = item.getAttribute("aria-label");
        else item.removeAttribute("title");
      });
      try {
        localStorage.setItem(NAV_COLLAPSED_KEY, collapsed ? "1" : "0");
      } catch {}
    }
    collapseBtn.addEventListener("click", () => setCollapsed(!document.body.classList.contains("nav-collapsed")));
    let saved = false;
    try {
      saved = localStorage.getItem(NAV_COLLAPSED_KEY) === "1";
    } catch {}
    document.body.classList.add("nav-instant");
    setCollapsed(saved);
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("nav-instant")));
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(err => console.warn("Service Worker não registrado:", err));
      });
    }
  }

  function init() {
    if (window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      // iOS/Safari até a versão 13 só tem addListener; addEventListener lá
      // não existe e derrubaria toda a inicialização do app.
      if (mq.addEventListener) mq.addEventListener("change", applyTheme);
      else if (mq.addListener) mq.addListener(applyTheme);
    }
    applyTheme();
    loadSettingsIntoForm();
    wireNavigation();
    wireMenu();
    wireSettings();
    refreshHomeMiniStats();
    showScreen("screen-home");
    registerServiceWorker();
  }

  init();

  return { showScreen, refreshHomeMiniStats, showAchievementToast };
})();
