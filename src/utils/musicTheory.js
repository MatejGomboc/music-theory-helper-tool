import { CHORDS } from './chords';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const getNoteIndex = (note) => {
  const noteName = note.replace(/[0-9]/g, '');
  const index = noteNames.indexOf(noteName);
  if (index === -1) {
    console.error(`Invalid note name: ${noteName}`);
    return 0; // Return default instead of crashing
  }
  return index;
};

export const getNoteName = (index) => {
  // Ensure we always get a valid note
  const normalizedIndex = ((index % 12) + 12) % 12;
  return noteNames[normalizedIndex];
};

export const getScaleNotes = (rootNote, intervals) => {
  if (!intervals || intervals.length === 0) {
    return [rootNote];
  }
  
  const notes = [rootNote];
  let currentIndex = getNoteIndex(rootNote);
  
  for (let interval of intervals) {
    currentIndex = (currentIndex + interval) % 12;
    notes.push(getNoteName(currentIndex));
  }
  
  // Remove the last note if it's the same as the root (octave)
  // Fixed: Compare only note names without octave numbers
  const lastNote = notes[notes.length - 1];
  const rootNoteName = rootNote.replace(/[0-9]/g, '');
  if (lastNote === rootNoteName) {
    notes.pop();
  }
  
  return notes;
};

export const getChordNotes = (rootNote, chordType, inversion, allowedNotes) => {
  const intervals = CHORDS[chordType];
  if (!intervals || intervals.length === 0) return [];
  
  const rootNoteName = rootNote.slice(0, -1);
  const octave = parseInt(rootNote.slice(-1));
  
  // Validate octave
  if (isNaN(octave) || octave < 0 || octave > 8) {
    console.error(`Invalid octave: ${octave}`);
    return [];
  }
  
  const rootIndex = getNoteIndex(rootNoteName);
  
  let chordNotes = [];
  let notePositions = []; // Track original positions for proper inversions
  
  // Build the chord notes
  for (let i = 0; i < intervals.length; i++) {
    const noteIndex = (rootIndex + intervals[i]) % 12;
    const noteName = getNoteName(noteIndex);
    
    // Calculate which octave this note should be in
    let noteOctave = octave;
    const totalSemitones = rootIndex + intervals[i];
    
    if (totalSemitones >= 12 && totalSemitones < 24) {
      noteOctave = Math.min(octave + 1, 8);
    } else if (totalSemitones >= 24) {
      noteOctave = Math.min(octave + 2, 8);
    }
    
    // Only add note if it's in the allowed scale
    if (allowedNotes.includes(noteName)) {
      const fullNote = `${noteName}${noteOctave}`;
      chordNotes.push(fullNote);
      notePositions.push(i); // Track which interval this note represents
    }
  }
  
  // Apply inversion with better octave handling
  if (inversion > 0 && chordNotes.length > inversion) {
    // Validate inversion doesn't exceed chord size
    const maxInversion = chordNotes.length - 1;
    const actualInversion = Math.min(inversion, maxInversion);
    
    for (let i = 0; i < actualInversion; i++) {
      const note = chordNotes.shift();
      const noteName = note.slice(0, -1);
      const noteOctave = parseInt(note.slice(-1));
      
      // Calculate the new octave for the inverted note
      let newOctave = noteOctave + 1;
      
      // Get the highest octave in the remaining chord
      const highestOctave = Math.max(...chordNotes.map(n => parseInt(n.slice(-1))));
      
      // Smart octave adjustment to keep inversions playable
      if (highestOctave >= 6) {
        newOctave = Math.min(newOctave, 7);
      } else if (highestOctave >= 7) {
        // For very high chords, might need to wrap around to lower octave
        newOctave = Math.max(noteOctave, 4);
      }
      
      // Ensure we don't exceed the maximum octave
      newOctave = Math.min(newOctave, 8);
      
      const invertedNote = `${noteName}${newOctave}`;
      chordNotes.push(invertedNote);
    }
  }
  
  return chordNotes;
};