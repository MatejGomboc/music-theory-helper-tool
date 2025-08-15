import React from 'react';
import './ScaleSelector.css';
import { SCALES } from '../utils/scales';

const ScaleSelector = ({
  selectedScale,
  setSelectedScale,
  rootNote,
  setRootNote,
  customScale,
  setCustomScale,
  isCustomScale,
  setIsCustomScale
}) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const intervals = [1, 2, 3, 4, 5, 6];

  const handleScaleChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomScale(true);
      setCustomScale([2, 2, 1, 2, 2, 2, 1]); // Default to major scale pattern
    } else {
      setIsCustomScale(false);
      setSelectedScale(value);
    }
  };

  const handleIntervalToggle = (index, value) => {
    const parsedValue = parseInt(value);
    
    // Validate interval value
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 6) {
      alert('Interval must be between 1 and 6 semitones');
      return;
    }
    
    const newCustomScale = [...customScale];
    newCustomScale[index] = parsedValue;
    
    // Check if total exceeds reasonable limit
    const total = newCustomScale.reduce((a, b) => a + b, 0);
    if (total > 24) {
      alert('Total intervals cannot exceed 24 semitones (2 octaves)');
      return;
    }
    
    setCustomScale(newCustomScale);
  };

  const addInterval = () => {
    // Limit the number of intervals to 12
    if (customScale.length >= 12) {
      alert('Cannot add more than 12 intervals in a scale');
      return;
    }
    
    // Check if adding would exceed limit
    const currentTotal = customScale.reduce((a, b) => a + b, 0);
    if (currentTotal >= 24) {
      alert('Cannot add more intervals - already at 2 octave limit');
      return;
    }
    
    setCustomScale([...customScale, 1]);
  };

  const removeInterval = (index) => {
    if (customScale.length > 1) {
      const newCustomScale = customScale.filter((_, i) => i !== index);
      setCustomScale(newCustomScale);
    } else {
      alert('A scale must have at least one interval');
    }
  };

  const getTotalSemitones = () => {
    return customScale.reduce((a, b) => a + b, 0);
  };

  return (
    <div className="scale-selector">
      <div className="selector-row">
        <div className="selector-group">
          <label>Root Note</label>
          <select value={rootNote} onChange={(e) => setRootNote(e.target.value)}>
            {notes.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>

        <div className="selector-group">
          <label>Scale Type</label>
          <select 
            value={isCustomScale ? 'custom' : selectedScale} 
            onChange={handleScaleChange}
          >
            <optgroup label="Common Scales">
              {Object.keys(SCALES).map(scale => (
                <option key={scale} value={scale}>
                  {scale.charAt(0).toUpperCase() + scale.slice(1).replace(/_/g, ' ')}
                </option>
              ))}
            </optgroup>
            <option value="custom">Custom Scale</option>
          </select>
        </div>
      </div>

      {isCustomScale && (
        <div className="custom-scale-builder">
          <label>Custom Scale Intervals (semitones)</label>
          <div className="interval-list">
            {customScale.map((interval, index) => (
              <div key={index} className="interval-item">
                <span>Step {index + 1}:</span>
                <select 
                  value={interval} 
                  onChange={(e) => handleIntervalToggle(index, e.target.value)}
                >
                  {intervals.map(int => (
                    <option key={int} value={int}>{int}</option>
                  ))}
                </select>
                <button 
                  className="remove-btn"
                  onClick={() => removeInterval(index)}
                  disabled={customScale.length <= 1}
                >
                  ×
                </button>
              </div>
            ))}
            {customScale.length < 12 && getTotalSemitones() < 24 && (
              <button className="add-interval-btn" onClick={addInterval}>
                + Add Interval
              </button>
            )}
          </div>
          <div className="interval-sum">
            Total semitones: {getTotalSemitones()}
            {getTotalSemitones() === 12 && 
              <span className="info"> (Exactly one octave)</span>
            }
            {getTotalSemitones() !== 12 && getTotalSemitones() < 12 &&
              <span className="warning"> (Less than an octave)</span>
            }
            {getTotalSemitones() > 12 && getTotalSemitones() <= 24 &&
              <span className="info"> (Spanning multiple octaves)</span>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleSelector;