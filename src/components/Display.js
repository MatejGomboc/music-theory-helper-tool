import React from 'react';
import './Display.css';

const Display = ({ selectedNotes, selectedChord, chordInversion, scale, rootNote, chordRootNote }) => {
  const noteColors = {
    'C': '#ff6b6b',
    'C#': '#cc5252',
    'D': '#ffa06b',
    'D#': '#cc8052',
    'E': '#ffd06b',
    'F': '#6bff6b',
    'F#': '#52cc52',
    'G': '#6bd0ff',
    'G#': '#52a3cc',
    'A': '#a06bff',
    'A#': '#8052cc',
    'B': '#ff6bd0'
  };

  const getChordName = () => {
    if (!selectedChord || !chordRootNote) return null;
    
    const rootNoteName = chordRootNote.slice(0, -1);
    const chordTypes = {
      'major': '',
      'minor': 'm',
      'diminished': 'dim',
      'augmented': 'aug',
      'maj7': 'maj7',
      'min7': 'm7',
      'dom7': '7',
      'dim7': 'dim7',
      'min7b5': 'm7♭5',
      'maj9': 'maj9',
      'min9': 'm9',
      'dom9': '9',
      'maj11': 'maj11',
      'min11': 'm11',
      'dom13': '13'
    };
    
    let chordName = rootNoteName + chordTypes[selectedChord];
    if (chordInversion > 0) {
      chordName += ` (${chordInversion}${chordInversion === 1 ? 'st' : chordInversion === 2 ? 'nd' : chordInversion === 3 ? 'rd' : 'th'} inv.)`;
    }
    
    return chordName;
  };

  const isMinorChord = () => {
    return selectedChord && (
      selectedChord.includes('min') || 
      selectedChord.includes('dim')
    );
  };

  return (
    <div className="display-panel">
      <div className="panel-header">
        <h3>Note Display</h3>
        <div className="scale-info">
          {rootNote} {scale.charAt(0).toUpperCase() + scale.slice(1).replace(/_/g, ' ')}
        </div>
      </div>
      
      <div className="notes-display">
        {selectedNotes.length > 0 ? (
          <>
            <div className="note-bars">
              {selectedNotes.map((note, index) => {
                const noteName = note.slice(0, -1);
                const octave = note.slice(-1);
                const isMinor = isMinorChord();
                
                return (
                  <div 
                    key={index} 
                    className={`note-bar ${isMinor ? 'minor' : 'major'}`}
                    style={{
                      backgroundColor: noteColors[noteName],
                      opacity: isMinor ? 0.7 : 0.9
                    }}
                  >
                    <span className="note-name">{noteName}</span>
                    <span className="note-octave">{octave}</span>
                  </div>
                );
              })}
            </div>
            
            {getChordName() && (
              <div className="chord-name">
                <strong>Chord:</strong> {getChordName()}
              </div>
            )}
            
            <div className="note-list">
              <strong>Notes:</strong> {selectedNotes.map(n => n.slice(0, -1)).join(' - ')}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>No notes selected</p>
            <p className="hint">Click on the piano keys to select notes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;