const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const getNoteIndex = (note) => {
  const noteName = note.replace(/[0-9]/g, '');
  return noteNames.indexOf(noteName);
};

export const getNoteName = (index) => {
  return noteNames[index % 12];
};

export const getScaleNotes = (rootNote, intervals) => {
  const notes = [rootNote];
  let currentIndex = getNoteIndex(rootNote);
  
  for (let interval of intervals) {
    currentIndex = (currentIndex + interval) % 12;
    notes.push(getNoteName(currentIndex));
  }
  
  // Remove the last note if it's the same as the root (octave)
  if (notes[notes.length - 1] === rootNote) {
    notes.pop();
  }
  
  return notes;
};

export const getChordNotes = (rootNote, chordType, inversion, allowedNotes) => {
  const { CHORDS } = require('./chords');
  const intervals = CHORDS[chordType];
  if (!intervals) return [];
  
  const rootNoteName = rootNote.slice(0, -1);
  const octave = parseInt(rootNote.slice(-1));
  const rootIndex = getNoteIndex(rootNoteName);
  
  let chordNotes = [];
  
  // Build the chord notes
  for (let i = 0; i < intervals.length; i++) {
    const noteIndex = (rootIndex + intervals[i]) % 12;
    const noteName = getNoteName(noteIndex);
    
    // Calculate which octave this note should be in
    let noteOctave = octave;
    if (rootIndex + intervals[i] >= 12) {
      noteOctave = octave + 1;
    }
    if (rootIndex + intervals[i] >= 24) {
      noteOctave = octave + 2;
    }
    
    // Only add note if it's in the allowed scale
    if (allowedNotes.includes(noteName)) {
      chordNotes.push(`${noteName}${noteOctave}`);
    }
  }
  
  // Apply inversion
  if (inversion > 0 && chordNotes.length > inversion) {
    for (let i = 0; i < inversion; i++) {
      const note = chordNotes.shift();
      const noteName = note.slice(0, -1);
      const noteOctave = parseInt(note.slice(-1));
      chordNotes.push(`${noteName}${noteOctave + 1}`);
    }
  }
  
  return chordNotes;
};