import Note from "./lib/note.js";
import Chord from "./lib/chord.js";
import Scale from "./lib/scale.js";
import KeySignature from "./lib/key_signature.js";
import Interval from "./lib/interval.js";
import MidiListener from "./lib/midi_listener.js";

const midi_range = { min: 0, max: 127 };
const piano_range = { min: 21, max: 108 };
const guitar_range = { min: 40, max: 84 };

let all_notes = [];
let all_key_signatures = [];

const init = () => {
  const build_all_notes = () => {
    const ALL_NOTE_NAME_TYPES = Note.ALL_NOTE_NAME_TYPES;
    let midi_value = 0;
    const octaves = 9;
    for (let octave = -1; octave <= octaves; octave++) {
      for (let j = 0; j < ALL_NOTE_NAME_TYPES.length; j++) {
        const note_name = ALL_NOTE_NAME_TYPES[j].sharp_name;
        const note = new Note(ALL_NOTE_NAME_TYPES[j], midi_value, octave);

        all_notes.push(note);
        midi_value++;

        if (midi_value > midi_range.max) break;
      }
    }
  };
  build_all_notes();

  const build_all_key_signatures = () => {
    const keySignatureTypes = KeySignature.TYPE;
    for (const key in keySignatureTypes) {
      const value = keySignatureTypes[key];
      all_key_signatures.push(new KeySignature(value));
    }
  };
  build_all_key_signatures();
};

const changeNoteColors = (color = "#00f") => {
  for (let i = 0; i <= 127; i++) {
    all_notes[i].note_name.color = color;
  }
};

export {
  init,
  Note,
  Chord,
  Scale,
  KeySignature,
  Interval,
  MidiListener,
  all_notes,
  all_key_signatures,
  piano_range,
  guitar_range,
  changeNoteColors,
};
