/* THE STATIC — story intro (Chapter: prologue)
   Self-contained: injects its own CSS and DOM, touches nothing in the game.
   Hook: <script src="intro.js"></script> just before </body> in index.html.
   Skip while testing: add ?nointro to the URL.
   Fires document event "static:story-start" when the player presses START THE STORY.
   Add future chapters by adding entries to CHAPTERS (beats = videos + timed cards). */
(function () {
"use strict";
if (/[?&]nointro\b/.test(location.search)) return;

var CHAPTERS = {
  prologue: {
    beats: [
      { src: "assets/videos/TheStatic1.mp4", tag: "CH.01 / SIGNAL",
        cards: [{ at: -3, a: "THE STATIC", b: "CRUISE. DISCOVER. CUSTOMIZE." }] },
      { src: "assets/videos/Mitd1.mp4", tag: "CH.01 / PLAYER ONE",
        cards: [{ at: 0.6, a: "MACKINTHEDARK", b: "PLAYABLE CHARACTER 01" },
                { at: -3.2, a: "GET TO THE BAG." }] }
    ],
    title: { a: "MACKINTHEDARK", b: "GET TO THE BAG.", go: "START THE STORY" }
  }
};
var CHAPTER = CHAPTERS.prologue;
var beats = CHAPTER.beats;

var css = "\
.stI{position:fixed;inset:0;z-index:99999;background:#000;color:#fff;overflow:hidden;transition:opacity .7s;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}\
.stI.out{opacity:0;pointer-events:none}\
.stV{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.1s,filter .9s}\
.stV.on{opacity:1}\
.stI.end .stV.on{filter:brightness(.4)}\
.stN{position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated;opacity:0;mix-blend-mode:screen;pointer-events:none}\
.stS{position:absolute;left:0;right:0;bottom:0;height:50%;background:linear-gradient(transparent,rgba(0,0,0,.75));pointer-events:none}\
.stT{position:absolute;top:max(14px,env(safe-area-inset-top));left:max(18px,env(safe-area-inset-left));font:600 12px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.18em;color:#b6ff00}\
.stC,.stE{position:absolute;left:max(5vw,20px);right:max(5vw,20px);bottom:max(8vh,calc(28px + env(safe-area-inset-bottom)))}\
.stA{font:800 clamp(26px,5.2vw,76px)/1 'Arial Black',Impact,Arial,sans-serif;letter-spacing:.05em;transform:rotate(-1.2deg);transform-origin:left bottom}\
.stB{margin-top:12px;font:600 clamp(12px,1.5vw,18px)/1.3 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;letter-spacing:.22em;color:#00f0ff}\
.stC.on .stA,.stC.on .stB{animation:stIn .7s linear both}\
@keyframes stIn{0%{opacity:0}15%{opacity:1}25%{opacity:.15}35%{opacity:1}45%{opacity:.5}55%,100%{opacity:1}}\
.stE{display:none}\
.stI.end .stE{display:block}\
.stI.end .stC,.stI.end .stK{display:none}\
.stE .stA{border-bottom:4px solid #ff2bd6;display:inline-block;padding-bottom:10px}\
.stE .stL{margin:18px 0 26px;font:700 clamp(18px,2.6vw,34px)/1.1 'Arial Black',Impact,Arial,sans-serif;letter-spacing:.08em;color:#b6ff00}\
.stG{min-height:56px;padding:16px 26px;border:2px solid #b6ff00;border-radius:0;background:#000;color:#b6ff00;font:700 clamp(14px,1.6vw,20px)/1 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;letter-spacing:.22em;box-shadow:5px 5px 0 #ff2bd6;cursor:pointer;touch-action:manipulation}\
.stG::after{content:'_';animation:stBl 1s steps(1) infinite}\
@keyframes stBl{50%{opacity:0}}\
.stG:active{transform:translate(3px,3px);box-shadow:2px 2px 0 #ff2bd6}\
.stG:focus-visible,.stK:focus-visible{outline:2px solid #fff;outline-offset:4px}\
.stK{position:absolute;right:max(14px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));min-height:44px;padding:0 14px;border:0;background:transparent;color:#fff;opacity:.7;font:600 13px/1 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;letter-spacing:.2em;cursor:pointer}\
.stX{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:14px 20px;border:2px solid #fff;background:#000;font:700 14px/1 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;letter-spacing:.22em}\
@media(max-width:600px){.stG{width:100%}.stK{bottom:auto;top:max(2px,env(safe-area-inset-top));}}\
@media(prefers-reduced-motion:reduce){.stC.on .stA,.stC.on .stB{animation:none}.stG::after{animation:none}}";
var st = document.createElement("style");
st.textContent = css;
document.head.appendChild(st);

function el(tag, cls, parent, txt) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt) e.textContent = txt;
  if (parent) parent.appendChild(e);
  return e;
}

