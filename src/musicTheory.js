// Note mappings
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Generate all notes from C3 to C6
export const generateNotes = () => {
  const notes = [];
  for (let octave = 3; octave <= 6; octave++) {
    for (let i = 0; i < NOTE_NAMES.length; i++) {
      if (octave === 6 && i > 0) break; // Stop at C6
      notes.push({
        name: NOTE_NAMES[i],
        octave,
        midi: (octave + 1) * 12 + i, // MIDI note number
        frequency: 440 * Math.pow(2, ((octave + 1) * 12 + i - 69) / 12)
      });
    }
  }
  return notes;
};

// Scale definitions (intervals from root)
export const SCALES = {
  'Major': [0, 2, 4, 5, 7, 9, 11],
  'Natural Minor': [0, 2, 3, 5, 7, 8, 10],
  'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
  'Melodic Minor': [0, 2, 3, 5, 7, 9, 11],
  'Dorian': [0, 2, 3, 5, 7, 9, 10],
  'Phrygian': [0, 1, 3, 5, 7, 8, 10],
  'Lydian': [0, 2, 4, 6, 7, 9, 11],
  'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'Aeolian': [0, 2, 3, 5, 7, 8, 10],
  'Locrian': [0, 1, 3, 5, 6, 8, 10],
  'Blues': [0, 3, 5, 6, 7, 10],
  'Pentatonic Major': [0, 2, 4, 7, 9],
  'Pentatonic Minor': [0, 3, 5, 7, 10],
  'Chromatic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  'Whole Tone': [0, 2, 4, 6, 8, 10],
  'Diminished': [0, 2, 3, 5, 6, 8, 9, 11],
  'Custom': [] // Will be filled by user
};

// Chord definitions (intervals from root)
export const CHORDS = {
  // Triads
  'Major': [0, 4, 7],
  'Minor': [0, 3, 7],
  'Diminished': [0, 3, 6],
  'Augmented': [0, 4, 8],
  'Sus2': [0, 2, 7],
  'Sus4': [0, 5, 7],
  
  // 7th chords
  'Major 7': [0, 4, 7, 11],
  'Minor 7': [0, 3, 7, 10],
  'Dominant 7': [0, 4, 7, 10],
  'Half-Diminished 7': [0, 3, 6, 10],
  'Diminished 7': [0, 3, 6, 9],
  'Minor Major 7': [0, 3, 7, 11],
  
  // Extended chords
  'Major 9': [0, 4, 7, 11, 14],
  'Minor 9': [0, 3, 7, 10, 14],
  'Dominant 9': [0, 4, 7, 10, 14],
  'Add9': [0, 4, 7, 14],
  'Minor Add9': [0, 3, 7, 14],
  
  // 6th chords
  'Major 6': [0, 4, 7, 9],
  'Minor 6': [0, 3, 7, 9],
  
  // Other
  'Power Chord': [0, 7],
  'Major 11': [0, 4, 7, 11, 14, 17],
  'Minor 11': [0, 3, 7, 10, 14, 17],
  'Major 13': [0, 4, 7, 11, 14, 17, 21],
  'Minor 13': [0, 3, 7, 10, 14, 17, 21]
};

// Get notes in a scale
export const getScaleNotes = (rootNote, scaleType) => {
  const rootIndex = NOTE_NAMES.indexOf(rootNote);
  if (rootIndex === -1 || !SCALES[scaleType]) return [];
  
  const intervals = SCALES[scaleType];
  return intervals.map(interval => NOTE_NAMES[(rootIndex + interval) % 12]);
};

// Get notes in a chord
export const getChordNotes = (rootNote, chordType) => {
  const rootIndex = NOTE_NAMES.indexOf(rootNote);
  if (rootIndex === -1 || !CHORDS[chordType]) return [];
  
  const intervals = CHORDS[chordType];
  return intervals.map(interval => NOTE_NAMES[(rootIndex + interval) % 12]);
};

// Get chord inversions
export const getInversion = (notes, inversionNumber) => {
  if (!notes || notes.length === 0) return notes;
  
  const rotated = [...notes];
  for (let i = 0; i < inversionNumber; i++) {
    rotated.push(rotated.shift());
  }
  return rotated;
};

// Check if a note is in the current scale
export const isNoteInScale = (note, scaleNotes) => {
  return scaleNotes.includes(note);
};

// Get chord quality (major/minor/diminished/augmented)
export const getChordQuality = (chordType) => {
  if (chordType.toLowerCase().includes('minor') || chordType.toLowerCase().includes('dim')) {
    return 'minor';
  }
  if (chordType.toLowerCase().includes('aug')) {
    return 'augmented';
  }
  if (chordType.toLowerCase().includes('sus')) {
    return 'suspended';
  }
  return 'major';
};
