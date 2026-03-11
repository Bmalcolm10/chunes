const LYRICS = [
  { s: "INTRO", c: "", lines: ["Slow reggae riddim, acoustic guitar...", "Yeah... listen to me now...", "Mmmmhmmm..."] },
  { s: "VERSE 1", c: "g", lines: ["Why go looking for water", "When you own the well", "Why chase another man's story", "When you got your own tale to tell", "Roots run deep in this earth", "Deeper than the eye can see", "Stop searching in the darkness, bredren", "The light was always in you and me"] },
  { s: "CHORUS", c: "", lines: ["Own the well, own the well", "No more thirst, no more pain", "Own the well, own the well", "Drink deep and rise again", "Everything you need, it's already there", "Feel the blessing in the air", "Own the well...", "Own the well..."] },
  { s: "VERSE 2", c: "g", lines: ["Too many people running", "Chasing what they already hold", "A man with gold in his hands", "Still trading warmth for cold", "Your culture is your kingdom", "Your mind is your throne", "Why beg for someone's table", "When you been building your own home"] },
  { s: "CHORUS", c: "", lines: ["Own the well, own the well", "No more thirst, no more pain", "Own the well, own the well", "Drink deep and rise again", "Everything you need, it's already there", "Feel the blessing in the air", "Own the well...", "Own the well..."] },
  { s: "BRIDGE", c: "o", lines: ["Marcus told us, rise and know thyself", "Jah provide, no need to look elsewhere", "Every dream you carry in your chest", "Is the answer to the very prayer you prayer"] },
  { s: "VERSE 3", c: "g", lines: ["So I plant my feet on solid ground", "Let my roots drink from within", "No storm can move a man who knows", "Where his water's always been", "Why go looking for water", "When you own the well", "Stand up in your truth now", "And let your spirit dwell"] },
  { s: "OUTRO", c: "", lines: ["Own the well... own the well...", "Jah bless the ones who know their worth...", "Own the well... own the well...", "Deepest water... straight from the earth...", "Yeah... yeah... mmmmhmmm..."] }
];

const eqrow = document.getElementById("eqrow");
for (let i = 0; i < 16; i++) {
  const b = document.createElement("div");
  b.className = "bar";
  b.id = "b" + i;
  eqrow.appendChild(b);
}

let audioReady = false;
let playing = false;
let si = 0;
let li = 0;
let lt = null;
let et = null;
let vol = -6;
let bpm = 75;
let synths = {};
let seq = null;

function renderLyrics() {
  const sec = LYRICS[si];
  document.getElementById("sbadge").textContent = sec.s;
  const c = document.getElementById("llines");
  c.innerHTML = "";
  sec.lines.forEach((ln, i) => {
    const s = document.createElement("span");
    s.className = "line" + (i === li ? " active " + sec.c : "");
    s.textContent = ln;
    c.appendChild(s);
  });
}

function tickLyric() {
  li++;
  if (li >= LYRICS[si].lines.length) {
    li = 0;
    si = (si + 1) % LYRICS.length;
  }
  renderLyrics();
}

const EQ_COLORS = ["#00cc44", "#ffd700", "#ffa500", "#00aaff", "#ff6699", "#cc44ff"];
function startEQ() {
  et = setInterval(() => {
    for (let i = 0; i < 16; i++) {
      const b = document.getElementById("b" + i);
      b.style.height = Math.floor(Math.random() * 26 + 4) + "px";
      b.style.background = EQ_COLORS[i % EQ_COLORS.length];
    }
  }, 130);
}

function stopEQ() {
  clearInterval(et);
  for (let i = 0; i < 16; i++) {
    const b = document.getElementById("b" + i);
    b.style.height = "5px";
    b.style.background = "#2a2a2a";
  }
}

function setDots(on) {
  const cols = ["#90ee90", "#ffd700", "#ffa500", "#87ceeb"];
  for (let i = 0; i < 4; i++) {
    const d = document.getElementById("d" + i);
    d.style.background = on ? cols[i] : "#2a2a2a";
    if (on) {
      d.classList.add("on");
    } else {
      d.classList.remove("on");
    }
  }
}

async function unlockAudio() {
  if (typeof Tone === "undefined") {
    alert("Tone.js failed to load. Check internet connection and refresh.");
    return;
  }
  if (!audioReady) {
    await Tone.start();
    audioReady = true;
    const banner = document.getElementById("unlockBanner");
    banner.textContent = "Audio enabled. Press Play.";
    banner.style.color = "#90ee90";
  }
}

