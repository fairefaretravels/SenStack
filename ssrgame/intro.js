/* ============================================================
   THE STATIC — STORY INTRO
   FLOW:
   LANDING
      ↓
   START THE STORY
      ↓
   TheStatic1.mp4
      ↓
   Mitd1.mp4
      ↓
   GET TO THE BAG
      ↓
   ENTER THE GAME

   File:
   assets/videos/TheStatic1.mp4
   assets/videos/Mitd1.mp4

   ?nointro = bypass intro while testing
============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     BYPASS
  ------------------------------------------------------------ */

  if (/[?&]nointro\b/.test(location.search)) return;


  /* ------------------------------------------------------------
     STORY DATA
  ------------------------------------------------------------ */

  var STORY = {
    videos: [
      {
        src: "ssrgame/assets/videos/TheStatic1.mp4",
        tag: "CH.01 / THE STATIC",
        cards: [
          {
            at: 0.5,
            a: "THE STATIC",
            b: "CRUISE. DISCOVER. CUSTOMIZE."
          }
        ]
      },

      {
        src: "ssrgame/assets/videos/Mitd1.mp4",
        tag: "CH.01 / MACKINTHEDARK",
        cards: [
          {
            at: 0.6,
            a: "MACKINTHEDARK",
            b: "PLAYER ONE"
          },
          {
            at: -3.2,
            a: "GET TO THE BAG.",
            b: ""
          }
        ]
      }
    ]
  };


  /* ------------------------------------------------------------
     CSS
  ------------------------------------------------------------ */

  var css = `
    .stI{
      position:fixed;
      inset:0;
      z-index:99999;
      background:#000;
      color:#fff;
      overflow:hidden;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Helvetica,
        Arial,
        sans-serif;
      -webkit-font-smoothing:antialiased;
      text-rendering:optimizeLegibility;
      touch-action:manipulation;
    }

    .stI *{
      box-sizing:border-box;
    }

    .stI.out{
      opacity:0;
      pointer-events:none;
      transition:opacity .7s ease;
    }


    /* ----------------------------------------------------------
       LANDING
    ---------------------------------------------------------- */

    .stLanding{
      position:absolute;
      inset:0;
      z-index:20;
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
      padding:
        max(28px, env(safe-area-inset-top))
        max(6vw, 24px)
        max(8vh, 36px)
        max(6vw, 24px);

      background:
        radial-gradient(
          circle at 50% 35%,
          rgba(255,43,214,.12),
          transparent 35%
        ),
        radial-gradient(
          circle at 20% 70%,
          rgba(0,240,255,.08),
          transparent 30%
        ),
        #000;

      transition:
        opacity .65s ease,
        visibility .65s ease;
    }

    .stLanding.hidden{
      opacity:0;
      visibility:hidden;
      pointer-events:none;
    }

    .stLandingGrid{
      position:absolute;
      inset:0;
      opacity:.15;
      background-image:
        linear-gradient(
          rgba(255,255,255,.08) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255,255,255,.08) 1px,
          transparent 1px
        );
      background-size:40px 40px;
      mask-image:linear-gradient(
        to bottom,
        transparent,
        black 35%,
        black 75%,
        transparent
      );
      pointer-events:none;
    }

    .stLandingTag{
      position:absolute;
      top:max(20px, env(safe-area-inset-top));
      left:max(20px, env(safe-area-inset-left));

      font:
        700 11px/1
        ui-monospace,
        SFMono-Regular,
        Menlo,
        Consolas,
        monospace;

      letter-spacing:.22em;
      color:#b6ff00;
    }

    .stLandingMain{
      position:relative;
      z-index:2;
      max-width:1100px;
    }

    .stLandingTitle{
      margin:0;

      font:
        900 clamp(46px, 10vw, 130px)/.82
        "Arial Black",
        Impact,
        Arial,
        sans-serif;

      letter-spacing:-.045em;
      text-transform:uppercase;

      transform:skew(-3deg);
      text-shadow:
        5px 5px 0 #ff2bd6,
        10px 10px 0 rgba(0,240,255,.15);
    }

    .stLandingSub{
      margin-top:22px;

      font:
        700 clamp(13px, 1.8vw, 20px)/1.4
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Arial,
        sans-serif;

      letter-spacing:.28em;
      color:#00f0ff;
      text-transform:uppercase;
    }

    .stLandingRule{
      width:min(520px,100%);
      height:2px;
      margin:24px 0;

      background:#b6ff00;
      box-shadow:8px 8px 0 #ff2bd6;
    }

    .stLandingText{
      max-width:620px;
      margin:0 0 28px;

      font:
        500 clamp(13px,1.5vw,17px)/1.6
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Arial,
        sans-serif;

      color:#d8d8d8;
      letter-spacing:.05em;
    }


    /* ----------------------------------------------------------
       STORY VIDEO
    ---------------------------------------------------------- */

    .stV{
      position:absolute;
      inset:0;

      width:100%;
      height:100%;

      object-fit:cover;

      opacity:0;
      visibility:hidden;

      transition:
        opacity .8s ease,
        filter .8s ease;

      background:#000;
    }

    .stV.on{
      opacity:1;
      visibility:visible;
    }

    .stV.dim{
      filter:brightness(.42);
    }


    /* ----------------------------------------------------------
       VIDEO OVERLAYS
    ---------------------------------------------------------- */

    .stShade{
      position:absolute;
      inset:0;
      z-index:4;
      pointer-events:none;

      background:
        linear-gradient(
          to bottom,
          rgba(0,0,0,.35),
          transparent 30%,
          transparent 50%,
          rgba(0,0,0,.82)
        );
    }

    .stTag{
      position:absolute;
      z-index:7;

      top:max(18px, env(safe-area-inset-top));
      left:max(20px, env(safe-area-inset-left));

      font:
        700 11px/1
        ui-monospace,
        SFMono-Regular,
        Menlo,
        Consolas,
        monospace;

      letter-spacing:.2em;
      color:#b6ff00;

      opacity:0;
      transition:opacity .3s ease;
    }

    .stTag.on{
      opacity:1;
    }


    /* ----------------------------------------------------------
       STORY CARDS
    ---------------------------------------------------------- */

    .stCard{
      position:absolute;
      z-index:8;

      left:max(5vw,20px);
      right:max(5vw,20px);
      bottom:max(9vh,50px);

      pointer-events:none;

      opacity:0;
      transform:translateY(12px);

      transition:
        opacity .35s ease,
        transform .35s ease;
    }

    .stCard.on{
      opacity:1;
      transform:translateY(0);
    }

    .stCardA{
      display:inline-block;

      font:
        900 clamp(28px,6vw,82px)/.95
        "Arial Black",
        Impact,
        Arial,
        sans-serif;

      letter-spacing:.025em;
      text-transform:uppercase;

      border-bottom:4px solid #ff2bd6;
      padding-bottom:10px;

      text-shadow:4px 4px 0 #000;
    }

    .stCardB{
      margin-top:13px;

      font:
        700 clamp(12px,1.7vw,19px)/1.3
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Arial,
        sans-serif;

      letter-spacing:.22em;
      color:#00f0ff;
      text-transform:uppercase;

      text-shadow:2px 2px 0 #000;
    }


    /* ----------------------------------------------------------
       FINAL SCREEN
    ---------------------------------------------------------- */

    .stEnd{
      position:absolute;
      inset:0;
      z-index:15;

      display:none;
      flex-direction:column;
      justify-content:flex-end;

      padding:
        20px
        max(6vw,24px)
        max(8vh,40px);

      background:
        radial-gradient(
          circle at 70% 25%,
          rgba(255,43,214,.14),
          transparent 35%
        ),
        linear-gradient(
          to bottom,
          rgba(0,0,0,.25),
          #000 78%
        );
    }

    .stEnd.on{
      display:flex;
    }

    .stEndTag{
      margin-bottom:18px;

      font:
        700 11px/1
        ui-monospace,
        SFMono-Regular,
        Menlo,
        Consolas,
        monospace;

      letter-spacing:.22em;
      color:#b6ff00;
    }

    .stEndTitle{
      font:
        900 clamp(34px,7vw,92px)/.9
        "Arial Black",
        Impact,
        Arial,
        sans-serif;

      letter-spacing:.02em;
      text-transform:uppercase;

      border-bottom:4px solid #ff2bd6;
      display:inline-block;
      padding-bottom:12px;
    }

    .stEndLine{
      margin:18px 0 28px;

      font:
        800 clamp(20px,3vw,38px)/1.1
        "Arial Black",
        Impact,
        Arial,
        sans-serif;

      letter-spacing:.08em;
      color:#b6ff00;
      text-transform:uppercase;
    }


    /* ----------------------------------------------------------
       BUTTONS
    ---------------------------------------------------------- */

    .stButton{
      min-height:58px;
      padding:16px 26px;

      border:2px solid #b6ff00;
      border-radius:0;

      background:#000;
      color:#b6ff00;

      font:
        800 clamp(13px,1.7vw,19px)/1
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Arial,
        sans-serif;

      letter-spacing:.2em;
      text-transform:uppercase;

      box-shadow:
        6px 6px 0 #ff2bd6;

      cursor:pointer;
      touch-action:manipulation;

      transition:
        transform .1s ease,
        box-shadow .1s ease,
        background .15s ease;
    }

    .stButton:hover{
      background:#b6ff00;
      color:#000;
    }

    .stButton:active{
      transform:translate(3px,3px);
      box-shadow:3px 3px 0 #ff2bd6;
    }

    .stButton:focus-visible{
      outline:2px solid #fff;
      outline-offset:5px;
    }

    .stButton::after{
      content:"_";
      animation:stBlink 1s steps(1) infinite;
    }

    @keyframes stBlink{
      50%{opacity:0}
    }


    /* ----------------------------------------------------------
       SKIP
    ---------------------------------------------------------- */

    .stSkip{
      position:absolute;
      z-index:30;

      right:max(14px, env(safe-area-inset-right));
      top:max(12px, env(safe-area-inset-top));

      min-height:44px;
      padding:0 12px;

      border:0;
      background:transparent;

      color:#fff;
      opacity:.65;

      font:
        700 11px/1
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Arial,
        sans-serif;

      letter-spacing:.2em;
      cursor:pointer;
    }

    .stSkip:hover{
      opacity:1;
    }


    /* ----------------------------------------------------------
       PLAYBACK GATE
    ---------------------------------------------------------- */

    .stGate{
      position:absolute;
      inset:0;
      z-index:25;

      display:none;
      align-items:center;
      justify-content:center;

      background:rgba(0,0,0,.58);
    }

    .stGate.on{
      display:flex;
    }

    .stGateButton{
      padding:16px 22px;

      border:2px solid #fff;
      background:#000;
      color:#fff;

      font:
        800 13px/1
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Arial,
        sans-serif;

      letter-spacing:.2em;
      cursor:pointer;
    }


    /* ----------------------------------------------------------
       MOBILE
    ---------------------------------------------------------- */

    @media(max-width:600px){

      .stLanding{
        padding-bottom:
          max(42px, calc(32px + env(safe-area-inset-bottom)));
      }

      .stLandingTitle{
        font-size:clamp(48px,17vw,82px);
      }

      .stLandingSub{
        letter-spacing:.18em;
      }

      .stLandingRule{
        margin:18px 0;
      }

      .stLandingText{
        font-size:13px;
        margin-bottom:24px;
      }

      .stButton{
        width:100%;
      }

      .stCard{
        bottom:max(10vh,55px);
      }

      .stCardA{
        font-size:clamp(28px,10vw,54px);
      }

      .stCardB{
        font-size:11px;
        letter-spacing:.16em;
      }

      .stEnd{
        padding-bottom:
          max(45px, calc(35px + env(safe-area-inset-bottom)));
      }

      .stEndTitle{
        font-size:clamp(34px,12vw,62px);
      }

      .stEndLine{
        font-size:22px;
      }
    }


    /* ----------------------------------------------------------
       REDUCED MOTION
    ---------------------------------------------------------- */

    @media(prefers-reduced-motion:reduce){

      .stV,
      .stCard,
      .stLanding,
      .stI.out{
        transition:none;
      }

      .stButton::after{
        animation:none;
      }
    }
  `;


  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);


  /* ------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------ */

  function el(tag, cls, parent, text) {
    var node = document.createElement(tag);

    if (cls) node.className = cls;
    if (typeof text !== "undefined") node.textContent = text;
    if (parent) parent.appendChild(node);

    return node;
  }


  /* ------------------------------------------------------------
     ROOT
  ------------------------------------------------------------ */

  var root = el("div", "stI", document.body);

  root.setAttribute("role", "dialog");
  root.setAttribute("aria-label", "The Static story");

  var previousOverflow =
    document.documentElement.style.overflow;

  document.documentElement.style.overflow = "hidden";


  /* ------------------------------------------------------------
     LANDING SCREEN
  ------------------------------------------------------------ */

  var landing = el("div", "stLanding", root);

  el("div", "stLandingGrid", landing);

  el(
    "div",
    "stLandingTag",
    landing,
    "THE STATIC / CHAPTER 01"
  );

  var landingMain = el(
    "div",
    "stLandingMain",
    landing
  );

  el(
    "h1",
    "stLandingTitle",
    landingMain,
    "THE STATIC"
  );

  el(
    "div",
    "stLandingSub",
    landingMain,
    "A MACKINTHEDARK EXPERIENCE"
  );

  el(
    "div",
    "stLandingRule",
    landingMain
  );

  el(
    "p",
    "stLandingText",
    landingMain,
    "Cruise through the city. Discover the music. Build the story. Get to the bag."
  );

  var startStory = el(
    "button",
    "stButton",
    landingMain,
    "START THE STORY"
  );

  startStory.type = "button";


  /* ------------------------------------------------------------
     VIDEO ELEMENTS
  ------------------------------------------------------------ */

  var videos = STORY.videos.map(function (beat) {

    var video = el("video", "stV", root);

    video.src = beat.src;

    video.preload = "auto";

    video.playsInline = true;

    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    /*
      Do NOT autoplay here.

      The first video is started by the actual
      START THE STORY button so iPhone/iOS has a
      real user gesture to authorize playback.
    */

    video.muted = false;

    return video;
  });


  /* ------------------------------------------------------------
     VIDEO OVERLAY
  ------------------------------------------------------------ */

  el("div", "stShade", root);

  var tag = el("div", "stTag", root);

  var card = el("div", "stCard", root);

  var cardA = el("div", "stCardA", card);

  var cardB = el("div", "stCardB", card);


  /* ------------------------------------------------------------
     FINAL SCREEN
  ------------------------------------------------------------ */

  var end = el("div", "stEnd", root);

  el(
    "div",
    "stEndTag",
    end,
    "CH.01 / STORY COMPLETE"
  );

  el(
    "div",
    "stEndTitle",
    end,
    "MACKINTHEDARK"
  );

  el(
    "div",
    "stEndLine",
    end,
    "GET TO THE BAG."
  );

  var enterGame = el(
    "button",
    "stButton",
    end,
    "ENTER THE GAME"
  );

  enterGame.type = "button";


  /* ------------------------------------------------------------
     SKIP
  ------------------------------------------------------------ */

  var skip = el(
    "button",
    "stSkip",
    root,
    "SKIP"
  );

  skip.type = "button";


  /* ------------------------------------------------------------
     PLAYBACK GATE
  ------------------------------------------------------------ */

  var gate = el("div", "stGate", root);

  var gateButton = el(
    "button",
    "stGateButton",
    gate,
    "TAP TO PLAY"
  );

  gateButton.type = "button";


  /* ------------------------------------------------------------
     STATE
  ------------------------------------------------------------ */

  var state = {
    phase: "landing",
    index: -1,
    cardIndex: 0,
    complete: false
  };


  /* ------------------------------------------------------------
     STORY EVENT
  ------------------------------------------------------------ */

  function storyStarted() {

    document.dispatchEvent(
      new CustomEvent(
        "static:story-start",
        {
          detail:{
            chapter:"prologue"
          }
        }
      )
    );
  }


  /* ------------------------------------------------------------
     CARD SYSTEM
  ------------------------------------------------------------ */

  function clearCard() {

    card.classList.remove("on");

  }


  function showCard(data) {

    card.classList.remove("on");

    /*
      Force a reflow so the animation can restart
      every time a new card appears.
    */

    void card.offsetWidth;

    cardA.textContent = data.a || "";

    cardB.textContent = data.b || "";

    cardB.style.display =
      data.b ? "" : "none";

    card.classList.add("on");
  }


  /* ------------------------------------------------------------
     PLAY VIDEO
  ------------------------------------------------------------ */

  function playVideo(index) {

    if (index < 0 || index >= videos.length) {
      finishStory();
      return;
    }

    state.phase = "video";
    state.index = index;
    state.cardIndex = 0;

    clearCard();

    var beat = STORY.videos[index];
    var video = videos[index];

    /*
      Hide every video first.
    */

    videos.forEach(function (v) {
      v.classList.remove("on");
      v.pause();
    });

    /*
      Show current video.
    */

    video.classList.add("on");

    tag.textContent = beat.tag || "";

    tag.classList.add("on");

    /*
      Reset playback.
    */

    try {
      video.currentTime = 0;
    } catch (e) {}

    /*
      Make sure story audio is enabled.
    */

    video.muted = false;
    video.volume = 1;

    /*
      Start playback.
    */

    var promise;

    try {
      promise = video.play();
    } catch (err) {
      showPlaybackGate();
      return;
    }

    if (promise && promise.catch) {

      promise.catch(function () {

        showPlaybackGate();

      });

    }
  }


  /* ------------------------------------------------------------
     PLAYBACK GATE
  ------------------------------------------------------------ */

  function showPlaybackGate() {

    gate.classList.add("on");

  }


  function hidePlaybackGate() {

    gate.classList.remove("on");

  }


  gateButton.addEventListener(
    "click",
    function () {

      hidePlaybackGate();

      var video = videos[state.index];

      if (!video) return;

      video.muted = false;

      var promise = video.play();

      if (promise && promise.catch) {

        promise.catch(function () {

          showPlaybackGate();

        });

      }

    }
  );


  /* ------------------------------------------------------------
     VIDEO TIME / STORY CARDS
  ------------------------------------------------------------ */

  videos.forEach(function (video, videoIndex) {

    video.addEventListener(
      "timeupdate",
      function () {

        if (state.phase !== "video") return;

        if (videoIndex !== state.index) return;

        var beat = STORY.videos[videoIndex];

        if (!beat.cards) return;

        var currentCard =
          beat.cards[state.cardIndex];

        if (!currentCard) return;

        var target;

        /*
          Positive values = seconds from beginning.

          Negative values = seconds before end.
        */

        if (currentCard.at < 0) {

          if (!video.duration || !isFinite(video.duration)) {
            return;
          }

          target =
            video.duration +
            currentCard.at;

        } else {

          target = currentCard.at;

        }

        if (video.currentTime >= target) {

          showCard(currentCard);

          state.cardIndex++;

        }

      }
    );


    /* ----------------------------------------------------------
       VIDEO STARTED
    ---------------------------------------------------------- */

    video.addEventListener(
      "playing",
      function () {

        if (videoIndex !== state.index) return;

        hidePlaybackGate();

      }
    );


    /* ----------------------------------------------------------
       VIDEO ENDED
    ---------------------------------------------------------- */

    video.addEventListener(
      "ended",
      function () {

        if (videoIndex !== state.index) return;

        clearCard();

        if (
          videoIndex + 1 <
          videos.length
        ) {

          /*
            Move directly into the second video.
          */

          setTimeout(
            function () {
              playVideo(videoIndex + 1);
            },
            450
          );

        } else {

          /*
            Both videos are finished.
          */

          setTimeout(
            finishStory,
            450
          );

        }

      }
    );


    /* ----------------------------------------------------------
       VIDEO ERROR
    ---------------------------------------------------------- */

    video.addEventListener(
      "error",
      function () {

        /*
          Do not leave the player frozen if a video
          fails to load.

          Move to the next story beat.
        */

        if (videoIndex !== state.index) return;

        if (
          videoIndex + 1 <
          videos.length
        ) {

          playVideo(videoIndex + 1);

        } else {

          finishStory();

        }

      }
    );

  });


  /* ------------------------------------------------------------
     START THE STORY
  ------------------------------------------------------------ */

  function beginStory() {

    if (state.phase !== "landing") return;

    state.phase = "starting";

    /*
      IMPORTANT:
      This is the actual user gesture.

      The first video starts here rather than on
      page load. That is much more reliable on
      iPhone/Safari.
    */

    landing.classList.add("hidden");

    skip.style.display = "";

    storyStarted();

    setTimeout(
      function () {

        playVideo(0);

      },
      350
    );

  }


  startStory.addEventListener(
    "click",
    beginStory
  );


  /* ------------------------------------------------------------
     SKIP
  ------------------------------------------------------------ */

  skip.addEventListener(
    "click",
    function () {

      if (state.complete) return;

      /*
        Stop all videos.
      */

      videos.forEach(function (video) {

        video.pause();

      });

      /*
        Skip goes to the final story screen,
        NOT directly into the game.
      */

      finishStory();

    }
  );


  /* ------------------------------------------------------------
     FINISH STORY
  ------------------------------------------------------------ */

  function finishStory() {

    if (state.complete) return;

    state.complete = true;

    state.phase = "complete";

    /*
      Stop video playback.
    */

    videos.forEach(function (video) {

      video.pause();

      video.classList.remove("on");

    });

    clearCard();

    tag.classList.remove("on");

    hidePlaybackGate();

    /*
      Show final GET TO THE BAG screen.
    */

    end.classList.add("on");

    skip.style.display = "none";

    enterGame.focus();

  }


  /* ------------------------------------------------------------
     ENTER THE ACTUAL GAME
  ------------------------------------------------------------ */

  function enterActualGame() {

    if (!state.complete) return;

    state.phase = "game";

    /*
      Remove intro.
    */

    root.classList.add("out");

    setTimeout(
      function () {

        if (root.parentNode) {
          root.parentNode.removeChild(root);
        }

        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }

        document.documentElement.style.overflow =
          previousOverflow;

        /*
          Tell the game that the story is finished.
        */

        document.dispatchEvent(
          new CustomEvent(
            "static:story-complete",
            {
              detail:{
                chapter:"prologue"
              }
            }
          )
        );

      },
      750
    );

  }


  enterGame.addEventListener(
    "click",
    enterActualGame
  );


  /* ------------------------------------------------------------
     PUBLIC STORY API
  ------------------------------------------------------------ */

  window.STATIC_STORY = {

    chapters: STORY,

    current: "prologue",

    begin: beginStory,

    finish: finishStory,

    enterGame: enterActualGame

  };


  /* ------------------------------------------------------------
     INITIAL STATE
  ------------------------------------------------------------ */

  /*
    Landing page appears first.

    NOTHING plays yet.

    This is intentional.
  */

  state.phase = "landing";

})();
