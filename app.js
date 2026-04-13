// Reggae DJ Studio - Main Application

const DRUMS = {
  kick: { label: "KICK (1)", color: "#ff0000" },
  snare: { label: "SNARE (2)", color: "#00ffff" },
  hihat: { label: "HI-HAT (3)", color: "#ffff00" },
  clap: { label: "CLAP (4)", color: "#ff00ff" },
  tom: { label: "TOM (5)", color: "#00ff00" },
  perc: { label: "PERC (6)", color: "#ff6600" }
};

const GUITAR_RIFFS = [
  { name: "↗ Upstroke", notes: ["D4", "F#4", "A4"] },
  { name: "🔄 Skanky", notes: ["A3", "D4", "F#4", "D4"] },
  { name: "🎵 Bass", notes: ["G2", "G2", "D3", "A2"] },
  { name: "✂ Chop", notes: ["D4", "F#4"] }
];

const KEYBOARD_NOTES = [
  { note: "C4", label: "C", key: "Z" },
  { note: "D4", label: "D", key: "X" },
  { note: "E4", label: "E", key: "C" },
  { note: "F4", label: "F", key: "V" },
  { note: "G4", label: "G", key: "B" },
  { note: "A4", label: "A", key: "N" },
  { note: "B4", label: "B", key: "M" },
  { note: "C5", label: "C5", key: "," }
];

const EFFECTS = [
  { name: "Reverb", id: "reverb" },
  { name: "Delay", id: "delay" },
  { name: "Distortion", id: "distortion" },
  { name: "Chorus", id: "chorus" }
];

// State
let audioReady = false;
let playing = false;
let masterVol = null;
let drumBus = null;
let melBus = null;
let currentStep = 0;
let bpm = 95;
let seq = null;
let volumeValues = { master: -8, drums: -6, melodic: -12 };
let effectsActive = {};

const patterns = {
  kick: [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0].map(x => !!x),
  snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0].map(x => !!x),
  hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0].map(x => !!x),
  skank: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0].map(x => !!x)
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeUI();
  setupAudioBanner();
});

function setupAudioBanner() {
  document.getElementById("unlockBanner").addEventListener("click", initAudio);
}

async function initAudio() {
  if (audioReady) return;

  await Tone.start();
  audioReady = true;

  masterVol = new Tone.Volume(volumeValues.master).toDestination();
  drumBus = new Tone.Volume(volumeValues.drums).connect(masterVol);
  melBus = new Tone.Volume(volumeValues.melodic).connect(masterVol);

  setupKeyboardInput();

  document.getElementById("unlockBanner").classList.add("active");
  document.getElementById("unlockBanner").textContent = "✅ AUDIO ENABLED - READY TO PLAY";
  updateStatus("Audio enabled! Try keyboard or drums");
}

function initializeUI() {
  createEQVisualizer();
  createDrumPads();
  createSequencer();
  createGuitarPads();
  createKeyboardPads();
  createEffectButtons();
}

function createEQVisualizer() {
  const eqViz = document.getElementById("eqVisualizer");
  for (let i = 0; i < 16; i++) {
    const bar = document.createElement("div");
    bar.className = "eq-bar";
    bar.id = `eq-${i}`;
    eqViz.appendChild(bar);
  }
}

function createDrumPads() {
  const container = document.getElementById("drumPads");
  Object.entries(DRUMS).forEach(([key, config]) => {
    const pad = document.createElement("button");
    pad.className = "pad";
    pad.textContent = config.label;
    pad.style.color = config.color;
    pad.addEventListener("mousedown", () => triggerDrum(key));
    container.appendChild(pad);
  });
}

function createSequencer() {
  Object.entries(patterns).forEach(([key, pattern]) => {
    const container = document.getElementById(`${key}Seq`);
    pattern.forEach((active, idx) => {
      const step = document.createElement("div");
      step.className = "step" + (active ? " active" : "");
      step.dataset.index = idx;
      step.dataset.drum = key;
      step.addEventListener("click", () => toggleStep(key, idx, step));
      container.appendChild(step);
    });
  });
}