async function buildRiddim() {
  if (!audioReady) {
    await unlockAudio();
  }
  Tone.getTransport().bpm.value = bpm;
  const mv = new Tone.Volume(vol).toDestination();
  const bass = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.02, decay: 0.35, sustain: 0.4, release: 0.9 } }).connect(mv);
  const skank = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.005, decay: 0.08, sustain: 0.02, release: 0.08 } }).connect(mv);
  skank.volume.value = -5;
  const organ = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "sine" }, envelope: { attack: 0.06, decay: 0.2, sustain: 0.6, release: 0.5 } }).connect(mv);
  organ.volume.value = -8;
  const hihat = new Tone.MetalSynth({ frequency: 400, envelope: { attack: 0.001, decay: 0.04, release: 0.01 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5 }).connect(mv);
  hihat.volume.value = -12;
  const kick = new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 6, envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 } }).connect(mv);
  kick.volume.value = -3;
  const snare = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.14, sustain: 0, release: 0.05 } }).connect(mv);
  snare.volume.value = -8;

  synths = { bass, skank, organ, hihat, kick, snare, mv };

  const BL = ["G2", null, null, "G2", null, "D2", null, null, "G2", null, null, "Bb2", null, "F2", null, null];
  const SK = [null, null, 1, null, null, null, 1, null, null, null, 1, null, null, null, 1, null];
  const KK = [null, null, null, null, null, null, null, null, 1, null, null, null, null, null, null, null];
  const SN = [null, null, null, null, 1, null, null, null, null, null, null, null, 1, null, null, null];
  const HH = [1, null, 1, null, 1, null, 1, null, 1, null, 1, null, 1, null, 1, null];
  const OR = [["G3", "Bb3", "D4"], null, null, null, ["G3", "Bb3", "D4"], null, null, null, ["F3", "A3", "C4"], null, null, null, ["F3", "A3", "C4"], null, null, null];

  let st = 0;
  seq = new Tone.Sequence((t) => {
    const i = st % 16;
    if (BL[i]) bass.triggerAttackRelease(BL[i], "8n", t);
    if (SK[i]) skank.triggerAttackRelease("D4", "16n", t);
    if (KK[i]) kick.triggerAttackRelease("C1", "8n", t);
    if (SN[i]) snare.triggerAttackRelease("16n", t);
    if (HH[i]) hihat.triggerAttackRelease("32n", t);
    if (OR[i]) organ.triggerAttackRelease(OR[i], "8n", t);
    st++;
  }, [...Array(16).keys()], "16n");

  seq.start(0);
  Tone.getTransport().start();
}

function stopAll() {
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  if (seq) {
    seq.dispose();
    seq = null;
  }
  Object.values(synths).forEach((s) => {
    try {
      s.dispose();
    } catch (e) {}
  });
  synths = {};
  clearInterval(lt);
  lt = null;
  stopEQ();
  setDots(false);
}

async function togglePlay() {
  if (typeof Tone === "undefined") {
    alert("Tone.js failed to load. Check internet connection and refresh.");
    return;
  }

  if (playing) {
    stopAll();
    playing = false;
    document.getElementById("playBtn").textContent = "▶";
    document.getElementById("playBtn").className = "btn";
    document.getElementById("plabel").textContent = "Drop the riddim";
    document.getElementById("idle").style.display = "block";
    document.getElementById("ldisplay").style.display = "none";
  } else {
    si = 0;
    li = 0;
    playing = true;
    document.getElementById("playBtn").textContent = "⏹";
    document.getElementById("playBtn").className = "btn stop";
    document.getElementById("plabel").textContent = "🎵 Riddim playing...";
    document.getElementById("idle").style.display = "none";
    document.getElementById("ldisplay").style.display = "block";
    renderLyrics();
    await buildRiddim();
    lt = setInterval(tickLyric, 2200);
    startEQ();
    setDots(true);
  }
}

function changeBPM(v) {
  bpm = parseInt(v, 10);
  document.getElementById("bpmVal").textContent = v;
  if (playing) Tone.getTransport().bpm.value = bpm;
}

function changeVol(v) {
  vol = parseInt(v, 10);
  document.getElementById("volVal").textContent = v;
  if (synths.mv) synths.mv.volume.value = vol;
}

window.unlockAudio = unlockAudio;
window.togglePlay = togglePlay;
window.changeBPM = changeBPM;
window.changeVol = changeVol;
