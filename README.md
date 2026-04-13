 # Reggae DJ Studio

A professional web-based DJ production suite for creating and performing reggae beats with drums, guitar riffs, keyboard, and effects.

## 🎵 Features

- **16-Step Drum Sequencer** - Program kicks, snares, hi-hats, and skanks with visual step editing
- **6 Drum Pads** - Quick-trigger drums via mouse or keyboard (1-6 keys)
- **8-Key Keyboard** - Play melodies in real-time (Z-M keys)
- **4 Guitar Riffs** - Pre-programmed reggae guitar patterns (Upstroke, Skanky, Bass, Chop)
- **Professional Mixing** - Separate volume controls for drums and melodic instruments
- **Real-time EQ Visualizer** - Animated spectrum display synced to playback
- **Terminal-Style UI** - Dark theme with neon green accents (DJ aesthetic)
- **Effects Panel** - Toggle Reverb, Delay, Distortion, Chorus
- **Tempo Control** - Adjustable BPM from 40-200
- **Filter Controls** - Cutoff frequency (200-5000 Hz) and reverb amount (0-100%)
- **Time Display** - Real-time playback position and step counter

## 📁 Project Structure

reggae-dj-studio/ ├── index.html # HTML structure & UI elements ├── styles.css # Terminal-style theming & responsive layout └── app.js # Audio engine, sequencer, UI interactions

Code

## 🚀 Quick Start

1. Save all three files (`index.html`, `styles.css`, `app.js`) in the same folder
2. Double-click `index.html` to open in your browser
3. Click the green **"CLICK HERE TO START AUDIO"** banner to enable Web Audio
4. Start creating beats!

## ⌨️ Keyboard Shortcuts

### Drum Triggers (1-6)

| Key | Drum | Color |
|-----|------|-------|
| **1** | Kick | Red |
| **2** | Snare | Cyan |
| **3** | Hi-Hat | Yellow |
| **4** | Clap | Magenta |
| **5** | Tom | Green |
| **6** | Percussion | Orange |

### Keyboard Notes (Z-M)

| Key | Note | Key | Note |
|-----|------|-----|------|
| **Z** | C4 | **B** | G4 |
| **X** | D4 | **N** | A4 |
| **C** | E4 | **M** | B4 |
| **V** | F4 | **,** | C5 |

## 🎛️ Control Panel

### Transport Controls

- **▶ Play** - Start sequencer playback
- **⏹ Stop** - Stop playback and reset
- **🔄 Clear All** - Reset all patterns to default

### Master Section

- **Tempo (BPM)** - 40-200 BPM range (default: 95)
- **Master Volume** - -30 to 0 dB (default: -8)

### Mixing Section

- **Drums Volume** - Drum track output level (default: -6 dB)
- **Melodic Volume** - Keyboard/Guitar output level (default: -12 dB)

### Sequencer

Click grid squares to toggle steps on/off for each drum track:

- **Kick** - Bass drum patterns
- **Snare** - Snare hits
- **Hi-Hat** - Closed hi-hat groove
- **Skank** - Reggae skank guitar rhythm

Pre-loaded with authentic reggae patterns.

### Guitar Riffs (Quick-Fire)

