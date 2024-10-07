import { HarmonyType, TonicType } from "../types/types";

export const optionsRing: readonly any[] = [
  { value: "1564", label: "1564" },
  { value: "1645", label: "1645" },
  { value: "4321", label: "4321" },
  { value: "4251", label: "4251" },
  { value: "6251", label: "6251" },
  { value: "6415", label: "6415" },
  { value: "62514736", label: "62514736" },
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
  { value: TonicType.BasicPassing, label: "BasicPassing" },
  { value: TonicType.Full, label: TonicType.Full },
];
export const optionsHarmonyBased = [
  { value: HarmonyType.Basic, label: HarmonyType.Basic },
  { value: HarmonyType.Advanced, label: HarmonyType.Advanced },
];

export const optionChordSet = [
  { name: TonicType.Basic, set: ["", "m", "7"] },
  {
    name: TonicType.BasicPassing,
    set: ["", "m", "7", "m7", "Maj7", "sus2", "sus4", "b7m5"],
  },
  {
    name: TonicType.Full,
    set: ["", "m", "7", "m7", "sus2", "sus4", "b7m5", "9", "dim"],
  },
];
//add9 (sin chín): vui tươi, mạnh mẽ
//Maj7: buồn
//5: áp dụng với mọi hợp âm trưởng, thứ
//m7: buồn nhẹ nhàng hơn, không quá tang thương như hợp âm thứ gốc
//Ở bậc 5, nếu sau đó là bậc 1 thì nên chuyển thành hợp âm 7
//có 2 cách tạo passing chord cơ bản nhất: dùng walking bass (note giữa) và
//dominant (tìm bậc 5 của hợp âm tiếp theo, vì bậc 5 sinh ra để chuyển về bậc 1) => nâng cao lên: 2(của sau)-5 (main passing) -1 (sau)
//m7b5: giảm độ gắt cho hợp âm dim
//Chỉ bậc 5 về 1 mới chuyển thành 7 đc, áp dụng cho trưởng, thứ. Nên muốn dùng color chord 7 cho hợp âm X, nên xét hợp âm Y đằng sau làm chủ âm, xem X là bậc mấy của Y, nếu 5 thì rất nên chuyển thành 7.
export const optionColorChord = [
  {
    mode: "Ionian",
    list: [
      {
        degree: 1,
        option: ["", "sus2", "Maj7", ["sus4", ""], "5", "add9", "Maj9", "7"],
      },
      { degree: 2, option: ["m", "m7", "5"] },
      { degree: 3, option: ["m", "m7", "5"] },
      { degree: 4, option: ["", "sus2", "Maj7", "5", "add9", "Maj9"] },
      { degree: 5, option: ["", "7", ["sus4", ""], "sus2", "5", "13"] },
      { degree: 6, option: ["m", "m7", "5", "7"] },
      { degree: 7, option: ["dim", "m7b5"] },
    ],
  },
  //m7b5 thuong xai cho tone thu, co the chia doi o nhip voi bac V, dang [m7b5, ""]
  //Hop am dao bass, ap dung walking bass
  {
    mode: "Aeolian",
    list: [
      { degree: 1, option: ["m", ["sus4", ""], ["sus2", "m"], "7", "5", "m7"] }, //m
      { degree: 2, option: ["dim", "m7b5"] }, //dim
      { degree: 3, option: ["", "7", "5", "add9", "Maj9", "5"] }, //M
      { degree: 4, option: ["m", ["sus2", ""], "5", "m7"] }, //m
      { degree: 5, option: ["m", ["sus4", ""], "7", "5", "m7"] }, //m,M . Sus4 luon chuyen ve truong
      {
        degree: 6,
        option: ["", "m7", ["sus4", ""], "sus2", "5", "add9", "Maj9"],
      }, //M
      { degree: 7, option: ["", "7", "5", "add9", "Maj9"] }, //M
    ],
  },
];
