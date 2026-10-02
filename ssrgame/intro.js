/* THE STATIC — STORY INTRO
   Original visual design preserved.
   
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

   Videos:
   /assets/photos/TheStatic1.gif
   /assets/photos/Mitd1.gif

   Testing:
   ?nointro
*/

(function () {
"use strict";

if (/[?&]nointro\b/.test(location.search)) return;


/* ============================================================
   STORY DATA
============================================================ */

var CHAPTER = {
  beats: [
    {
      src: "/assets/photos/TheStatic1.gif",
      tag: "CH.01 / SIGNAL",
      cards: [
        {
          at: 0.5,
          a: "THE STATIC",
          b: "CRUISE. DISCOVER. CUSTOMIZE."
        }
      ]
    },

    {
      src: "assets/photos/Mitd1.gif",
      tag: "CH.01 / PLAYER ONE",
      cards: [
        {
          at: 0.6,
          a: "MACKINTHEDARK",
          b: "PLAYABLE CHARACTER 01"
        },
        {
          at: -3.2,
          a: "GET TO THE BAG.",
          b: ""
        }
      ]
    }
  ],

  title: {
    a: "MACKINTHEDARK",
    b: "GET TO THE BAG.",
    go: "ENTER THE GAME"
  }
};

var beats = CHAPTER.beats;


/* ============================================================
   ORIGINAL DESIGN CSS
============================================================ */

var css = "\
.stI{position:fixed;inset:0;z-index:99999;background:#000;color:#fff;overflow:hidden;transition:opacity .7s;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}\
.stI.out{opacity:0;pointer-events:none}\
.stV{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.1s,filter .9s}\
.stV.on{opacity:1}\
.stI.end .stV.on{filter:brightness(.4)}\
.stN{position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated;opacity:0;mix-blend-mode:screen;pointer-events:none}\
.stS{position:absolute;inset:0;width:100%;height:100%;background:linear-gradient(transparent,rgba(0,0,0,.75));pointer-events:none}\
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


/* ============================================================
   ELEMENT HELPER
============================================================ */

function el(tag, cls, parent, txt) {
  var e = document.createElement(tag);

  if (cls) e.className = cls;

  if (typeof txt !== "undefined") {
    e.textContent = txt;
  }

  if (parent) {
    parent.appendChild(e);
  }

  return e;
}


/* ============================================================
   ROOT
============================================================ */

var root = el("div", "stI", document.body);

root.setAttribute("role", "dialog");
root.setAttribute("aria-label", "The Static intro");

var prevOverflow =
  document.documentElement.style.overflow;

document.documentElement.style.overflow = "hidden";


/* ============================================================
   VIDEOS
============================================================ */

var vids = beats.map(function (b) {

  var v = el("video", "stV", root);

  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");

  v.playsInline = true;

  /*
    DO NOT autoplay.

    The first video is started directly from
    the START THE STORY button. This gives
    Safari/iPhone the user gesture it needs.
  */

  v.autoplay = false;

  v.preload = "auto";

  /*
    Start with sound available.
  */

  v.muted = false;
  v.volume = 1;

  /*
    Use property AND attribute.
  */

  v.src = b.src;
  v.setAttribute("src", b.src);

  return v;
});


/* ============================================================
   ORIGINAL OVERLAY ELEMENTS
============================================================ */

var nc = el("canvas", "stN", root);

nc.width = 128;
nc.height = 72;

var nx = nc.getContext("2d");


function noise(ms) {

  var t0 = performance.now();

  nc.style.opacity = 1;

  (function fr() {

    var d =
      nx.createImageData(128, 72);

    var p = d.data;

    for (
      var i = 0;
      i < p.length;
      i += 4
    ) {

      p[i] =
      p[i + 1] =
      p[i + 2] =
        Math.random() * 255 | 0;

      p[i + 3] = 255;
    }

    nx.putImageData(d, 0, 0);

    if (
      performance.now() - t0 < ms
    ) {

      requestAnimationFrame(fr);

    } else {

      nc.style.opacity = 0;

    }

  })();
}


el("div", "stS", root);

var tagEl =
  el("div", "stT", root);

var card =
  el("div", "stC", root);

var cardA =
  el("div", "stA", card);

var cardB =
  el("div", "stB", card);


/* ============================================================
   FINAL SCREEN
============================================================ */

var end =
  el("div", "stE", root);

el(
  "div",
  "stA",
  end,
  CHAPTER.title.a
);

el(
  "div",
  "stL",
  end,
  CHAPTER.title.b
);

var go =
  el(
    "button",
    "stG",
    end,
    CHAPTER.title.go
  );

go.type = "button";


/* ============================================================
   SKIP
============================================================ */

var skip =
  el(
    "button",
    "stK",
    root,
    "SKIP"
  );

skip.type = "button";


/* ============================================================
   PLAYBACK MESSAGE
============================================================ */

var gate =
  el(
    "div",
    "stX",
    root,
    "TAP TO PLAY"
  );

gate.style.display = "none";


/* ============================================================
   STATE
============================================================ */

var idx = -1;
var shown = 0;
var done = false;

var landing = true;


/* ============================================================
   SHOW CARD
============================================================ */

function showCard(c) {

  card.classList.remove("on");

  /*
    Force animation restart.
  */

  void card.offsetWidth;

  cardA.textContent =
    c.a || "";

  cardB.textContent =
    c.b || "";

  cardB.style.display =
    c.b ? "" : "none";

  card.classList.add("on");
}


/* ============================================================
   HIDE CARD
============================================================ */

function hideCard() {

  card.classList.remove("on");

}


/* ============================================================
   PLAY STORY BEAT
============================================================ */

function playBeat(i) {

  if (done) return;

  if (
    i < 0 ||
    i >= beats.length
  ) {
    showTitle();
    return;
  }

  idx = i;

  shown = 0;

  var beat = beats[i];

  var v = vids[i];


  /* -----------------------------------------
     Stop every video
  ----------------------------------------- */

  vids.forEach(function (video) {

    video.pause();

    video.classList.remove("on");

  });


  /* -----------------------------------------
     Update label
  ----------------------------------------- */

  tagEl.textContent =
    beat.tag || "";


  /* -----------------------------------------
     Transition noise
  ----------------------------------------- */

  if (i > 0) {

    noise(380);

  } else {

    noise(260);

  }


  /* -----------------------------------------
     Reset video
  ----------------------------------------- */

  try {

    v.currentTime = 0;

  } catch (e) {}


  /* -----------------------------------------
     Make video visible
  ----------------------------------------- */

  v.classList.add("on");


  /* -----------------------------------------
     PLAY
  ----------------------------------------- */

  var promise;

  try {

    promise = v.play();

  } catch (err) {

    gate.style.display = "block";

    return;

  }


  if (
    promise &&
    typeof promise.catch === "function"
  ) {

    promise.catch(function () {

      /*
        Browser blocked playback.

        Show TAP TO PLAY without changing
        the visual design.
      */

      gate.style.display = "block";

    });

  }

}


/* ============================================================
   NEXT BEAT
============================================================ */

function next(i) {

  if (done) return;

  if (i !== idx) return;

  hideCard();

  if (
    i + 1 <
    beats.length
  ) {

    /*
      Give the video transition a moment.
    */

    setTimeout(
      function () {

        playBeat(i + 1);

      },
      300
    );

  } else {

    setTimeout(
      function () {

        showTitle();

      },
      350
    );

  }

}


/* ============================================================
   VIDEO EVENTS
============================================================ */

vids.forEach(function (v, i) {


  /* -----------------------------------------
     PLAYING
  ----------------------------------------- */

  v.addEventListener(
    "playing",
    function () {

      if (i !== idx) return;

      gate.style.display =
        "none";

    }
  );


  /* -----------------------------------------
     TIME UPDATE
  ----------------------------------------- */

  v.addEventListener(
    "timeupdate",
    function () {

      if (i !== idx) return;

      var c =
        beats[i].cards[shown];

      if (!c) return;


      /*
        Negative timing means:
        X seconds before the video ends.
      */

      var target;

      if (c.at < 0) {

        if (
          !v.duration ||
          !isFinite(v.duration)
        ) {

          return;

        }

        target =
          v.duration +
          c.at;

      } else {

        target =
          c.at;

      }


      if (
        v.currentTime >= target
      ) {

        showCard(c);

        shown++;

      }

    }
  );


  /* -----------------------------------------
     ENDED
  ----------------------------------------- */

  v.addEventListener(
    "ended",
    function () {

      next(i);

    }
  );


  /* -----------------------------------------
     ERROR
  ----------------------------------------- */

  v.addEventListener(
    "error",
    function () {

      /*
        If one video cannot load, don't
        silently destroy the entire intro.

        Show the playback gate so we can
        see that something went wrong.
      */

      if (i !== idx) return;

      gate.textContent =
        "VIDEO ERROR — TAP TO RETRY";

      gate.style.display =
        "block";

    }
  );

});


/* ============================================================
   START THE STORY
============================================================ */

function startStory() {

  if (!landing) return;

  landing = false;

  /*
    The original design does not have a
    separate landing overlay state, so the
    first video is already behind everything.

    Starting here makes the button click the
    actual media user gesture.
  */

  gate.style.display = "none";

  /*
    Dispatch when the story ACTUALLY starts.
  */

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

  /*
    Start the first video.
  */

  playBeat(0);
}


/* ============================================================
   FINAL STORY SCREEN
============================================================ */

function showTitle() {

  idx = beats.length;

  hideCard();

  vids.forEach(function (v) {

    v.pause();

    v.classList.remove("on");

  });

  gate.style.display = "none";

  root.classList.add("end");

  tagEl.textContent =
    "CH.01 / " +
    CHAPTER.title.a;

  go.focus();

}


/* ============================================================
   SKIP
============================================================ */

skip.addEventListener(
  "click",
  function () {

    if (done) return;

    /*
      Stop all videos.
    */

    vids.forEach(function (v) {

      v.pause();

    });

    /*
      Go to the final story card.
    */

    showTitle();

  }
);


/* ============================================================
   PLAYBACK GATE
============================================================ */

gate.addEventListener(
  "click",
  function () {

    gate.style.display = "none";

    var v = vids[idx];

    if (!v) return;

    v.muted = false;

    var promise;

    try {

      promise = v.play();

    } catch (e) {

      gate.style.display =
        "block";

      return;

    }

    if (
      promise &&
      typeof promise.catch === "function"
    ) {

      promise.catch(function () {

        gate.style.display =
          "block";

      });

    }

  }
);


/* ============================================================
   ENTER GAME
============================================================ */

function start() {

  if (done) return;

  done = true;

  /*
    Stop story media.
  */

  vids.forEach(function (v) {

    v.pause();

  });


  /*
    Fade the story out.
  */

  root.classList.add("out");


  setTimeout(
    function () {

      if (root.parentNode) {
        root.remove();
      }

      if (st.parentNode) {
        st.remove();
      }

      document.documentElement.style.overflow =
        prevOverflow;


      /*
        Tell anything listening that
        the story is completely finished.
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


      /*
        Keep the original event too,
        in case another part of your
        project is listening for it.
      */

      document.dispatchEvent(
        new CustomEvent(
          "static:story-start",
          {
            detail:{
              chapter:"prologue",
              completed:true
            }
          }
        )
      );

    },
    750
  );

}


go.addEventListener(
  "click",
  start
);


/* ============================================================
   LANDING BUTTON
============================================================ */

var landingButton =
  el(
    "button",
    "stG",
    root,
    "START THE STORY"
  );

landingButton.type = "button";


/*
  IMPORTANT:

  The existing original intro did not have
  a separate landing button because the
  story started immediately.

  We place this button over the existing
  title screen and use the same .stG design.
*/

landingButton.style.position = "absolute";
landingButton.style.left =
  "max(5vw,20px)";
landingButton.style.right =
  "max(5vw,20px)";
landingButton.style.bottom =
  "max(8vh,calc(28px + env(safe-area-inset-bottom)) + 92px)";
landingButton.style.zIndex = "10";
landingButton.style.maxWidth = "520px";


/* ============================================================
   LANDING TITLE
============================================================ */

var landingCard =
  el(
    "div",
    "stC on",
    root
  );

landingCard.style.zIndex = "9";
landingCard.style.bottom =
  "calc(max(8vh,28px) + 92px)";

var landingA =
  el(
    "div",
    "stA",
    landingCard,
    "THE STATIC"
  );

var landingB =
  el(
    "div",
    "stB",
    landingCard,
    "CRUISE. DISCOVER. CUSTOMIZE."
  );


/* ============================================================
   LANDING BUTTON POSITION FIX
============================================================ */

landingButton.style.bottom =
  "max(3vh,20px)";

landingCard.style.bottom =
  "max(15vh,105px)";


/* ============================================================
   START BUTTON
============================================================ */

landingButton.addEventListener(
  "click",
  function () {

    /*
      Remove landing elements.
    */

    landingButton.remove();

    landingCard.remove();

    /*
      Now start the actual story.
    */

    startStory();

  }
);


/* ============================================================
   PUBLIC API
============================================================ */

window.STATIC_STORY = {

  chapters: {
    prologue: CHAPTER
  },

  current: "prologue",

  start: startStory,

  finish: showTitle,

  enterGame: start

};

})();
