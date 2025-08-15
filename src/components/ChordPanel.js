import React from 'react';
import './ChordPanel.css';
import { CHORDS } from '../utils/chords';

const ChordPanel = ({ 
  selectedChord, 
  onChordSelect, 
  chordInversion, 
  onInversionChange,
  onClear 
}) => {
  const chordCategories = {
    'Triads': ['major', 'minor', 'diminished', 'augmented'],
    '7th Chords': ['maj7', 'min7', 'dom7', 'dim7', 'min7b5'],
    'Extended': ['maj9', 'min9', 'dom9', 'maj11', 'min11', 'dom13']
  };

  const getChordDisplayName = (chordType) => {
    const chordNames = {
      'major': 'Major',
      'minor': 'Minor',
      'diminished': 'Dim',
      'augmented': 'Aug',
      'maj7': 'Maj7',
      'min7': 'Min7',
      'dom7': '7',
      'dim7': 'Dim7',
      'min7b5': 'Min7♭5',
      'maj9': 'Maj9',
      'min9': 'Min9',
      'dom9': '9',
      'maj11': 'Maj11',
      'min11': 'Min11',
      'dom13': '13'
    };
    return chordNames[chordType] || chordType;
  };

  const getMaxInversions = () => {
    if (!selectedChord || !CHORDS[selectedChord]) return 0;
    return CHORDS[selectedChord].length - 1;
  };

  return (
    <div className="chord-panel">
      <div className="panel-header">
        <h3>Chord Builder</h3>
        {selectedChord && (
          <button className="clear-btn" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      
      <div className="chord-categories">
        {Object.entries(chordCategories).map(([category, chords]) => (
          <div key={category} className="chord-category">
            <h4>{category}</h4>
            <div className="chord-buttons">
              {chords.map(chord => (
                <button
                  key={chord}
                  className={`chord-btn ${selectedChord === chord ? 'active' : ''}`}
                  onClick={() => onChordSelect(chord)}
                >
                  {getChordDisplayName(chord)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedChord && (
        <div className="inversions">
          <h4>Inversion</h4>
          <div className="inversion-buttons">
            <button
              className={`inversion-btn ${chordInversion === 0 ? 'active' : ''}`}
              onClick={() => onInversionChange(0)}
            >
              Root
            </button>
            {[...Array(getMaxInversions())].map((_, i) => (
              <button
                key={i + 1}
                className={`inversion-btn ${chordInversion === i + 1 ? 'active' : ''}`}
                onClick={() => onInversionChange(i + 1)}
              >
                {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="chord-info">
        {selectedChord ? (
          <>
            <p>Mode: <strong>Chord Building</strong></p>
            <p>Click any key to build a {getChordDisplayName(selectedChord)} chord</p>
          </>
        ) : (
          <>
            <p>Mode: <strong>Free Play</strong></p>
            <p>Click keys to select individual notes</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChordPanel;