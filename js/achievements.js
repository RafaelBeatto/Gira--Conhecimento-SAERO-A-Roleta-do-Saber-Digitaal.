// Sistema de conquistas da V2.0 — desbloqueadas com base nas estatísticas
// acumuladas (Storage) e no estado da partida atual (contexto passado pelo game.js).

const ACHIEVEMENTS = [
  {
    id: "primeiro_acerto",
    emoji: "🏅",
    nome: "Primeiro Acerto",
    descricao: "Acerte sua primeira pergunta.",
    condicao: ctx => ctx.stats.acertos >= 1
  },
  {
    id: "combo_5",
    emoji: "🔥",
    nome: "5 Acertos Seguidos",
    descricao: "Alcance um combo de 5 acertos seguidos.",
    condicao: ctx => ctx.comboAtual >= 5
  },
  {
    id: "combo_10",
    emoji: "🔥🔥",
    nome: "Mestre do Combo",
    descricao: "Alcance um combo de 10 acertos seguidos.",
    condicao: ctx => ctx.comboAtual >= 10
  },
  {
    id: "resposta_relampago",
    emoji: "⚡",
    nome: "Resposta Relâmpago",
    descricao: "Acerte uma pergunta em menos de 3 segundos.",
    condicao: ctx => ctx.acertouUltima && typeof ctx.tempoRespostaSeg === "number" && ctx.tempoRespostaSeg < 3
  },
  {
    id: "dez_acertos",
    emoji: "🎯",
    nome: "10 Acertos",
    descricao: "Acumule 10 respostas certas.",
    condicao: ctx => ctx.stats.acertos >= 10
  },
  {
    id: "mestre_do_saber",
    emoji: "👑",
    nome: "Mestre do Saber",
    descricao: "Marque 2.000 pontos ou mais em uma única partida.",
    condicao: ctx => (ctx.pontuacaoPartida || 0) >= 2000
  },
  {
    id: "aproveitamento_perfeito",
    emoji: "💯",
    nome: "100% de Aproveitamento",
    descricao: "Termine uma partida com pelo menos 5 perguntas e 0 erros.",
    condicao: ctx =>
      (ctx.fimDePartida === true) &&
      (ctx.perguntasPartida || 0) >= 5 &&
      (ctx.errosPartida || 0) === 0
  },
  {
    id: "cinquenta_questoes",
    emoji: "📚",
    nome: "50 Questões Respondidas",
    descricao: "Responda 50 perguntas no total.",
    condicao: ctx => ctx.stats.perguntasRespondidas >= 50
  }
];

// Avalia todas as conquistas ainda não desbloqueadas contra o contexto atual.
// Retorna a lista das que foram desbloqueadas agora (para tocar som/mostrar popup).
function checkAchievements(ctx) {
  const desbloqueadasAgora = [];
  ACHIEVEMENTS.forEach(a => {
    if (!Storage.isAchievementUnlocked(a.id) && a.condicao(ctx)) {
      if (Storage.unlockAchievement(a.id)) {
        desbloqueadasAgora.push(a);
      }
    }
  });
  return desbloqueadasAgora;
}

function getAllAchievementsWithStatus() {
  const unlockedMap = Storage.getAchievements();
  return ACHIEVEMENTS.map(a =>
    Object.assign({}, a, {
      desbloqueada: !!unlockedMap[a.id],
      desbloqueadaEm: unlockedMap[a.id] || null
    })
  );
}