function toggleStep(drum, idx, element) {
  patterns[drum][idx] = !patterns[drum][idx];
  element.classList.toggle("active");
}

function createGuitarPads() {
  const container = document.getElementById("guitarPads");
  GUITAR_RIFFS.forEach((riff) => {
    const pad = document.createElement("button");
    pad.className = "effect-btn";
    pad.textContent = riff.name;
    pad.style.flex = "1";
    pad.addEventListener("click", async () => {
      if (!audioReady) await initAudio();
      playGuitarRiff(riff.notes);
    });
    container.appendChild(pad);
  });
}

function createKeyboardPads() {
  const container = document.getElementById("keyboardPads");
  KEYBOARD_NOTES.forEach(({ note, label, key }) => {
    const pad = document.createElement("button");
    pad.className = "effect-btn";
    pad.textContent = `${label}`;
    pad.dataset.note = note;
    pad.dataset.key = key;
    pad.addEventListener("mousedown", async () => {
      if (!audioReady) await initAudio();
      playKeyboardNote(note, pad);
    });
    pad.addEventListener("mouseup", () => pad.classList.remove("active"));
    pad.addEventListener("mouseleave", () => pad.classList.remove("active"));
    container.appendChild(pad);
  });
}

function createEffectButtons() {
  const container = document.getElementById("effectsPanel");
  EFFECTS.forEach(effect => {
    const btn = document.createElement("button");
    btn.className = "effect-btn";
    btn.textContent = effect.name;
    btn.id = effect.id;
    btn.addEventListener("click", () => toggleEffect(effect.id, btn));
    container.appendChild(btn);
    effectsActive[effect.id] = false;
  });
}

function setupKeyboardInput() {
  document.addEventListener("keydown", (e) => {
    if (e.repeat) return;

    // Keyboard keys
    const keyPad = document.querySelector(`[data-key="${e.key.toUpperCase()}"]`);
    if (keyPad) {
      playKeyboardNote(keyPad.dataset.note, keyPad);
      keyPad.classList.add("active");
      return;
    }

    // Number keys for drums (1-6)
    const drumPairs = [
      ["1", "kick"],
      ["2", "snare"],
      ["3", "hihat"],
      ["4", "clap"],
      ["5", "tom"],
      ["6", "perc"]
    ];

    for (let [key, drum] of drumPairs) {
      if (e.key === key) {
        triggerDrum(drum);
        return;
      }
    }
  });

  document.addEventListener("keyup", (e) => {
    const keyPad = document.querySelector(`[data-key="${e.key.toUpperCase()}"]`);
    if (keyPad) keyPad.classList.remove("active");
  });
}

async function triggerDrum(drumKey) {
  if (!audioReady) await initAudio();

  const synths = {
    kick: () => new Tone.MembraneSynth({
      pitchDecay: 0.08, octaves: 6,
      envelope: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.2 }
    }).connect(drumBus),
    snare: () => new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.14, sustain: 0, release: 0.05 }
    }).connect(drumBus),
    hihat: () => new Tone.MetalSynth({
      frequency: 400,
      envelope: { attack: 0.001, decay: 0.04, release: 0.01 },
      harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5
    }).connect(drumBus),
    clap: () => new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.003, decay: 0.18, sustain: 0, release: 0.08 }
    }).connect(drumBus),
    tom: () => new Tone.MembraneSynth({
      pitchDecay: 0.03, octaves: 4,
      envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.08 }
    }).connect(drumBus),
    perc: () => new Tone.MetalSynth({
      frequency: 800, envelope: { attack: 0.001, decay: 0.06, release: 0.01 },
      harmonicity: 4, modulationIndex: 28, resonance: 3500, octaves: 1.2
    }).connect(drumBus)
  };

  const synth = synths[drumKey]();
  const notes = { kick: "C1", snare: null, hihat: null, clap: null, tom: "G2", perc: null };

  if (notes[drumKey]) {
    synth.triggerAttackRelease(notes[drumKey], "8n");
  } else {
    synth.triggerAttackRelease("16n");
  }

  setTimeout(() => synth.dispose(), 500);
  updateEQ();
}

