// Motor do Modo Solo (V2.0): roleta de categorias → pergunta → cronômetro →
// resposta → pontos/combo → próxima rodada → resultado.

const SoloGame = (() => {
  const TEMPO_PADRAO = 15;
  const TEMPO_RELAMPAGO = 7;
  const PONTOS_BASE = { facil: 100, medio: 150, dificil: 200 };
  const CHANCE_EVENTO = 0.15;
  const EVENTOS = [
    { id: "dobro", icone: "star", nome: "Dobro de pontos" },
    { id: "relampago", icone: "zap", nome: "Resposta relâmpago" },
    { id: "vida", icone: "heart", nome: "Vida extra" },
    { id: "dica", icone: "bulb", nome: "Dica sem custo" },
    { id: "combo2", icone: "flame", nome: "Combo x2" }
  ];
  const DIFICULDADE_LABEL = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };
  const LETRAS = "ABCDE";

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

  // Identifica a partida atual: um giro que termina depois que o jogador saiu
  // (ou começou outra partida) é descartado em vez de abrir uma pergunta
  // e um cronômetro "fantasmas" em segundo plano.
  let partidaId = 0;
  let partidaAtiva = false;

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function start() {
    partidaId++;
    partidaAtiva = true;
    clearInterval(timerInterval);
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

    tempoTotal = TEMPO_PADRAO;
    tempoRestante = TEMPO_PADRAO;
    document.getElementById("solo-timer-wrap").style.display = settings.cronometroOn ? "" : "none";
    updateTimerUI();

    CategoryWheel.init("wheel-v2");
    renderHUD();
  }

  // Sai da partida sem registrar resultado (botão "Início" / "Encerrar" sem respostas).
  function abandon() {
    partidaAtiva = false;
    clearInterval(timerInterval);
  }

  function renderHUD() {
    const settings = Storage.getSettings();
    const livesEl = document.getElementById("solo-lives");
    livesEl.style.display = settings.vidasOn ? "" : "none";
    document.getElementById("solo-lives-text").textContent = vidas === Infinity ? "∞" : String(Math.max(0, vidas));
    livesEl.classList.toggle("pulse-danger", settings.vidasOn && vidas <= 1);

    document.getElementById("solo-combo-text").textContent = combo > 0 ? `x${combo}` : "—";
    document.getElementById("solo-combo").classList.toggle("combo-hot", combo >= 5);

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
    // "Vida extra" só entra no sorteio se puder realmente dar uma vida
    // (senão o banner prometeria um bônus que não teria efeito nenhum).
    if (!settings.vidasOn || vidas >= 3) candidatos = candidatos.filter(e => e.id !== "vida");
    // Mesmo raciocínio: sem cronômetro, "Resposta relâmpago" não teria efeito.
    if (!settings.cronometroOn) candidatos = candidatos.filter(e => e.id !== "relampago");

    eventoAtivo = candidatos[Math.floor(Math.random() * candidatos.length)];
    GameAudio.special();
    banner.innerHTML = Icons.svg(eventoAtivo.icone) + `<span>${eventoAtivo.nome}</span>`;
    banner.classList.add("show");

    if (eventoAtivo.id === "vida") {
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
    const nivel = currentQuestion.dificuldade;

    area.innerHTML = `
      <div class="question-card">
        <div class="question-meta">
          <span>${escapeHtml(currentQuestion.categoria)}</span>
          <span class="badge-dificuldade ${nivel}" title="Dificuldade"><i></i><i></i><i></i>${DIFICULDADE_LABEL[nivel] || nivel}</span>
        </div>
        <div class="question-text">${escapeHtml(currentQuestion.pergunta)}</div>
        <div class="alternativas" id="solo-alternativas"></div>
        <button class="btn secondary btn-sm hint-btn" id="hint-btn">${Icons.svg("bulb")}Pedir dica</button>
        <div class="hint-text" id="hint-text" style="display:none;"></div>
        <div class="feedback-panel" id="feedback-panel"></div>
      </div>`;

    const altsEl = document.getElementById("solo-alternativas");
    currentQuestion.alternativas.forEach((alt, i) => {
      const btn = document.createElement("button");
      btn.className = "alt-btn";
      btn.dataset.idx = String(i);
      const letter = document.createElement("span");
      letter.className = "alt-letter";
      letter.textContent = LETRAS[i];
      const text = document.createElement("span");
      text.className = "alt-text";
      text.textContent = alt;
      btn.append(letter, text);
      btn.onclick = () => handleAnswer(i, btn);
      altsEl.appendChild(btn);
    });

    document.getElementById("hint-btn").onclick = onHintClick;

    // No celular a pergunta aparece abaixo da roleta, fora da tela.
    area.firstElementChild.scrollIntoView({ behavior: "smooth", block: "start" });
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
      if (tempoRestante <= 5 && tempoRestante > 0) GameAudio.timeWarning();
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
    hintText.textContent = "Dica: uma alternativa incorreta foi eliminada.";
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
    temposPartida.push(settings.cronometroOn ? Math.min(tempoRespostaSeg, tempoTotal) : tempoRespostaSeg);
    const correto = index === currentQuestion.resposta;

    document.querySelectorAll(".alt-btn").forEach(b => { b.disabled = true; });
    document.getElementById("hint-btn").disabled = true;

    let pontosGanhos = 0;
    if (correto) {
      combo++;
      comboMax = Math.max(comboMax, combo);
      streakCorrect++;
      streakWrong = 0;
      acertos++;
      GameAudio.correct();
      if (combo >= 3) GameAudio.combo(combo);
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
      GameAudio.wrong();
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
      App.showAchievementToast(a);
    });

    renderHUD();
    showFeedback(correto, null, pontosGanhos);
    eventoAtivo = null;
  }

  function onTimeout() {
    if (answered) return;
    answered = true;
    GameAudio.timeout();

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
    document.getElementById("hint-btn").disabled = true;

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
      App.showAchievementToast(a);
    });

    renderHUD();
    showFeedback(false, "Tempo esgotado", 0, "timer");
    eventoAtivo = null;
  }

  function showFeedback(correto, tituloOverride, pontosGanhos, iconeOverride) {
    const panel = document.getElementById("feedback-panel");
    const titulo = tituloOverride || (correto ? "Correto" : "Não foi dessa vez");
    const icone = iconeOverride || (correto ? "check" : "x");
    const acabou = Storage.getSettings().vidasOn && vidas <= 0;
    const continuarLabel = acabou ? `${Icons.svg("flag")}Ver resultado` : `Próxima rodada${Icons.svg("chevron")}`;

    panel.innerHTML = `
      <div class="feedback-title ${correto ? "correct" : "wrong"}">${Icons.svg(icone)}${titulo}</div>
      <div class="feedback-explicacao">${escapeHtml(currentQuestion.explicacao)}</div>
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
    GameAudio.unlock();

    document.getElementById("solo-spin-btn").disabled = true;
    document.getElementById("solo-question-area").innerHTML = "";
    document.getElementById("solo-event-banner").classList.remove("show");

    const idDoGiro = partidaId;
    CategoryWheel.spin(categoriaObj => {
      if (!partidaAtiva || idDoGiro !== partidaId) return;
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

    const stats = [
      { icon: "check", value: acertos, label: "Acertos" },
      { icon: "x", value: erros, label: "Erros" },
      { icon: "flame", value: comboMax, label: "Combo máx." },
      { icon: "timer", value: tempoMedio + "s", label: "Tempo médio" },
      { icon: "percent", value: aproveitamento + "%", label: "Acerto" },
      { icon: "heart", value: vidas === Infinity ? "—" : Math.max(0, vidas), label: "Vidas" }
    ];

    let html = `
      <div class="result-score-wrap">
        <span class="result-score">${pontuacao}</span>
        <span class="result-score-label">pontos</span>
      </div>
      <div class="result-grid">
        ${stats
          .map(
            s => `
          <div class="result-stat">
            <span class="result-stat-label">${Icons.svg(s.icon)}${s.label}</span>
            <span class="result-stat-value">${s.value}</span>
          </div>`
          )
          .join("")}
      </div>`;

    if (newAchievementsThisGame.length) {
      html += `<div class="new-achievement-list"><strong>Novas conquistas</strong>`;
      newAchievementsThisGame.forEach(a => {
        html += `
          <div class="new-achievement-item">
            <span class="new-achievement-emoji">${Icons.svg(a.icone)}</span>
            <div>
              <div class="new-achievement-name">${a.nome}</div>
              <div class="new-achievement-desc">${a.descricao}</div>
            </div>
          </div>`;
      });
      html += `</div>`;
    }

    const resultCardEl = document.getElementById("solo-result-card");
    resultCardEl.className = "result-card " + (gameOver ? "gameover" : "victory");
    resultCardEl.innerHTML = html;
    document.getElementById("solo-result-title").textContent = gameOver ? "Game over" : "Fim de jogo";
  }

  function endGame() {
    if (!partidaAtiva) return;
    partidaAtiva = false;
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
    if (gameOver) GameAudio.gameOver(); else GameAudio.victory();

    buildResultCard(gameOver);
    App.showScreen("screen-solo-result");
    App.refreshHomeMiniStats();
  }

  // Listeners estáticos (os elementos existem desde o carregamento do HTML).
  document.getElementById("solo-spin-btn").addEventListener("click", onSpinClick);
  document.getElementById("btn-encerrar-partida").addEventListener("click", () => {
    if (perguntasRespondidas === 0) {
      if (!confirm("Nenhuma pergunta foi respondida ainda. Sair da partida?")) return;
      abandon();
      App.showScreen("screen-home");
      return;
    }
    if (!confirm("Encerrar a partida agora e ver o resultado?")) return;
    endGame();
  });

  return {
    start,
    endGame,
    abandon
  };
})();
