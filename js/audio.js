// Sistema de áudio da V2.0 — sons sintetizados via Web Audio API.
// Não usa arquivos de áudio (nada para baixar/cachear), então o volume do PWA
// continua leve e o modo offline funciona sem depender de mídia externa.

const GameAudio = (() => {
  let ctx = null;
  let enabled = true;

  function ensureContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function tone({ freq = 440, duration = 0.15, type = "sine", start = 0, gain = 0.2, glideTo = null }) {
    const audioCtx = ensureContext();
    if (!audioCtx || !enabled) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = type;
    const t0 = audioCtx.currentTime + start;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo !== null) {
      osc.frequency.linearRampToValueAtTime(glideTo, t0 + duration);
    }

    gainNode.gain.setValueAtTime(0, t0);
    gainNode.gain.linearRampToValueAtTime(gain, t0 + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  function sequence(notes) {
    let t = 0;
    notes.forEach(n => {
      tone(Object.assign({}, n, { start: t }));
      t += n.gap !== undefined ? n.gap : n.duration || 0.15;
    });
  }

  return {
    setEnabled(value) {
      enabled = !!value;
    },
    isEnabled() {
      return enabled;
    },
    unlock() {
      // Chamar em um gesto do usuário (clique) para liberar áudio no mobile.
      ensureContext();
    },

    spin() {
      // "whoosh" descendente simulando a roleta girando
      tone({ freq: 900, glideTo: 220, duration: 0.9, type: "sawtooth", gain: 0.08 });
    },
    tick() {
      tone({ freq: 700, duration: 0.06, type: "square", gain: 0.08 });
    },
    correct() {
      sequence([
        { freq: 523.25, duration: 0.1, type: "triangle", gain: 0.18 },
        { freq: 783.99, duration: 0.18, type: "triangle", gain: 0.2 }
      ]);
    },
    wrong() {
      sequence([
        { freq: 300, duration: 0.15, type: "sawtooth", gain: 0.15 },
        { freq: 180, duration: 0.25, type: "sawtooth", gain: 0.15 }
      ]);
    },
    combo(level) {
      const base = 440 + Math.min(level, 10) * 30;
      sequence([
        { freq: base, duration: 0.08, type: "square", gain: 0.12 },
        { freq: base * 1.25, duration: 0.12, type: "square", gain: 0.14 }
      ]);
    },
    achievement() {
      sequence([
        { freq: 523.25, duration: 0.1, type: "sine", gain: 0.18 },
        { freq: 659.25, duration: 0.1, type: "sine", gain: 0.18 },
        { freq: 783.99, duration: 0.1, type: "sine", gain: 0.18 },
        { freq: 1046.5, duration: 0.25, type: "sine", gain: 0.2 }
      ]);
    },
    timeWarning() {
      tone({ freq: 880, duration: 0.1, type: "square", gain: 0.15 });
    },
    timeout() {
      sequence([
        { freq: 400, duration: 0.12, type: "square", gain: 0.15 },
        { freq: 250, duration: 0.2, type: "square", gain: 0.15 }
      ]);
    },
    victory() {
      sequence([
        { freq: 523.25, duration: 0.15, type: "triangle", gain: 0.18 },
        { freq: 659.25, duration: 0.15, type: "triangle", gain: 0.18 },
        { freq: 783.99, duration: 0.15, type: "triangle", gain: 0.18 },
        { freq: 1046.5, duration: 0.35, type: "triangle", gain: 0.2 }
      ]);
    },
    gameOver() {
      sequence([
        { freq: 392, duration: 0.2, type: "sawtooth", gain: 0.15 },
        { freq: 330, duration: 0.2, type: "sawtooth", gain: 0.15 },
        { freq: 262, duration: 0.4, type: "sawtooth", gain: 0.15 }
      ]);
    },
    special() {
      sequence([
        { freq: 660, duration: 0.08, type: "sine", gain: 0.16 },
        { freq: 880, duration: 0.08, type: "sine", gain: 0.16 },
        { freq: 1100, duration: 0.18, type: "sine", gain: 0.18 }
      ]);
    }
  };
})();
