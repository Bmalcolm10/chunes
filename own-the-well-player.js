<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reggae Beat Maker</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #90ee90;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      background: #0a0a0a;
      border: 3px solid #90ee90;
      border-radius: 15px;
      padding: 30px;
      max-width: 900px;
      width: 100%;
      box-shadow: 0 0 30px rgba(144, 238, 144, 0.3);
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #90ee90;
      text-shadow: 0 0 10px rgba(144, 238, 144, 0.5);
    }

    .banner {
      text-align: center;
      padding: 15px;
      background: #1a1a1a;
      border: 2px solid #666;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 16px;
      color: #ffd700;
      cursor: pointer;
      transition: all 0.3s;
    }

    .banner:hover {
      background: #2a2a2a;
      border-color: #90ee90;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }

    .control-group {
      background: #1a1a1a;
      padding: 15px;
      border-radius: 8px;
      border: 2px solid #333;
    }

    .control-group label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
      color: #90ee90;
    }

    .control-group input[type="range"] {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: #333;
      outline: none;
      -webkit-appearance: none;
    }

    .control-group input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #90ee90;
      cursor: pointer;
      box-shadow: 0 0 5px rgba(144, 238, 144, 0.5);
    }

    .control-group input[type="range"]::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #90ee90;
      cursor: pointer;
      border: none;
      box-shadow: 0 0 5px rgba(144, 238, 144, 0.5);
    }

    .value-display {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #ffd700;
      margin-top: 8px;
    }

    .play-section {
      text-align: center;
      margin-bottom: 30px;
    }

    .play-label {
      display: block;
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: bold;
      color: #90ee90;
    }

    .btn {
      padding: 15px 40px;
      font-size: 18px;
      font-weight: bold;
      border: 2px solid #90ee90;
      border-radius: 8px;
      background: #1a1a1a;
      color: #90ee90;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 0 10px rgba(144, 238, 144, 0.3);
    }

    .btn:hover {
      background: #90ee90;
      color: #0a0a0a;
      box-shadow: 0 0 20px rgba(144, 238, 144, 0.6);
    }

    .btn.stop {
      border-color: #ff6699;
      color: #ff6699;
      box-shadow: 0 0 10px rgba(255, 102, 153, 0.3);
    }

    .btn.stop:hover {
      background: #ff6699;
      color: #0a0a0a;
      box-shadow: 0 0 20px rgba(255, 102, 153, 0.6);
    }

    #eqrow {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      height: 60px;
      gap: 4px;
      margin-bottom: 30px;
      padding: 10px;
      background: #1a1a1a;
      border-radius: 8px;
      border: 2px solid #333;
    }

    .bar {
      flex: 1;
      background: #2a2a2a;
      border-radius: 4px;
      height: 5px;
      transition: all 0.1s ease;
    }

    #instrumentPanel {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      padding: 15px;
      background: #1a1a1a;
      border-radius: 8px;
      margin: 15px 0;
      border: 2px solid #333;
    }

    .instrument-btn {
      padding: 12px 8px;
      border: 2px solid #666;
      border-radius: 6px;
      color: #000;
      font-weight: bold;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .instrument-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
    }

    .instrument-btn:active {
      transform: scale(0.95);
    }

    #idle {
      text-align: center;
      padding: 40px;
      color: #90ee90;
      font-size: 18px;
    }

    #ldisplay {
      display: none;
    }

    .section-badge {
      display: inline-block;
      background: #ffd700;
      color: #000;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: bold;
      margin-bottom: 15px;
      box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
    }

    #llines {
      text-align: center;
      line-height: 1.8;
      margin: 20px 0;
    }

    .line {
      display: block;
      padding: 8px;
      color: #90ee90;
      transition: all 0.3s;
    }

    .line.active {
      background: rgba(144, 238, 144, 0.2);
      border-left: 4px solid #ffd700;
      padding-left: 12px;
      font-weight: bold;
      color: #ffd700;
    }

    .line.active.g {
      border-left-color: #00aaff;
      color: #00aaff;
    }

    .line.active.o {
      border-left-color: #ff9933;
      color: #ff9933;
    }

    .dots {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }

    .dot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #2a2a2a;
      transition: all 0.2s;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .dot.on {
      box-shadow: 0 0 10px currentColor;
    }

    @media (max-width: 768px) {
      .controls {
        grid-template-columns: 1fr;
      }

      #instrumentPanel {
        grid-template-columns: repeat(2, 1fr);
      }

      .container {
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎵 Reggae Beat Maker 🎵</h1>
    
    <div class="banner" id="unlockBanner">
      👆 Click here to enable audio
    </div>

    <div class="play-section">
      <span class="play-label" id="plabel">Drop the riddim</span>
      <button class="btn" id="playBtn" onclick="togglePlay()">▶ Play</button>
    </div>

    <div class="controls">
      <div class="control-group">
        <label for="bpmSlider">🎚️ BPM (Tempo)</label>
        <input type="range" id="bpmSlider" min="40" max="140" value="75" oninput="changeBPM(this.value)">
        <div class="value-display"><span id="bpmVal">75</span> BPM</div>
      </div>

      <div class="control-group">
        <label for="volSlider">🔊 Volume</label>
        <input type="range" id="volSlider" min="-20" max="0" value="-6" oninput="changeVol(this.value)">
        <div class="value-display"><span id="volVal">-6</span> dB</div>
      </div>
    </div>

    <div id="eqrow"></div>

    <div id="idle">
      👁️ Press play and watch the riddim drop... 👁️
    </div>

    <div id="ldisplay">
      <div style="text-align: center; margin-top: 20px;">
        <div class="section-badge" id="sbadge">INTRO</div>
        <div id="llines"></div>
        <div class="dots">
          <div class="dot" id="d0"></div>
          <div class="dot" id="d1"></div>
          <div class="dot" id="d2"></div>
          <div class="dot" id="d3"></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Reggae Beat Maker with Interactive Instrument Buttons
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

    // Instrument button configurations
    const INSTRUMENTS = {
      kick: { label: "🥁 Kick", color: "#ff6699", hotkey: "K" },
      snare: { label: "👏 Snare", color: "#00aaff", hotkey: "S" },
      hihat: { label: "🎛️ Hi-Hat", color: "#ffd700", hotkey: "H" },
      clap: { label: "👐 Clap", color: "#ff9933", hotkey: "C" },
      tom: { label: "🔊 Tom", color: "#cc44ff", hotkey: "T" },
      cowbell: { label: "🔔 Cowbell", color: "#90ee90", hotkey: "W" },
      guitar_strum: { label: "🎸 Strum", color: "#ffaa44", hotkey: "G" },
      guitar_lead: { label: "🎸 Lead", color: "#ff7777", hotkey: "L" }
    };

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

    // Track which instruments are active/muted
    let instrumentStates = {};
    Object.keys(INSTRUMENTS).forEach(key => {
      instrumentStates[key] = true;
    });

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
        banner.textContent = "✅ Audio enabled. Press Play!";
        banner.style.color = "#90ee90";
      }
    }

    // Create instrument buttons panel
    function createInstrumentPanel() {
      const panel = document.createElement("div");
      panel.id = "instrumentPanel";

      Object.entries(INSTRUMENTS).forEach(([key, config]) => {
        const btn = document.createElement("button");
        btn.id = `btn_${key}`;
        btn.className = "instrument-btn";
        btn.textContent = config.label;
        btn.style.background = config.color;

        btn.addEventListener("mousedown", () => {
          triggerInstrument(key);
          btn.style.transform = "scale(0.95)";
        });

        btn.addEventListener("mouseup", () => {
          btn.style.transform = "scale(1)";
        });

        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "scale(1)";
        });

        // Mute toggle
        btn.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          instrumentStates[key] = !instrumentStates[key];
          btn.style.opacity = instrumentStates[key] ? "1" : "0.3";
          btn.title = instrumentStates[key] ? "Click to play (right-click to mute)" : "Muted (right-click to unmute)";
        });

        btn.title = "Click to play (right-click to mute)";
        panel.appendChild(btn);
      });

      return panel;
    }

    // Trigger individual instrument sound
    async function triggerInstrument(instrumentKey) {
      if (!audioReady) {
        await unlockAudio();
      }

      if (!instrumentStates[instrumentKey]) return;

      const mv = synths.mv || new Tone.Volume(vol).toDestination();

      switch (instrumentKey) {
        case "kick":
          {
            const kick = new Tone.MembraneSynth({
              pitchDecay: 0.05,
              octaves: 6,
              envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 }
            }).connect(mv);
            kick.volume.value = -3;
            kick.triggerAttackRelease("C1", "8n");
            setTimeout(() => kick.dispose(), 500);
          }
          break;

        case "snare":
          {
            const snare = new Tone.NoiseSynth({
              noise: { type: "white" },
              envelope: { attack: 0.001, decay: 0.14, sustain: 0, release: 0.05 }
            }).connect(mv);
            snare.volume.value = -8;
            snare.triggerAttackRelease("16n");
            setTimeout(() snare.dispose(), 200);
          }
          break;

        case "hihat":
          {
            const hihat = new Tone.MetalSynth({
              frequency: 400,
              envelope: { attack: 0.001, decay: 0.04, release: 0.01 },
              harmonicity: 5.1,
              modulationIndex: 32,
              resonance: 4000,
              octaves: 1.5
            }).connect(mv);
            hihat.volume.value = -12;
            hihat.triggerAttackRelease("32n");
            setTimeout(() => hihat.dispose(), 200);
          }
          break;

        case "clap":
          {
            const clap = new Tone.NoiseSynth({
              noise: { type: "pink" },
              envelope: { attack: 0.003, decay: 0.18, sustain: 0, release: 0.08 }
            }).connect(mv);
            clap.volume.value = -6;
            clap.triggerAttackRelease("16n");
            setTimeout(() => clap.dispose(), 250);
          }
          break;

        case "tom":
          {
            const tom = new Tone.MembraneSynth({
              pitchDecay: 0.03,
              octaves: 4,
              envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.08 }
            }).connect(mv);
            tom.volume.value = -5;
            tom.triggerAttackRelease("G2", "16n");
            setTimeout(() => tom.dispose(), 200);
          }
          break;

        case "cowbell":
          {
            const cowbell = new Tone.MetalSynth({
              frequency: 650,
              envelope: { attack: 0.002, decay: 0.08, release: 0.02 },
              harmonicity: 3.2,
              modulationIndex: 24,
              resonance: 3000,
              octaves: 1
            }).connect(mv);
            cowbell.volume.value = -10;
            cowbell.triggerAttackRelease("16n");
            setTimeout(() => cowbell.dispose(), 150);
          }
          break;

        case "guitar_strum":
          {
            const guitar = new Tone.PluckSynth({
              attackTime: 0.02,
              decayTime: 0.5,
              dampening: 0.4
            }).connect(mv);
            guitar.volume.value = -4;
            guitar.triggerAttackRelease("D4", "8n");
            setTimeout(() => guitar.dispose(), 600);
          }
          break;

        case "guitar_lead":
          {
            const lead = new Tone.Synth({
              oscillator: { type: "sawtooth" },
              envelope: { attack: 0.008, decay: 0.3, sustain: 0.3, release: 0.4 }
            }).connect(mv);
            lead.volume.value = -7;
            lead.triggerAttackRelease("A4", "16n");
            setTimeout(() => lead.dispose(), 600);
          }
          break;
      }
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (!playing) return;

      Object.entries(INSTRUMENTS).forEach(([key, config]) => {
        if (e.key.toUpperCase() === config.hotkey) {
          triggerInstrument(key);
        }
      });
    });

    async function buildRiddim() {
      if (!audioReady) {
        await unlockAudio();
      }
      Tone.getTransport().bpm.value = bpm;
      const mv = new Tone.Volume(vol).toDestination();
      const bass = new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.02, decay: 0.35, sustain: 0.4, release: 0.9 }
      }).connect(mv);
      const skank = new Tone.Synth({
        oscillator: { type: "square" },
        envelope: { attack: 0.005, decay: 0.08, sustain: 0.02, release: 0.08 }
      }).connect(mv);
      skank.volume.value = -5;
      const organ = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.06, decay: 0.2, sustain: 0.6, release: 0.5 }
      }).connect(mv);
      organ.volume.value = -8;
      const hihat = new Tone.MetalSynth({
        frequency: 400,
        envelope: { attack: 0.001, decay: 0.04, release: 0.01 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).connect(mv);
      hihat.volume.value = -12;
      const kick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 6,
        envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 }
      }).connect(mv);
      kick.volume.value = -3;
      const snare = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.14, sustain: 0, release: 0.05 }
      }).connect(mv);
      snare.volume.value = -8;

      synths = { bass, skank, organ, hihat, kick, snare, mv };

      const BL = ["G2", null, null, "G2", null, "D2", null, null, "G2", null, null, "Bb2", null, "F2", null, null];
      const SK = [null, null, 1, null, null, null, 1, null, null, null, 1, null, null, null, 1,](#)*
