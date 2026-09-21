// Motor do Modo Solo (V2.0): roleta de categorias → pergunta → cronômetro →
// resposta → pontos/combo → próxima rodada → resultado.

const SoloGame = (() => {
  const TEMPO_PADRAO = 15;
  const TEMPO_RELAMPAGO = 7;
  const PONTOS_BASE = { facil: 100, medio: 150, dificil: 200 };
  const CHANCE_EVENTO = 0.15;
  const EVENTOS = [
    { id: "dobro", emoji: "🎁", nome: "DOBRO DE PONTOS" },
    { id: "relampago", emoji: "⚡", nome: "RESPOSTA RELÂMPAGO" },
    { id: "vida", emoji: "❤️", nome: "VIDA EXTRA" },
    { id: "dica", emoji: "💡", nome: "DICA GRÁTIS" },
    { id: "combo2", emoji: "🔥", nome: "COMBO x2" }
  ];

  let vidas = 3;
  let pontuacao = 0;
  let combo = 0;
  let comboMax = 0;
  let acertos = 0;
  let erros = 0;
  let perguntasRespondidas = 0;
  let temposPartida = [];
  let usedQuestionIds = [];
  let nivelAdaptativo = "medio";
  let streakCorrect = 0;
  let streakWrong = 0;
  let newAchievementsThisGame = [];

  let currentQuestion = null;
  let currentCategoria = null;
  let eventoAtivo = null;
  let answered = false;
  let questionStartTime = 0;
  let tempoTotal = TEMPO_PADRAO;
  let tempoRestante = TEMPO_PADRAO;
  let timerInterval = null;
  let dicaUsada = false;

  function start() {
    const settings = Storage.getSettings();
    vidas = settings.vidasOn ? 3 : Infinity;
    pontuacao = 0;
    combo = 0;
    comboMax = 0;
    acertos = 0;
    erros = 0;
    perguntasRespondidas = 0;
    temposPartida = [];
    usedQuestionIds = [];
    nivelAdaptativo = "medio";
    streakCorrect = 0;
    streakWrong = 0;
    newAchievementsThisGame = [];
    currentQuestion = null;
    eventoAtivo = null;
    answered = false;

    QUESTIONS_V2.forEach((q, i) => { q.id = i; });

    document.getElementById("solo-question-area").innerHTML = "";
    document.getElementById("solo-event-banner").classList.remove("show");
    document.getElementById("solo-spin-btn").disabled = false;

    CategoryWheel.init("wheel-v2");
    renderHUD();
  }

  function renderHUD() {
    const settings = Storage.getSettings();
    const livesEl = document.getElementById("solo-lives");
    livesEl.style.display = settings.vidasOn ? "" : "none";
    document.getElementById("solo-lives-text").textContent =
      vidas === Infinity ? "∞" : "❤️".repeat(Math.max(0, vidas)) || "💔";
    livesEl.classList.toggle("pulse-danger", settings.vidasOn && vidas <= 1);

    const comboEmoji = combo >= 10 ? "🔥🔥🔥🔥" : combo >= 5 ? "🔥🔥🔥" : combo >= 3 ? "🔥🔥" : combo >= 1 ? "🔥" : "—";
    document.getElementById("solo-combo-text").textContent = combo > 0 ? `${comboEmoji} x${combo}` : "—";

    document.getElementById("solo-score-text").textContent = pontuacao;
  }

  function categoriaAleatoriaReal() {
    const reais = CATEGORIAS.filter(c => c.nome !== "Surpresa").map(c => c.nome);
    return reais[Math.floor(Math.random() * reais.length)];
  }

  function maybeTriggerEvento() {
    eventoAtivo = null;
    const banner = document.getElementById("solo-event-banner");
    banner.classList.remove("show");

    if (Math.random() >= CHANCE_EVENTO) return;

    const settings = Storage.getSettings();
    let candidatos = EVENTOS.slice();
    if (!settings.vidasOn) candidatos = candidatos.filter(e => e.id !== "vida");

    eventoAtivo = candidatos[Math.floor(Math.random() * candidatos.length)];
    if (window.GameAudio) GameAudio.special();
    banner.textContent = `${eventoAtivo.emoji} ${eventoAtivo.nome}!`;
    banner.classList.add("show");

    if (eventoAtivo.id === "vida" && vidas !== Infinity && vidas < 3) {
      vidas++;
      renderHUD();
    }
  }

  function pickQuestion() {
    const settings = Storage.getSettings();
    const nivel = settings.dificuldade === "adaptativa" ? nivelAdaptativo : settings.dificuldade;

    let pool = QUESTIONS_V2.filter(
      q => q.categoria === currentCategoria && q.dificuldade === nivel && !usedQuestionIds.includes(q.id)
    );
    if (pool.length === 0) {
      pool = QUESTIONS_V2.filter(q => q.categoria === currentCategoria && !usedQuestionIds.includes(q.id));
    }
    if (pool.length === 0) {
      // Já usamos todas as perguntas dessa categoria: reabre o baralho dela.
      usedQuestionIds = usedQuestionIds.filter(id => QUESTIONS_V2[id].categoria !== currentCategoria);
      pool = QUESTIONS_V2.filter(q => q.categoria === currentCategoria);
    }

    currentQuestion = pool[Math.floor(Math.random() * pool.length)];
    usedQuestionIds.push(currentQuestion.id);
    dicaUsada = false;
    answered = false;
    questionStartTime = Date.now();
  }

  function renderQuestion() {
    const area = document.getElementById("solo-question-area");
    const cat = CATEGORIAS.find(c => c.nome === currentQuestion.categoria) || { emoji: "❓" };

    area.innerHTML = `
      <div class="question-card">
        <div class="question-meta">
          <span>${cat.emoji} ${currentQuestion.categoria}</span>
          <span class="badge-dificuldade ${currentQuestion.dificuldade}">${currentQuestion.dificuldade}</span>
        </div>
        <div class="question-text">${currentQuestion.pergunta}</div>
        <div class="alternativas" id="solo-alternativas"></div>
        <button class="hint-btn" id="hint-btn">💡 Pedir Dica</button>
        <div class="hint-text" id="hint-text" style="display:none;"></div>
        <div class="feedback-panel" id="feedback-panel"></div>
      </div>`;

    const altsEl = document.getElementById("solo-alternativas");
    currentQuestion.alternativas.forEach((alt, i) => {
      const btn = document.createElement("button");
      btn.className = "alt-btn";
      btn.dataset.idx = String(i);
      btn.textContent = alt;
      btn.onclick = () => handleAnswer(i, btn);
      altsEl.appendChild(btn);
    });

    document.getElementById("hint-btn").onclick = onHintClick;
  }

  function startTimer() {
    const settings = Storage.getSettings();
    const wrapEl = document.getElementById("solo-timer-wrap");
    clearInterval(timerInterval);

    if (!settings.cronometroOn) {
      wrapEl.style.display = "none";
      return;
    }
    wrapEl.style.display = "";

    tempoTotal = eventoAtivo && eventoAtivo.id === "relampago" ? TEMPO_RELAMPAGO : TEMPO_PADRAO;
    tempoRestante = tempoTotal;
    updateTimerUI();

    timerInterval = setInterval(() => {
      tempoRestante--;
      updateTimerUI();
      if (tempoRestante <= 5 && tempoRestante > 0 && window.GameAudio) GameAudio.timeWarning();
      if (tempoRestante <= 0) {
        clearInterval(timerInterval);
        onTimeout();
      }
    }, 1000);
  }

  function updateTimerUI() {
    const pct = Math.max(0, (tempoRestante / tempoTotal) * 100);
    const fillEl = document.getElementById("solo-timer-fill");
    fillEl.style.width = pct + "%";
    fillEl.classList.toggle("urgent", tempoRestante <= 5);
    document.getElementById("solo-timer-text").textContent = Math.max(0, tempoRestante) + "s";
  }

  function onHintClick() {
    if (dicaUsada || answered) return;
    dicaUsada = true;

    const wrongIndices = currentQuestion.alternativas
      .map((_, i) => i)
      .filter(i => i !== currentQuestion.resposta);
    const removeIdx = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
    const btn = document.querySelector(`.alt-btn[data-idx="${removeIdx}"]`);
    if (btn) {
      btn.disabled = true;
      btn.classList.add("hint-removed");
    }

    document.getElementById("hint-btn").disabled = true;
    const hintText = document.getElementById("hint-text");
    hintText.textContent = "💡 Dica: eliminamos uma alternativa incorreta para você.";
    hintText.style.display = "block";
  }

  function ajustarNivelAdaptativo() {
    const niveis = ["facil", "medio", "dificil"];
    let idx = niveis.indexOf(nivelAdaptativo);
    if (streakCorrect >= 2 && idx < niveis.length - 1) {
      idx++;
      nivelAdaptativo = niveis[idx];
      streakCorrect = 0;
    } else if (streakWrong >= 2 && idx > 0) {
      idx--;
      nivelAdaptativo = niveis[idx];
      streakWrong = 0;
    }
  }

  function handleAnswer(index, btnEl) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const settings = Storage.getSettings();
    const tempoRespostaSeg = (Date.now() - questionStartTime) / 1000;
    temposPartida.push(Math.min(tempoRespostaSeg, tempoTotal));
    const correto = index === currentQuestion.resposta;

    document.querySelectorAll(".alt-btn").forEach(b => { b.disabled = true; });

    let pontosGanhos = 0;
    if (correto) {
      combo++;
      comboMax = Math.max(comboMax, combo);
      streakCorrect++;
      streakWrong = 0;
      acertos++;
      if (window.GameAudio) {
        GameAudio.correct();
        if (combo >= 3) GameAudio.combo(combo);
      }
      btnEl.classList.add("correct");

      let base = PONTOS_BASE[currentQuestion.dificuldade];
      if (dicaUsada && !(eventoAtivo && eventoAtivo.id === "dica")) {
        base = Math.round(base * 0.7);
      }
      let bonusCombo = Math.min(combo, 10) * 10;
      if (eventoAtivo && eventoAtivo.id === "combo2") bonusCombo *= 2;
      const bonusVelocidade = settings.cronometroOn && tempoRespostaSeg <= tempoTotal * 0.4 ? 20 : 0;
      const bonusPerfeito = !dicaUsada ? 20 : 0;

      pontosGanhos = base + bonusCombo + bonusVelocidade + bonusPerfeito;
      if (eventoAtivo && eventoAtivo.id === "dobro") pontosGanhos *= 2;
      pontuacao += pontosGanhos;
    } else {
      combo = 0;
      streakWrong++;
      streakCorrect = 0;
      erros++;
      if (window.GameAudio) GameAudio.wrong();
      btnEl.classList.add("wrong");
      if (Storage.getSettings().animacoesOn) btnEl.classList.add("shake");

      const correctBtn = document.querySelector(`.alt-btn[data-idx="${currentQuestion.resposta}"]`);
      if (correctBtn) correctBtn.classList.add("correct");

      if (settings.vidasOn) vidas--;
    }

    perguntasRespondidas++;
    Storage.registerAnswer({ categoria: currentQuestion.categoria, acertou: correto, tempoRespostaSeg });
    if (settings.dificuldade === "adaptativa") ajustarNivelAdaptativo();

    const ctx = {
      stats: Storage.getStats(),
      comboAtual: combo,
      acertouUltima: correto,
      tempoRespostaSeg,
      pontuacaoPartida: pontuacao,
      errosPartida: erros,
      perguntasPartida: perguntasRespondidas,
      fimDePartida: false
    };
    checkAchievements(ctx).forEach(a => {
      newAchievementsThisGame.push(a);
      if (window.App) App.showAchievementToast(a);
    });

    renderHUD();
    showFeedback(correto, null, pontosGanhos);
    eventoAtivo = null;
  }

  function onTimeout() {
    if (answered) return;
    answered = true;
    if (window.GameAudio) GameAudio.timeout();

    const settings = Storage.getSettings();
    combo = 0;
    streakWrong++;
    streakCorrect = 0;
    erros++;
    temposPartida.push(tempoTotal);
    if (settings.vidasOn) vidas--;

    document.querySelectorAll(".alt-btn").forEach(b => {
      b.disabled = true;
      if (parseInt(b.dataset.idx, 10) === currentQuestion.resposta) b.classList.add("correct");
    });

    perguntasRespondidas++;
    Storage.registerAnswer({ categoria: currentQuestion.categoria, acertou: false, tempoRespostaSeg: tempoTotal });
    if (settings.dificuldade === "adaptativa") ajustarNivelAdaptativo();

    const ctx = {
      stats: Storage.getStats(),
      comboAtual: combo,
      acertouUltima: false,
      pontuacaoPartida: pontuacao,
      errosPartida: erros,
      perguntasPartida: perguntasRespondidas,
      fimDePartida: false
    };
    checkAchievements(ctx).forEach(a => {
      newAchievementsThisGame.push(a);
      if (window.App) App.showAchievementToast(a);
    });

    renderHUD();
    showFeedback(false, "⏰ Tempo esgotado!", 0);
    eventoAtivo = null;
  }

  function showFeedback(correto, tituloOverride, pontosGanhos) {
    const panel = document.getElementById("feedback-panel");
    const titulo = tituloOverride || (correto ? "🎉 CORRETO!" : "❌ NÃO FOI DESSA VEZ");
    const acabou = Storage.getSettings().vidasOn && vidas <= 0;
    const continuarLabel = acabou ? "🏁 Ver Resultado" : "➡ Próxima Rodada";

    panel.innerHTML = `
      <div class="feedback-title ${correto ? "correct" : "wrong"}">${titulo}</div>
      <div class="feedback-explicacao">${currentQuestion.explicacao}</div>
      ${correto ? `<div class="feedback-points">+${pontosGanhos || 0} pontos</div>` : ""}
      <button class="btn primary" id="btn-continuar-rodada">${continuarLabel}</button>
    `;
    panel.classList.add("show");
    document.getElementById("btn-continuar-rodada").onclick = () => {
      if (acabou) endGame();
      else onProximaRodadaClick();
    };
  }

  function onProximaRodadaClick() {
    document.getElementById("solo-question-area").innerHTML = "";
    document.getElementById("solo-event-banner").classList.remove("show");
    document.getElementById("solo-spin-btn").disabled = false;
    currentQuestion = null;
  }

  function onSpinClick() {
    if (CategoryWheel.isSpinning()) return;
    if (window.GameAudio) GameAudio.unlock();

    document.getElementById("solo-spin-btn").disabled = true;
    document.getElementById("solo-question-area").innerHTML = "";
    document.getElementById("solo-event-banner").classList.remove("show");

    CategoryWheel.spin(categoriaObj => {
      currentCategoria = categoriaObj.nome === "Surpresa" ? categoriaAleatoriaReal() : categoriaObj.nome;
      maybeTriggerEvento();
      pickQuestion();
      renderQuestion();
      startTimer();
    });
  }

  function buildResultCard(gameOver) {
    const aproveitamento = perguntasRespondidas > 0 ? ((acertos / perguntasRespondidas) * 100).toFixed(1) : "0.0";
    const tempoMedio = temposPartida.length
      ? (temposPartida.reduce((a, b) => a + b, 0) / temposPartida.length).toFixed(1)
      : "0.0";

    let html = `
      <div class="result-score">${pontuacao} PONTOS</div>
      <div class="result-grid">
        <div>🎯 Acertos: <strong>${acertos}</strong></div>
        <div>❌ Erros: <strong>${erros}</strong></div>
        <div>🔥 Combo máximo: <strong>${comboMax}</strong></div>
        <div>⏱️ Tempo médio: <strong>${tempoMedio}s</strong></div>
        <div>📈 Aproveitamento: <strong>${aproveitamento}%</strong></div>
        <div>❤️ Vidas restantes: <strong>${vidas === Infinity ? "—" : Math.max(0, vidas)}</strong></div>
      </div>`;

    if (newAchievementsThisGame.length) {
      html += `<div class="new-achievement-list"><strong>🏆 Novas conquistas:</strong>`;
      newAchievementsThisGame.forEach(a => {
        html += `<div class="new-achievement-item">${a.emoji} ${a.nome} — ${a.descricao}</div>`;
      });
      html += `</div>`;
    }

    document.getElementById("solo-result-card").innerHTML = html;
    document.getElementById("solo-result-title").textContent = gameOver ? "💀 GAME OVER" : "🎉 FIM DE JOGO!";
  }

  function endGame() {
    clearInterval(timerInterval);
    Storage.registerGameEnd({ pontuacao, maiorComboDaPartida: comboMax });

    const ctxFinal = {
      stats: Storage.getStats(),
      comboAtual: 0,
      acertouUltima: false,
      pontuacaoPartida: pontuacao,
      errosPartida: erros,
      perguntasPartida: perguntasRespondidas,
      fimDePartida: true
    };
    checkAchievements(ctxFinal).forEach(a => newAchievementsThisGame.push(a));

    const gameOver = Storage.getSettings().vidasOn && vidas <= 0;
    if (window.GameAudio) gameOver ? GameAudio.gameOver() : GameAudio.victory();

    buildResultCard(gameOver);
    if (window.App) App.showScreen("screen-solo-result");
    if (window.App) App.refreshHomeMiniStats();
  }

  // Listeners estáticos (os elementos existem desde o carregamento do HTML).
  document.getElementById("solo-spin-btn").addEventListener("click", onSpinClick);
  document.getElementById("btn-encerrar-partida").addEventListener("click", () => {
    clearInterval(timerInterval);
    endGame();
  });

  return {
    start,
    endGame,
    stopClock: () => clearInterval(timerInterval)
  };
})();
