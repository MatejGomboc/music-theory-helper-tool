import React, { useState, useEffect } from 'react';
import './App.css';
import Piano from './components/Piano';
import ScaleSelector from './components/ScaleSelector';
import ChordPanel from './components/ChordPanel';
import Display from './components/Display';
import { SCALES } from './utils/scales';
import { getScaleNotes, getChordNotes } from './utils/musicTheory';

function App() {
  const [selectedScale, setSelectedScale] = useState('major');
  const [rootNote, setRootNote] = useState('C');
  const [customScale, setCustomScale] = useState([]);
  const [isCustomScale, setIsCustomScale] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedChord, setSelectedChord] = useState(null);
  const [chordInversion, setChordInversion] = useState(0);
  const [allowedNotes, setAllowedNotes] = useState([]);
  const [chordRootNote, setChordRootNote] = useState(null); // Track the original root note for chords

  // Calculate allowed notes based on selected scale
  useEffect(() => {
    let scaleIntervals;
    if (isCustomScale) {
      scaleIntervals = customScale;
    } else {
      scaleIntervals = SCALES[selectedScale];
    }
    
    if (scaleIntervals && scaleIntervals.length > 0) {
      const notes = getScaleNotes(rootNote, scaleIntervals);
      setAllowedNotes(notes);
      
      // Clear selected notes if they're not in the new scale
      setSelectedNotes(prev => {
        return prev.filter(note => {
          const noteName = note.slice(0, -1);
          return notes.includes(noteName);
        });
      });
      
      // Clear chord selection when scale changes
      setSelectedChord(null);
      setChordInversion(0);
      setChordRootNote(null);
    }
  }, [selectedScale, rootNote, customScale, isCustomScale]);

  const handlePianoKeyClick = (note) => {
    if (selectedChord) {
      // If a chord is selected, replace all notes with the chord
      const chordNotes = getChordNotes(note, selectedChord, chordInversion, allowedNotes);
      setSelectedNotes(chordNotes);
      setChordRootNote(note); // Store the original root note
    } else {
      // Toggle individual note
      setSelectedNotes(prev => {
        const noteIndex = prev.findIndex(n => n === note);
        if (noteIndex > -1) {
          return prev.filter(n => n !== note);
        } else {
          return [...prev, note];
        }
      });
      setChordRootNote(null); // Clear chord root when in free play mode
    }
  };

  const handleChordSelect = (chordType) => {
    setSelectedChord(chordType);
    setChordInversion(0);
    // Clear selected notes when chord mode is activated
    setSelectedNotes([]);
    setChordRootNote(null);
  };

  const handleInversionChange = (inversion) => {
    setChordInversion(inversion);
    if (selectedChord && chordRootNote) {
      // Recalculate chord with new inversion using the original root note
      const chordNotes = getChordNotes(chordRootNote, selectedChord, inversion, allowedNotes);
      setSelectedNotes(chordNotes);
    }
  };

  const clearSelection = () => {
    setSelectedNotes([]);
    setSelectedChord(null);
    setChordInversion(0);
    setChordRootNote(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Music Theory Helper</h1>
        <p>A practical calculator for scales and chords</p>
      </header>
      
      <div className="controls">
        <ScaleSelector
          selectedScale={selectedScale}
          setSelectedScale={setSelectedScale}
          rootNote={rootNote}
          setRootNote={setRootNote}
          customScale={customScale}
          setCustomScale={setCustomScale}
          isCustomScale={isCustomScale}
          setIsCustomScale={setIsCustomScale}
        />
      </div>

      <div className="main-content">
        <Piano
          selectedNotes={selectedNotes}
          allowedNotes={allowedNotes}
          onKeyClick={handlePianoKeyClick}
        />
        
        <div className="bottom-panels">
          <ChordPanel
            selectedChord={selectedChord}
            onChordSelect={handleChordSelect}
            chordInversion={chordInversion}
            onInversionChange={handleInversionChange}
            onClear={clearSelection}
          />
          
          <Display
            selectedNotes={selectedNotes}
            selectedChord={selectedChord}
            chordInversion={chordInversion}
            scale={isCustomScale ? 'Custom' : selectedScale}
            rootNote={rootNote}
            chordRootNote={chordRootNote}
          />
        </div>
      </div>
    </div>
  );
}

export default App;