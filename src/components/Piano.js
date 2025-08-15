import React, { useEffect, useRef } from 'react';
import './Piano.css';
import * as Tone from 'tone';

const Piano = ({ selectedNotes, allowedNotes, onKeyClick }) => {
  const synthRef = useRef(null);
  const octaves = [3, 4, 5, 6];
  const initErrorRef = useRef(false);
  
  // Initialize Tone.js synth with error handling
  useEffect(() => {
    try {
      synthRef.current = new Tone.PolySynth(Tone.Synth, {
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
      
      initErrorRef.current = false;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      initErrorRef.current = true;
    }
    
    return () => {
      // Safely dispose of the synth
      if (synthRef.current) {
        try {
          synthRef.current.dispose();
        } catch (error) {
          console.error('Error disposing synth:', error);
        }
      }
    };
  }, []);

  const playNote = async (note) => {
    if (synthRef.current && !initErrorRef.current) {
      try {
        await Tone.start();
        synthRef.current.triggerAttackRelease(note, '8n');
      } catch (error) {
        console.error('Failed to play note:', error);
        // Don't block the UI if audio fails
      }
    }
  };

  const handleKeyClick = (note) => {
    playNote(note);
    onKeyClick(note);
  };

  const isBlackKey = (noteName) => {
    return noteName.includes('#');
  };

  const isNoteAllowed = (note) => {
    const noteName = note.slice(0, -1);
    return allowedNotes.includes(noteName);
  };

  const isNoteSelected = (note) => {
    return selectedNotes.includes(note);
  };

  const renderKey = (note, index) => {
    const isBlack = isBlackKey(note);
    const isAllowed = isNoteAllowed(note);
    const isSelected = isNoteSelected(note);
    
    const className = `
      piano-key 
      ${isBlack ? 'black-key' : 'white-key'}
      ${!isAllowed ? 'disabled' : ''}
      ${isSelected ? 'selected' : ''}
    `;
    
    return (
      <div
        key={`${note}-${index}`}
        className={className}
        onClick={() => isAllowed && handleKeyClick(note)}
        data-note={note}
      >
        <span className="note-label">
          {note.slice(0, -1)}
          <sub>{note.slice(-1)}</sub>
        </span>
      </div>
    );
  };

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div className="piano-container">
      <div className="piano">
        {octaves.map(octave => (
          <div key={octave} className="octave">
            {noteNames.map((note, index) => 
              renderKey(`${note}${octave}`, `${octave}-${index}`)
            )}
          </div>
        ))}
      </div>
      {initErrorRef.current && (
        <div className="audio-warning">
          Audio playback unavailable (visual mode only)
        </div>
      )}
    </div>
  );
};

export default Piano;