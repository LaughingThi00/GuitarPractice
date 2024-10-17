import Color from "https://colorjs.io/dist/color.js";
import log from "./../../log";

class Note {
  constructor(note_name, midi_value, octave) {
    this.note_name = note_name;
    this.midi_value = midi_value;
    this.octave = octave;
    this.frequency = this.getEqualTemperedFrequency();

    if (!this.isWithinRange({ min: 0, max: 127 })) {
      log.e("can only create notes with midi values between 0 and 127");
    }
  }

  toString() {
    return `NOTE: ${this.note_name.type} ${this.octave} ${this.midi_value} ${this.frequency}`;
  }

  getEqualTemperedFrequency() {
    return 440 * Math.pow(2, (this.midi_value - 69) / 12);
  }

  isWithinRange(range) {
    return this.midi_value >= range.min && this.midi_value <= range.max;
  }

  static getRandom(all_notes, range) {
    const randomInteger = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    return all_notes[randomInteger(range.min, range.max)];
  }
}

Note.Name = class {
  static TYPE = Object.freeze({
    C: "C",
    C_sharp: "C# / Db",
    D: "D",
    D_sharp: "D# / Eb",
    E: "E",
    F: "F",
    F_sharp: "F# / Gb",
    G: "G",
    G_sharp: "G# / Ab",
    A: "A",
    A_sharp: "A# / Bb",
    B: "B",
  });

  constructor(type) {
    const get_associated_midi_values = (row) => {
      const base_array = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
      return base_array.reduce((acc, value) => {
        const midi_value = value + row;
        if (midi_value <= 127) acc.push(midi_value);
        return acc;
      }, []);
    };

    this.type = type;
    switch (type) {
      case Note.Name.TYPE.C:
        this.is_sharp_or_flat = false;
        this.sharp_name = this.type;
        this.flat_name = this.type;
        this.file_name = ["audio/notes/C.mp3"];
        this.color = new Color("#77CDFF");
        this.associated_midi_values = get_associated_midi_values(0);
        break;
      case Note.Name.TYPE.C_sharp:
        this.is_sharp_or_flat = true;
        this.sharp_name = "C#";
        this.flat_name = "Db";
        this.file_name = [
          "audio/notes/C_sharp.mp3",
          "audio/notes/or.mp3",
          "audio/notes/D_flat.mp3",
        ];
        this.color = new Color("#EC8305");
        this.associated_midi_values = get_associated_midi_values(1);
        break;
      case Note.Name.TYPE.D:
        this.is_sharp_or_flat = false;
        this.sharp_name = this.type;
        this.flat_name = this.type;
        this.file_name = ["audio/notes/D.mp3"];
        this.color = new Color("#DAF7A6");
        this.associated_midi_values = get_associated_midi_values(2);
        break;
      case Note.Name.TYPE.D_sharp:
        this.is_sharp_or_flat = true;
        this.sharp_name = "D#";
        this.flat_name = "Eb";
        this.file_name = [
          "audio/notes/D_sharp.mp3",
          "audio/notes/or.mp3",
          "audio/notes/E_flat.mp3",
        ];
        this.color = new Color("#FF5733");
        this.associated_midi_values = get_associated_midi_values(3);
        break;
      case Note.Name.TYPE.E:
        this.is_sharp_or_flat = false;
        this.sharp_name = this.type;
        this.flat_name = this.type;
        this.file_name = ["audio/notes/E.mp3"];
        this.color = new Color("#33FF57");
        this.associated_midi_values = get_associated_midi_values(4);
        break;
      case Note.Name.TYPE.F:
        this.is_sharp_or_flat = false;
        this.sharp_name = this.type;
        this.flat_name = this.type;
        this.file_name = ["audio/notes/F.mp3"];
        this.color = new Color("#33FFF3");
        this.associated_midi_values = get_associated_midi_values(5);
        break;
      case Note.Name.TYPE.F_sharp:
        this.is_sharp_or_flat = true;
        this.sharp_name = "F#";
        this.flat_name = "Gb";
        this.file_name = [
          "audio/notes/F_sharp.mp3",
          "audio/notes/or.mp3",
          "audio/notes/G_flat.mp3",
        ];
        this.color = new Color("#3380FF");
        this.associated_midi_values = get_associated_midi_values(6);
        break;
      case Note.Name.TYPE.G:
        this.is_sharp_or_flat = false;
        this.sharp_name = this.type;
        this.flat_name = this.type;
        this.file_name = ["audio/notes/G.mp3"];
        this.color = new Color("#5733FF");
        this.associated_midi_values = get_associated_midi_values(7);
        break;
      case Note.Name.TYPE.G_sharp:
        this.is_sharp_or_flat = true;
        this.sharp_name = "G#";
        this.flat_name = "Ab";
        this.file_name = [
          "audio/notes/G_sharp.mp3",
          "audio/notes/or.mp3",
          "audio/notes/A_flat.mp3",
        ];
        this.color = new Color("#FF33A1");
        this.associated_midi_values = get_associated_midi_values(8);
        break;
      case Note.Name.TYPE.A:
        this.is_sharp_or_flat = false;
        this.sharp_name = this.type;
        this.flat_name = this.type;
        this.file_name = ["audio/notes/A.mp3"];
        this.color = new Color("#FF3388");
        this.associated_midi_values = get_associated_midi_values(9);
        break;
      case Note.Name.TYPE.A_sharp:
        this.is_sharp_or_flat = true;
        this.sharp_name = "A#";
        this.flat_name = "Bb";
        this.file_name = [
          "audio/notes/A_sharp.mp3",
          "audio/notes/or.mp3",
          "audio/notes/B_flat.mp3",
        ];
        this.color = new Color("#FF8C33");
        this.associated_midi_values = get_associated_midi_values(10);
        break;
      case Note.Name.TYPE.B:
        this.is_sharp_or_flat = false;
        this.sharp_name = this.type;
        this.flat_name = this.type;
        this.file_name = ["audio/notes/B.mp3"];
        this.color = new Color("#FF33F6");
        this.associated_midi_values = get_associated_midi_values(11);
        break;
    }
  }
};

Note.ALL_NOTE_NAME_TYPES = [
  new Note.Name(Note.Name.TYPE.C),
  new Note.Name(Note.Name.TYPE.C_sharp),
  new Note.Name(Note.Name.TYPE.D),
  new Note.Name(Note.Name.TYPE.D_sharp),
  new Note.Name(Note.Name.TYPE.E),
  new Note.Name(Note.Name.TYPE.F),
  new Note.Name(Note.Name.TYPE.F_sharp),
  new Note.Name(Note.Name.TYPE.G),
  new Note.Name(Note.Name.TYPE.G_sharp),
  new Note.Name(Note.Name.TYPE.A),
  new Note.Name(Note.Name.TYPE.A_sharp),
  new Note.Name(Note.Name.TYPE.B),
];

export default Note;
