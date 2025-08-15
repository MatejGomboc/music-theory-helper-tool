# Music Theory Helper Tool

A practical web-based calculator for working with musical scales and chords. Like a unit converter but for music theory.

## Features

- **Scale Explorer**: Select from 20+ predefined scales or create custom scales
- **Interactive Piano**: 4 octaves (C3-C6) with audio feedback
- **Smart Note Filtering**: Automatically greys out notes not in the selected scale
- **Chord Builder**: Build triads, 7th chords, and extended chords with inversions
- **Visual Feedback**: Color-coded note display showing major/minor character
- **Audio Playback**: Hear every note you click using Tone.js synthesis

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MatejGomboc/music-theory-helper-tool.git
cd music-theory-helper-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

1. **Select a Scale**: Choose a root note and scale type from the dropdowns
2. **Play Notes**: Click on the piano keys - only scale notes are clickable
3. **Build Chords**: Select a chord type to enter chord mode, then click any root note
4. **Inversions**: Use the inversion buttons to rearrange chord voicings
5. **Visual Display**: See your selected notes as color-coded bars

## Technology Stack

- **React**: UI framework
- **Tone.js**: Audio synthesis and playback
- **CSS**: Clean, functional styling

## Available Scales

- Major/Minor (Natural, Harmonic, Melodic)
- All 7 Church Modes
- Pentatonic (Major/Minor)
- Blues
- Jazz (Bebop Major/Minor)
- World (Hungarian, Japanese, Egyptian, Persian)
- Experimental (Whole Tone, Chromatic, Diminished, Augmented)
- Custom scale builder

## Available Chords

- Triads: Major, Minor, Diminished, Augmented
- 7th Chords: Maj7, Min7, Dom7, Dim7, Min7♭5
- Extended: 9th, 11th, 13th chords

## License

MIT

## Author

Matej Gomboc