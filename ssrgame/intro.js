/* =========================================================
   THE STATIC
   INTRO TRANSMISSION
   ========================================================= */
(function () {
  "use strict";
  /*
    INTRO STRUCTURE
    THE STATIC
    TRANSMISSION 001
    ART. TECH. MUSIC. CULTURE.
    The source for what's moving
    in the art and tech world.
    [ ENTER THE STATIC ]
    SIGNAL READY_
  */
  const body = document.body;
  // ---------------------------------------------------------
  // BUILD INTRO
  // ---------------------------------------------------------
  const intro = document.createElement("main");
  intro.id = "intro";
  intro.innerHTML = `
    <div class="static-noise"></div>
    <div class="intro-content">
      <div class="signal" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p class="eyebrow">TRANSMISSION 001</p>
      <h1>
        THE<br>
        <strong>STATIC</strong>
      </h1>
      <p class="tagline">
        ART. TECH. MUSIC. CULTURE.
      </p>
      <p class="intro-copy">
        The source for what's moving<br>
        in the art and tech world.
      </p>
      <button id="start-story" type="button">
        ENTER THE STATIC
      </button>
      <p class="status">SIGNAL READY_</p>
    </div>
  `;
  body.prepend(intro);
  // ---------------------------------------------------------
  // STYLES
  // ---------------------------------------------------------
  const style = document.createElement("style");
  style.textContent = `
    #intro {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(
          circle at center,
          #151515 0%,
          #080808 45%,
          #020202 100%
        );
      color: #f5f5f5;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
      overflow: hidden;
      transition:
        opacity .9s ease,
        transform .9s ease;
    }
    #intro.intro-exit {
      opacity: 0;
      transform: scale(1.04);
      pointer-events: none;
    }
    /* -----------------------------------------
       STATIC / SCREEN TEXTURE
       ----------------------------------------- */
    #intro .static-noise {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: .08;
      background-image:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 3px,
          #fff 4px
        );
      mix-blend-mode: overlay;
    }
    /* -----------------------------------------
       CONTENT
       ----------------------------------------- */
    #intro .intro-content {
      position: relative;
      z-index: 2;
      width: min(90%, 700px);
      text-align: center;
    }
    #intro .eyebrow {
      margin: 0 0 25px;
      font-size: 11px;
      letter-spacing: .35em;
      opacity: .55;
    }
    /* -----------------------------------------
       SIGNAL
       ----------------------------------------- */
    #intro .signal {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 4px;
      height: 28px;
      margin-bottom: 30px;
    }
    #intro .signal span {
      display: block;
      width: 4px;
      background: #fff;
      animation:
        staticSignal
        1s
        infinite
        ease-in-out;
    }
    #intro .signal span:nth-child(1) {
      height: 10px;
    }
    #intro .signal span:nth-child(2) {
      height: 24px;
      animation-delay: .15s;
    }
    #intro .signal span:nth-child(3) {
      height: 15px;
      animation-delay: .3s;
    }
    @keyframes staticSignal {
      0%,
      100% {
        opacity: .25;
        transform: scaleY(.5);
      }
      50% {
        opacity: 1;
        transform: scaleY(1);
      }
    }
    /* -----------------------------------------
       TITLE
       ----------------------------------------- */
    #intro h1 {
      margin: 0;
      font-size:
        clamp(
          70px,
          17vw,
          180px
        );
      line-height: .75;
      letter-spacing: -.07em;
      font-weight: 300;
    }
    #intro h1 strong {
      font-weight: 900;
      letter-spacing: -.09em;
    }
    /* -----------------------------------------
       TEXT
       ----------------------------------------- */
    #intro .tagline {
      margin: 45px 0 18px;
      font-size: 12px;
      letter-spacing: .3em;
    }
    #intro .intro-copy {
      margin: 0 auto 38px;
      color: #aaa;
      font-size: 16px;
      line-height: 1.7;
    }
    /* -----------------------------------------
       ENTER BUTTON
       ----------------------------------------- */
    #intro #start-story {
      border: 1px solid #fff;
      background: transparent;
      color: #fff;
      padding: 16px 30px;
      font-size: 11px;
      letter-spacing: .22em;
      cursor: pointer;
      transition:
        background .25s ease,
        color .25s ease,
        transform .25s ease;
    }
    #intro #start-story:hover {
      background: #fff;
      color: #000;
      transform: translateY(-2px);
    }
    #intro #start-story:disabled {
      opacity: .6;
      cursor: wait;
    }
    /* -----------------------------------------
       STATUS
       ----------------------------------------- */
    #intro .status {
      margin-top: 25px;
      font-family: monospace;
      font-size: 10px;
      color: #666;
      letter-spacing: .15em;
    }
    /* -----------------------------------------
       MOBILE
       ----------------------------------------- */
    @media (max-width: 600px) {
      #intro .intro-content {
        width: 88%;
      }
      #intro h1 {
        font-size: 23vw;
      }
      #intro .tagline {
        font-size: 9px;
        letter-spacing: .2em;
      }
      #intro .intro-copy {
        font-size: 14px;
      }
      #intro #start-story {
        width: 100%;
        padding: 17px;
      }
    }
  `;
  document.head.appendChild(style);
  // ---------------------------------------------------------
  // START THE STATIC
  // ---------------------------------------------------------
  const startButton =
    document.getElementById("start-story");
  let started = false;
  startButton.addEventListener("click", function () {
    if (started) return;
    started = true;
    startButton.textContent = "CONNECTING...";
    startButton.disabled = true;
    intro.classList.add("intro-exit");
    /*
      Give the transmission time
      to fade before entering
      the main Static page.
    */
    setTimeout(function () {
      window.location.href = "index.html";
    }, 900);
  });
})();

Your intro.html can now be extremely simple:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>THE STATIC</title>
</head>
<body>
  <script src="intro.js"></script>
</body>
</html>

So intro.js now owns the entire opening screen. You only need to edit index.html when you’re ready to work on the actual Static landing page.
