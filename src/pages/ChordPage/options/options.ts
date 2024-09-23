import { HarmonyType, TonicType } from "../types/types";

export const optionsRing = [
  { value: "6251", label: "6251" },
  { value: "62514736", label: "62514736" },
  { value: "6415", label: "6415" },
  { value: "1564", label: "1564" },
  { value: "4321", label: "4321" },
  { value: "63456343", label: "63456343" },
  { value: "15634125", label: "15634125 (Canon)" },
];

export const optionsTone = [
  { value: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"], label: "C" },
  { value: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"], label: "D" },
  { value: ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"], label: "E" },
  { value: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"], label: "F" },
  { value: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"], label: "G" },
  { value: ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"], label: "A" },
  { value: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"], label: "B" },
  { value: ["Cm", "Ddim", "D#", "Fm", "Gm", "Ab", "Bb"], label: "Cm" },
  { value: ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"], label: "Dm" },
  { value: ["Em", "F#dim", "G", "Am", "Bm", "C", "D"], label: "Em" },
  { value: ["Fm", "Gdim", "G#", "Bbm", "Cm", "Db", "Eb"], label: "Fm" },
  { value: ["Gm", "Adim", "A#", "Cm", "Dm", "Eb", "F"], label: "Gm" },
  { value: ["Am", "Bdim", "C", "Dm", "Em", "F", "G"], label: "Am" },
  { value: ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"], label: "Bm" },
  { value: ["C#", "D#m", "Fm", "F#", "G#", "A#m", "Cdim"], label: "C#" },
  { value: ["D#", "Fm", "Gm", "G#", "A#", "Cm", "Ddim"], label: "D#" },
  { value: ["F#", "G#m", "A#m", "B", "C#", "D#m", "Fdim"], label: "F#" },
  { value: ["G#", "A#m", "Cm", "C#", "D#", "Fm", "Gdim"], label: "G#" },
  { value: ["A#", "Cm", "Dm", "D#", "F", "Gm", "Adim"], label: "A#" },
  { value: ["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"], label: "C#m" },
  { value: ["D#m", "Fdim", "F#", "G#m", "A#m", "B", "C#"], label: "D#m" },
  { value: ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"], label: "F#m" },
  { value: ["G#m", "A#dim", "B", "C#m", "D#m", "E", "F#"], label: "G#m" },
  { value: ["A#m", "Cdim", "C#", "D#m", "Fm", "F#", "G#"], label: "A#m" },
];

export const optionsNote = [
  { value: "C", label: "C" },
  { value: "C#", label: "C#" },
  { value: "D", label: "D" },
  { value: "D#", label: "D#" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "F#", label: "F#" },
  { value: "G", label: "G" },
  { value: "G#", label: "G#" },
  { value: "A", label: "A" },
  { value: "A#", label: "A#" },
  { value: "B", label: "B" },
];

export const optionsTonicBased = [
  { value: TonicType.Basic, label: TonicType.Basic },
  { value: TonicType.BasicPassing, label: TonicType.BasicPassing },
  { value: TonicType.Full, label: TonicType.Full },
];
export const optionsHarmonyBased = [
  { value: HarmonyType.Basic, label: HarmonyType.Basic },
  { value: HarmonyType.Advanced, label: HarmonyType.Advanced },
];

export const ChordSet = [
  { name: TonicType.Basic, set: ["", "m", "7"] },
  {
    name: TonicType.BasicPassing,
    set: ["", "m", "7", "m7", "major7", "sus2", "sus4", "b7m5"],
  },
  {
    name: TonicType.Full,
    set: ["", "m", "7", "m7", "sus2", "sus4", "b7m5", "9", "dim"],
  },
];