async function playGuitarRiff(notes) {
  if (!audioReady) await initAudio();

  const guitar = new Tone.PluckSynth({
    attackTime: 0.02, decayTime: 0.5, dampening: 0.4
  }).connect(melBus);

  let time = 0;
  notes.forEach(note => {
    guitar.triggerAttackRelease(note, "16n", `+${time}`);
    time += 0.12;
  });

  setTimeout(() => guitar.dispose(), 1000);
  updateEQ();
}

async function playKeyboardNote(note, element) {
  if (!audioReady) await initAudio();

  const synth = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.1, release: 0.2 }
  }).connect(melBus);

  synth.triggerAttackRelease(note, "8n");
  if (element) element.classList.add("active");
  setTimeout(() => synth.dispose(), 600);
  updateEQ();
}

function updateEQ() {
  for (let i = 0; i < 16; i++) {
    const bar = document.getElementById(`eq-${i}`);
    const height = Math.random() * 50 + 10;
    bar.style.height = height + "px";
  }
}

function toggleEffect(effectId, btn) {
  effectsActive[effectId] = !effectsActive[effectId];
  btn.classList.toggle("active");
  updateStatus(`${effectId.toUpperCase()} ${effectsActive[effectId] ? "ON" : "OFF"}`);
}

async function togglePlay() {
  if (!audioReady) await initAudio();

  if (playing) {
    stopSequence();
  } else {
    playing = true;
    Tone.getTransport().bpm.value = bpm;
    currentStep = 0;

    seq = new Tone.Sequence((t) => {
      const step = currentStep % 16;

      // Update UI
      document.querySelectorAll(".step").forEach(s => s.classList.remove("current"));
      document.querySelectorAll(`.step[data-index="${step}"]`).forEach(s => s.classList.add("current"));

      // Play steps
      if (patterns.kick[step]) triggerDrum("kick");
      if (patterns.snare[step]) triggerDrum("snare");
      if (patterns.hihat[step]) triggerDrum("hihat");
      if (patterns.skank[step]) playGuitarRiff(["D4", "F#4"]);

      currentStep++;
      updateTimeDisplay();
      updateEQ();
    }, [...Array(16).keys()], "16n");

    seq.start(0);
    Tone.getTransport().start();
    document.getElementById("playBtn").classList.add("active");
    document.getElementById("playBtn").textContent = "⏸ Pause";
    updateStatus("Playing...");
  }
}

function stopSequence() {
  playing = false;
  Tone.getTransport().stop();
  if (seq) seq.dispose();
  document.getElementById("playBtn").classList.remove("active");
  document.getElementById("playBtn").textContent = "▶ Play";
  updateStatus("Stopped");
  updateTimeDisplay();
}

function updateTimeDisplay() {
  const seconds = (currentStep / 4).toFixed(1);
  document.getElementById("timeDisplay").textContent = `${seconds}s / 16 Steps`;
}

function updateStatus(msg) {
  document.getElementById("statusBar").textContent = msg || "Ready";
}

function changeBPM(val) {
  bpm = parseInt(val);
  document.getElementById("bpmVal").textContent = val;
  if (playing) Tone.getTransport().bpm.value = bpm;
  updateStatus(`Tempo: ${val} BPM`);
}

function changeVol(val) {
  volumeValues.master = parseInt(val);
  document.getElementById("volVal").textContent = val;
  if (masterVol) masterVol.volume.value = val;
}

function changeDrumVol(val) {
  volumeValues.drums = parseInt(val);
  document.getElementById("drumVolVal").textContent = val;
  if (drumBus) drumBus.volume.value = val;
}

function changeMelVol(val) {
  volumeValues.melodic = parseInt(val);
  document.getElementById("melVolVal").textContent = val;
  if (melBus) melBus.volume.value = val;
}

function changeFilter(val) {
  document.getElementById("filterVal").textContent = val;
}

function changeReverb(val) {
  document.getElementById("reverbVal").textContent = val;
}

function clearAll() {
  Object.keys(patterns).forEach(key => patterns[key].fill(false));
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  updateStatus("Patterns cleared");
}