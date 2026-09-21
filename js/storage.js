// Armazenamento local da V2.0 (Modo Solo) — tudo fica no navegador do jogador.
// Não há login, backend nem coleta de dados pessoais (regra #27 da V2.0).

const STORAGE_KEY = "giraSaeroV2";

const DEFAULT_STATE = {
  settings: {
    somOn: true,
    temaEscuro: null,        // null = segue o sistema; true/false = escolha explícita do jogador
    dificuldade: "adaptativa", // "facil" | "medio" | "dificil" | "adaptativa"
    cronometroOn: true,
    vidasOn: true,
    animacoesOn: true
  },
  stats: {
    partidas: 0,
    perguntasRespondidas: 0,
    acertos: 0,
    erros: 0,
    maiorCombo: 0,
    maiorPontuacao: 0,
    somaTempoResposta: 0,   // soma dos tempos de resposta (segundos), para calcular a média
    respostasComTempo: 0,
    categorias: {}           // { "Matemática": { acertos: 0, total: 0 }, ... }
  },
  achievements: {}           // { achievementId: dataISOdoDesbloqueio }
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function mergeDefaults(target, defaults) {
  const result = clone(defaults);
  if (target && typeof target === "object") {
    Object.keys(target).forEach(key => {
      if (
        result[key] &&
        typeof result[key] === "object" &&
        !Array.isArray(result[key]) &&
        typeof target[key] === "object"
      ) {
        result[key] = mergeDefaults(target[key], result[key]);
      } else if (target[key] !== undefined) {
        result[key] = target[key];
      }
    });
  }
  return result;
}

const Storage = {
  getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return mergeDefaults(parsed, DEFAULT_STATE);
    } catch (e) {
      console.warn("Não foi possível ler o progresso salvo, usando padrão.", e);
      return clone(DEFAULT_STATE);
    }
  },

  saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Não foi possível salvar o progresso (armazenamento indisponível).", e);
    }
  },

  getSettings() {
    return this.getState().settings;
  },

  saveSettings(partialSettings) {
    const state = this.getState();
    state.settings = Object.assign({}, state.settings, partialSettings);
    this.saveState(state);
    return state.settings;
  },

  getStats() {
    return this.getState().stats;
  },

  // Aplica uma função de atualização sobre as estatísticas e salva o resultado.
  updateStats(updateFn) {
    const state = this.getState();
    updateFn(state.stats);
    this.saveState(state);
    return state.stats;
  },

  registerAnswer({ categoria, acertou, tempoRespostaSeg }) {
    return this.updateStats(stats => {
      stats.perguntasRespondidas++;
      if (acertou) stats.acertos++; else stats.erros++;

      if (!stats.categorias[categoria]) {
        stats.categorias[categoria] = { acertos: 0, total: 0 };
      }
      stats.categorias[categoria].total++;
      if (acertou) stats.categorias[categoria].acertos++;

      if (typeof tempoRespostaSeg === "number") {
        stats.somaTempoResposta += tempoRespostaSeg;
        stats.respostasComTempo++;
      }
    });
  },

  registerGameEnd({ pontuacao, maiorComboDaPartida }) {
    return this.updateStats(stats => {
      stats.partidas++;
      if (pontuacao > stats.maiorPontuacao) stats.maiorPontuacao = pontuacao;
      if (maiorComboDaPartida > stats.maiorCombo) stats.maiorCombo = maiorComboDaPartida;
    });
  },

  getAchievements() {
    return this.getState().achievements;
  },

  isAchievementUnlocked(id) {
    return !!this.getState().achievements[id];
  },

  unlockAchievement(id) {
    const state = this.getState();
    if (state.achievements[id]) return false; // já desbloqueada
    state.achievements[id] = new Date().toISOString();
    this.saveState(state);
    return true;
  },

  resetProgress() {
    const state = this.getState();
    const fresh = clone(DEFAULT_STATE);
    fresh.settings = state.settings; // configurações não são apagadas junto do progresso
    this.saveState(fresh);
    return fresh;
  }
};
