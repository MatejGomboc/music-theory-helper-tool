import * as Tone from 'tone';

// Simple piano synth
let synth = null;

// Initialize the synth
export const initAudio = async () => {
  if (!synth) {
    await Tone.start();
    
    // Create a simple piano-like sound
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
    
    // Add a bit of reverb for nicer sound
    const reverb = new Tone.Reverb({
      decay: 2,
      wet: 0.2
    }).toDestination();
    
    synth.connect(reverb);
  }
};

// Play a single note
export const playNote = async (noteName, octave = 4) => {
  await initAudio();
  const note = `${noteName}${octave}`;
  synth.triggerAttackRelease(note, '8n');
};

// Play multiple notes (chord)
export const playChord = async (notes, octave = 4) => {
  await initAudio();
  const fullNotes = notes.map(note => `${note}${octave}`);
  synth.triggerAttackRelease(fullNotes, '2n');
};

// Play notes in sequence (arpeggio)
export const playArpeggio = async (notes, octave = 4) => {
  await initAudio();
  const now = Tone.now();
  notes.forEach((note, index) => {
    synth.triggerAttackRelease(`${note}${octave}`, '8n', now + index * 0.1);
  });
};

// Stop all sounds
export const stopAll = () => {
  if (synth) {
    synth.releaseAll();
  }
};

// Play a scale
export const playScale = async (notes, octave = 4, ascending = true) => {
  await initAudio();
  const now = Tone.now();
  const noteList = ascending ? notes : [...notes].reverse();
  
  noteList.forEach((note, index) => {
    synth.triggerAttackRelease(`${note}${octave}`, '8n', now + index * 0.15);
  });
};

// Get note from piano key index
export const getNoteFromKey = (keyIndex) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(keyIndex / 12) + 3; // Starting from C3
  const noteIndex = keyIndex % 12;
  return { note: notes[noteIndex], octave };
};

// Convert note to piano key index
export const getKeyIndex = (noteName, octave) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteIndex = notes.indexOf(noteName);
  if (noteIndex === -1) return -1;
  return (octave - 3) * 12 + noteIndex;
};
