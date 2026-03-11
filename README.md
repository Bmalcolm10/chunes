# Own The Well - Reggae Riddim Player

A lightweight browser music toy that plays an original roots reggae groove and scrolls synced lyrics.

Built with plain HTML/CSS/JavaScript and powered by Tone.js (loaded from CDN).

## Features

- Play/stop procedural reggae-style backing track
- Real-time lyric section and line highlighting
- Tempo control (60-100 BPM)
- Master volume control (-20 dB to 0 dB)
- Animated EQ bars and live instrument status dots
- Mobile-friendly unlock flow for Web Audio autoplay restrictions

## Project Structure

- index.html: Main page layout and script/style includes
- own-the-well-player.css: Visual theme and component styling
- own-the-well-player.js: Audio engine, sequencer, lyric timing, and UI interactions

## Quick Start

1. Open index.html in a modern browser.
2. Tap/click the audio unlock banner once.
3. Press Play.
4. Adjust tempo and volume while playing.

## Running Locally (recommended)

Using a local server helps avoid browser quirks with direct file access.

### Python

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

### Node.js

```bash
npx serve .
```

Then open the URL printed in your terminal.

## How It Works

- Tone.js Transport runs at the selected BPM.
- A 16-step Tone.Sequence triggers:
  - Bass synth
  - Skank synth
  - Organ polysynth chords
  - Kick, snare, and hi-hat/percussion
- Lyrics are stored in section blocks and advanced on a timed interval.
- UI state updates on play/stop for labels, badges, indicators, and equalizer animation.

## Notes

- Internet connection is required to load Tone.js from CDN:
  - https://cdnjs.cloudflare.com/ajax/libs/tone/15.3.5/Tone.js
- If audio does not start, click/tap the unlock banner again and confirm your browser tab is active.

## Customization

- Edit lyrics and section labels in the LYRICS array in own-the-well-player.js.
- Tweak groove patterns in BL, SK, KK, SN, HH, and OR arrays.
- Change visual styling in own-the-well-player.css.
- Adjust initial defaults:
  - BPM: bpm variable (default 75)
  - Volume: vol variable (default -6)

## License

No license file is currently included. Add one if you plan to distribute or accept contributions.
