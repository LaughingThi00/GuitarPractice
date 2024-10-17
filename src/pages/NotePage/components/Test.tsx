import React, { useEffect } from "react";
import fretboardBuilder from "./../../../notebuild/fretboard";
import * as musicKit from "./../../../notebuild/music-model-kit";

const Test = () => {
  useEffect(() => {
    musicKit.init();

    const fretboardView = fretboardBuilder({
      id: "cumeo1",
      width: 1000,
      onClick: function (note, isOn) {
        if (isOn) {
          fretboardView.drawNote(note);
        } else {
          fretboardView.clearNote(note);
        }
      },
      hover: true,
      showLabels: true,
      darkMode: false,
    });

    // // draw a note
    // let midiValue = 45; // A2
    // let note = musicKit.all_notes[midiValue];
    // fretboardView.drawNote(note);

// // draw a chord
// let midiValue = 60 // C4 = middle C
// let note = musicKit.all_notes[midiValue];
// let chord = new musicKit.Chord(note, musicKit.Chord.TYPE.minor);
// fretboardView.drawChord(chord);

// // draw a scale
// let midiValue = 62 // D4
// let note = musicKit.all_notes[midiValue];
// let scale = new musicKit.Scale(note, musicKit.Scale.TYPE.Aeolian); // Dm scale
// fretboardView.drawScale(scale);


    // clear all drawings
    fretboardView.clear();

    // add a midi listener
    new musicKit.MidiListener(
      function (midiValue, channel, velocity) {
        // note on
        let note = musicKit.all_notes[midiValue];
        fretboardView.drawNote(note);
      },
      function (midiValue, channel, velocity) {
        // note off
        let note = musicKit.all_notes[midiValue];
        fretboardView.clearNote(note);
      }
    );
  }, []); // useEffect runs once after the component mounts

  return <div id="cumeo1"></div>;
};

export default Test;
