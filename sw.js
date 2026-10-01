// Service Worker da V2.0 — cacheia o "app shell" para que a roleta, as
// perguntas, a pontuação, as conquistas e as estatísticas continuem
// funcionando mesmo sem internet depois do primeiro carregamento.

const CACHE_NAME = "gira-conhecimento-v2-cache-v5";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/icons.js",
  "./js/questions.js",
  "./js/storage.js",
  "./js/audio.js",
  "./js/achievements.js",
  "./js/classic.js",
  "./js/wheel.js",
  "./js/game.js",
  "./js/stats.js",
  "./js/app.js",
  "./manifest.json",
  "./fonts/inter.woff2",
  "./fonts/jetbrains-mono.woff2",
  "./img/rb-mark.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

// Biblioteca externa opcional (só o gráfico de estatísticas depende dela).
const CDN_ASSETS = ["https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await cache.addAll(APP_SHELL);
      await Promise.all(
        CDN_ASSETS.map(url =>
          cache.add(url).catch(() => {
            // Sem internet ou CDN indisponível na instalação: o jogo continua
            // funcionando offline normalmente; só o gráfico de categorias
            // pode ficar indisponível até uma próxima visita com internet.
          })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Estratégia "rede primeiro, cache como reserva": com internet, o jogador
// sempre recebe a versão mais nova publicada (o cache é só uma cópia de
// segurança, atualizada a cada visita online). Sem internet, cai pro que
// já estiver salvo — é isso que mantém o jogo jogável offline.
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.status === 200) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(cached => {
          if (cached) return cached;
          if (req.mode === "navigate") return caches.match("./index.html");
        })
      )
  );
});