- **↗ Upstroke** - Classic upstroke pattern (D4, F#4, A4)
- **🔄 Skanky** - Reggae skanky riff (A3, D4, F#4, D4)
- **🎵 Bass** - Deep bass line (G2, G2, D3, A2)
- **✂ Chop** - Short choppy stab (D4, F#4)

### Effects & Filters

- **Reverb** - Toggle reverb effect on/off
- **Delay** - Toggle delay effect on/off
- **Distortion** - Toggle distortion effect on/off
- **Chorus** - Toggle chorus effect on/off
- **Filter Cutoff** - 200-5000 Hz (default: 5000 Hz)
- **Reverb Amount** - 0-100% (default: 30%)

## 🔧 Technology Stack

- **Tone.js v14.8** - Web Audio synthesis & sequencing (loaded from CDN)
- **Vanilla JavaScript** - No frameworks or dependencies
- **CSS Grid & Flexbox** - Responsive, modern layout
- **HTML5 Audio Context** - Web Audio API

## 🎚️ Sound Design

### Drum Synthesis

- **Kick** - MembraneSynth with punchy decay (C1, pitchDecay: 0.08)
- **Snare** - White noise synth with sharp attack (decay: 0.14)
- **Hi-Hat** - MetalSynth for crisp metallic texture (frequency: 400 Hz)
- **Clap** - Pink noise with fast envelope (decay: 0.18)
- **Tom** - MembraneSynth pitched mid-range (G2, pitchDecay: 0.03)
- **Percussion** - MetalSynth with high frequency (800 Hz)

### Melodic Synthesis

- **Keyboard** - Square wave synth with envelope control
- **Guitar Riffs** - PluckSynth for natural plucked string simulation
- **Bass** - Triangle wave synth for warm low-end

### Audio Routing

┌─────────────────────────────┐ │ Master Volume (-30 to 0) │ ├─────────────────────────────┤ │ ├─ Drum Bus (-30 to 0) │ │ │ ├─ Kick, Snare, Hi-Hat │ │ │ ├─ Clap, Tom, Perc │ │ │ └─ Skank Guitar │ │ │ │ │ └─ Melodic Bus (-30 to 0) │ │ ├─ Keyboard │ │ └─ Guitar Riffs │ └─────────────────────────────┘ ↓ To Speakers/Headphones

Code

## 🖥️ Running Locally

While the app works by opening `index.html` directly, a local server is recommended for better browser compatibility: 

```bash
Python 3
python3 -m http.server 8000
Then open http://localhost:8000

Node.js (http-server)
bash
npx http-server
Then open the URL printed in your terminal.

Simple PHP Server
bash
php -S localhost:8000
Then open http://localhost:8000
```

### 📋 How It Works
Initialization
1. Page loads and creates all UI elements dynamically
2. EQ visualizer bars are instantiated
3. Drum pads, sequencer steps, guitar riffs, and keyboard pads are generated
4. Event listeners are attached to all interactive elements

Audio Unlock
* User must click the green "CLICK HERE TO START AUDIO" banner
* This initializes the Web Audio context (browser security requirement)
* Tone.js is now ready to synthesize sounds
* Keyboard input is enabled after this point

Sequencer Operation
1. User programs patterns by clicking sequencer grid
2. User adjusts BPM and volume sliders
3. User clicks Play button
4. Tone.Transport starts at selected BPM
5. Tone.Sequence triggers on each 16th note:

    * Check if step is active in patterns
    * Call triggerDrum() for active drums
    * Call playGuitarRiff() for skank pattern
    * Update UI: highlight current step, advance time display
    * Update EQ visualizer with random heights
6. Loop continues until user clicks Stop

Live Performance
* User can press 1-6 keys at any time to trigger drums
* User can press Z-M keys to play keyboard melodies
* User can click guitar riff buttons to add texture
* User can toggle effects on/off
* All sounds are mixed through Master Bus with current volume settings

### ⚙️ Customization
Adding New Drums
Edit the DRUMS object in app.js:

```JavaScript
const DRUMS = {
  kick: { label: "KICK (1)", color: "#ff0000" },
  snare: { label: "SNARE (2)", color: "#00ffff" },
  hihat: { label: "HI-HAT (3)", color: "#ffff00" },
  clap: { label: "CLAP (4)", color: "#ff00ff" },
  tom: { label: "TOM (5)", color: "#00ff00" },
  perc: { label: "PERC (6)", color: "#ff6600" },
  // Add new drum here:
  // newdrum: { label: "NEW (7)", color: "#ff00ff" }
};
```
Then add synthesis code in triggerDrum() function:

```JavaScript
async function triggerDrum(drumKey) {
  // ... existing code ...
  
  const synths = {
    // ... existing synths ...
    newdrum: () => new Tone.NoiseSynth({
      noise: { type: "brown" },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
    }).connect(drumBus)
  };
}
```

Changing Default Patterns

Modify pattern arrays in app.js:

```JavaScript
const patterns = {
  kick: [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0].map(x => !!x),
  snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0].map(x => !!x),
  hihat: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0].map(x => !!x),
  skank: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0].map(x => !!x)
};

// 1 = step is active, 0 = step is inactive
```
Adding Guitar Riffs

Update GUITAR_RIFFS array in app.js:

```JavaScript
const GUITAR_RIFFS = [
  { name: "↗ Upstroke", notes: ["D4", "F#4", "A4"] },
  { name: "🔄 Skanky", notes: ["A3", "D4", "F#4", "D4"] },
  { name: "🎵 Bass", notes: ["G2", "G2", "D3", "A2"] },
  { name: "✂ Chop", notes: ["D4", "F#4"] },
  // Add new riff:
  { name: "🎸 Custom", notes: ["C4", "E4", "G4", "E4"] }
];
```
Adding Keyboard Notes

Extend KEYBOARD_NOTES array in app.js:

```JavaScript
const KEYBOARD_NOTES = [
  { note: "C4", label: "C", key: "Z" },
  { note: "D4", label: "D", key: "X" },
  // ... existing notes ...
  // Add more notes with different keys
  { note: "D5", label: "D5", key: "Q" }
];
```
Adjusting Sound Parameters

Modify synth parameters in triggerDrum() and playKeyboardNote():

```JavaScript
// Example: Make kick punchier
kick: () => new Tone.MembraneSynth({
  pitchDecay: 0.12,  // Longer pitch decay
  octaves: 8,        // More octaves
  envelope: { 
    attack: 0.001, 
    decay: 0.5,      // Longer decay
    sustain: 0, 
    release: 0.2 
  }
}).connect(drumBus)
```
Styling Changes

Edit styles.css to customize:

Primary Color (Neon Green)

``` CSS
/* Search for #00ff00 and replace with your color */
border: 2px solid #00ff00;  /* Change to #ff00ff for magenta */
color: #00ff00;              /* etc. */
```
Sidebar Width

```CSS
.sidebar {
  width: 300px;  /* Change to 250px or 350px */
}
```
Font

```CSS
body {
  font-family: 'Courier New', monospace;  /* Change to 'Arial', sans-serif */
}
```
### 🌐 Browser Support
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| iOS Safari | 14+ | ✅ Mobile Support |
| Chrome Mobile | Latest | ✅ Mobile Support |

Requirements:

* Modern Web Audio API support
* ES6 JavaScript support
* Tone.js library (loaded from CDN)
### 🔗 Dependencies
* Tone.js (v14.8.49) - https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js
Internet connection required to load Tone.js from CDN. All other code runs locally.

### 📝 Notes
* Audio Autoplay - Restricted by modern browsers. User must interact (click banner) first.
* Web Audio Context - Only one instance runs per page. Reload to reset.
* Mobile Performance - Works well on modern mobile browsers but may have latency.
* Headphones Recommended - For best low-end response and to avoid feedback during recording.
* Effects UI - Reverb and effects panels are visual placeholders ready for implementation.
* Pattern Persistence - Patterns are lost on page reload. Consider localStorage for persistence.
### 🎓 Example Workflow
Create Your First Beat

1. Enable Audio

    * Click the green "CLICK HERE TO START AUDIO" banner
    * Wait for confirmation message
2. Program Drums

    * Click sequencer grid squares to turn steps on/off
    * Create a kick drum pattern
    * Add snare on offbeats
    * Keep hi-hat steady
3. Play & Listen

    * Click Play button to start sequencer
    * Listen to the pattern loop
4. Adjust Feel

    * Change BPM slider to speed up/slow down
    * Adjust Drums volume slider for punch
    * Fine-tune with Master volume
5. Add Melody

    * While playing, press Z-M keys to add keyboard
    * Click guitar riff buttons for texture
    * Layer sounds on top of drums
6. Experiment

    * Toggle effects on/off
    * Adjust filter cutoff
    * Change reverb amount
    * Try different riff combinations
7. Refine

    * Click Clear All to start over
    * Program a new drum pattern
    * Adjust all volumes to taste
    * Export or record the mix
### 🎵 Tips for DJs
* Reggae Groove - Keep hi-hat on every eighth note for steady pocket
* Skank Pattern - The default skank rhythm (0,0,1,0...) is authentic reggae
* Kick Placement - Try kick on beat 1 and the "and" of 3 for classic reggae feel
* Layering - Start with drums, add bass line, then keyboard melody
* Tempo Range - Reggae typically 70-100 BPM; experiment with 85-95 for classic feel
* Filter Sweeps - Use filter cutoff slider to create dynamic tension
### 🐛 Troubleshooting
No Sound?
1. Check browser volume is not muted
2. Check device volume is not muted
3. Click the audio banner again
4. Refresh page and try again
5. Check browser console for errors (F12)

Audio is Distorted?
1. Lower the Master volume slider
2. Lower individual Drums or Melodic volume sliders
3. Check headphones/speaker settings

Keyboard Not Working?
1. Click in the browser window to focus
2. Make sure audio has been unlocked (banner clicked)
3. Try pressing numbers 1-6 for drums first
4. Check if another element has keyboard focus

Patterns Not Saving?
1. Patterns are stored in browser memory only
2. Reload page to reset
3. To save patterns, use browser DevTools to export

### 📞 Support
For issues or questions:
Call on Jesus, then:
1. Check the troubleshooting section above
2. Verify browser is up to date
3. Clear browser cache and reload
4. Try in a different browser
5. Check Tone.js documentation: https://tonejs.org

### 📄 License
Open source - MIT License. Feel free to modify and redistribute.

### 🎉 Credits
Built with:
Tone.js - Web Audio framework
HTML5 / CSS3 / JavaScript - Modern web standards
Reggae Music - Inspiration from the pioneers

Happy Beat Making! 🎵🎸🥁