var root = el("div", "stI", document.body);
root.setAttribute("role", "dialog");
root.setAttribute("aria-label", "The Static intro");
var prevOverflow = document.documentElement.style.overflow;
document.documentElement.style.overflow = "hidden";

var vids = beats.map(function (b) {
  var v = el("video", "stV", root);
  v.muted = true;
  v.playsInline = true;
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
  v.preload = "auto";
  v.src = b.src;
  return v;
});

var nc = el("canvas", "stN", root);
nc.width = 128; nc.height = 72;
var nx = nc.getContext("2d");
function noise(ms) {
  var t0 = performance.now();
  nc.style.opacity = 1;
  (function fr() {
    var d = nx.createImageData(128, 72), p = d.data;
    for (var i = 0; i < p.length; i += 4) { p[i] = p[i + 1] = p[i + 2] = Math.random() * 255 | 0; p[i + 3] = 255; }
    nx.putImageData(d, 0, 0);
    if (performance.now() - t0 < ms) requestAnimationFrame(fr); else nc.style.opacity = 0;
  })();
}

el("div", "stS", root);
var tagEl = el("div", "stT", root);
var card = el("div", "stC", root);
var cardA = el("div", "stA", card);
var cardB = el("div", "stB", card);

var end = el("div", "stE", root);
el("div", "stA", end, CHAPTER.title.a);
el("div", "stL", end, CHAPTER.title.b);
var go = el("button", "stG", end, CHAPTER.title.go);
go.type = "button";

var skip = el("button", "stK", root, "SKIP");
skip.type = "button";
var gate = el("div", "stX", root, "TAP TO BEGIN");
gate.style.display = "none";

var idx = -1, shown = 0, done = false, unlocked = false;

function showCard(c) {
  card.classList.remove("on");
  void card.offsetWidth;
  cardA.textContent = c.a || "";
  cardB.textContent = c.b || "";
  cardB.style.display = c.b ? "" : "none";
  card.classList.add("on");
}

function playBeat(i) {
  idx = i; shown = 0;
  var v = vids[i];
  tagEl.textContent = beats[i].tag || "";
  card.classList.remove("on");
  if (i > 0) { vids[i - 1].classList.remove("on"); noise(380); } else noise(260);
  try { v.currentTime = 0; } catch (e) {}
  v.classList.add("on");
  var p = v.play();
  if (p && p.catch) p.catch(function () { gate.style.display = ""; });
}

function next(i) {
  if (done || i !== idx) return;
  if (i + 1 < beats.length) playBeat(i + 1); else showTitle();
}

vids.forEach(function (v, i) {
  v.addEventListener("playing", function () { if (i === idx) gate.style.display = "none"; });
  v.addEventListener("timeupdate", function () {
    if (i !== idx) return;
    var c = beats[i].cards[shown];
    if (!c) return;
    if (c.at < 0 && !(v.duration > 0)) return;
    var t = c.at < 0 ? v.duration + c.at : c.at;
    if (v.currentTime >= t) { showCard(c); shown++; }
  });
  v.addEventListener("ended", function () { next(i); });
  v.addEventListener("error", function () { next(i); });
});

function showTitle() {
  idx = beats.length;
  vids.forEach(function (v, n) { if (n < vids.length - 1) v.classList.remove("on"); });
  vids[vids.length - 1].classList.add("on");
  gate.style.display = "none";
  root.classList.add("end");
  tagEl.textContent = "CH.01 / " + (CHAPTER.title.a);
  go.focus();
}

skip.addEventListener("click", function () {
  if (done || idx >= beats.length) return;
  vids.forEach(function (v) { v.pause(); });
  var last = vids[vids.length - 1];
  try { if (last.duration > 0) last.currentTime = Math.max(0, last.duration - 0.1); } catch (e) {}
  showTitle();
});

root.addEventListener("pointerdown", function () {
  if (!unlocked) { unlocked = true; vids.forEach(function (v) { v.muted = false; }); }
  var v = vids[idx];
  if (v && v.paused && !v.ended) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
});

function start() {
  if (done) return;
  done = true;
  vids.forEach(function (v) { v.pause(); });
  root.classList.add("out");
  setTimeout(function () {
    root.remove();
    st.remove();
    document.documentElement.style.overflow = prevOverflow;
    document.dispatchEvent(new CustomEvent("static:story-start", { detail: { chapter: "prologue" } }));
  }, 750);
}
go.addEventListener("click", start);

window.STATIC_STORY = { chapters: CHAPTERS, current: "prologue" };

playBeat(0);
})();
