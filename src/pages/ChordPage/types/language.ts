import { Theme } from "./themes";

export const lang = {
  US: {
    name: "US",
    Header: {
      tabs: {
        chord: "Chord",
        pentatonic: "Pentatonic",
        note: "Note",
        song: "Song",
        introduce: "Introduce",
      },
      theme: {
        dark: Theme.Dark.name.US,
        light: Theme.Light.name.US,
      },
      login: "Login",
    },
    SettingPart: {
      AllowRepeat: {
        Only: "Only",
        Repeated: "Repeated",
      },
      ChangingMode: { Single: "Observe", Multiple: "Display" },
      Content: {
        Custom: "Custom",
        TonicBased: "Tonic-Based",
        HarmonyBased: "Harmony-Based",
      },
      TonicTypeOption: {
        Basic: "Basic",
        BasicPassing: "Basic & Passing",
        Full: "Full",
      },
      HarmonyTypeOption: {
        Basic: "Basic",
        Advanced: "Advanced",
      },
      PlaceHolder: {
        chooseTone: "Choose a tone",
        chooseRing: "Choose a ring chord",
        chooseOption: "Choose an option",
        chooseNote: "Choose a note",
      },
    },
    ChordPart: {
      Tempo: "Tempo",
    },
    ListPart: {
      PlaceHolder: {
        chooseChord: "Choose a chord",
      },
    },
  },
  VN: {
    name: "VN",
    Header: {
      tabs: {
        chord: "Hợp âm",
        pentatonic: "Ngũ cung",
        note: "Nốt",
        song: "Bài hát",
        introduce: "Giới thiệu",
      },
      theme: {
        dark: Theme.Dark.name.VN,
        light: Theme.Light.name.VN,
      },
      login: "Đăng nhập",
    },
    SettingPart: {
      AllowRepeat: {
        Only: "Duy nhất",
        Repeated: "Lặp lại",
      },
      ChangingMode: { Single: "Dừng", Multiple: "Trình diễn" },
      Content: {
        Custom: "Tùy ý",
        TonicBased: "Theo chủ âm",
        HarmonyBased: "Theo hòa âm",
      },
      TonicTypeOption: {
        Basic: "Cơ bản",
        BasicPassing: "Trung bình",
        Full: "Tất cả",
      },
      HarmonyTypeOption: {
        Basic: "Cơ bản",
        Advanced: "Nâng cao",
      },
      PlaceHolder: {
        chooseTone: "Chọn một tông",
        chooseRing: "Chọn một vòng hợp âm",
        chooseOption: "Chọn một gợi ý",
        chooseNote: "Chọn một chủ âm",
      },
    },
    ChordPart: {
      Tempo: "Nhịp độ",
    },
    ListPart: {
      PlaceHolder: {
        chooseChord: "Chọn một hợp âm",
      },
    },
  },
};
