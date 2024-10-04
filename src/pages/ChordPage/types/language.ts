import WelcomePage from "../../WelcomePage/WelcomePage";
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
    WelcomePage: {
      letstart: "LET'S START",
      welcome: "Welcome back to Móc's",
      intro:
        "Whether you're a beginner or a seasoned guitarist, our platform is here to help you on your musical journey. Dive into personalized practice routines, interactive chord charts, and progress tracking that adapts to your skill level. With a variety of resources at your fingertips, you'll be mastering your favorite songs and techniques in no time.",
      feature: {
        label: "Key Features",
        chord: "Interactive Chord Diagrams",
        pentatonic: "Pentatonic Practice",
        note: "Full Guitar note remember",
      },
    },
    Footer: {
      label: "Móc's - Practice to play guitar well",
      content: [
        {
          label: "About us",
          item: ["Introduce", "Author", "Guilde"],
        },
        {
          label: "Document",
          item: [
            "Basic music theory",
            "Advanced music theory",
            "Youtube Learn",
            "Guitar cool girl",
          ],
        },
        {
          label: "Contact",
          item: ["Bug report", "Content recommend", "Contact me", "GOH"],
        },
      ],
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
    WelcomePage: {
      letstart: "BẮT ĐẦU",
      welcome: "Chào mừng bạn đã quay lại cùng Móc's",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      feature: {
        label: "Chế độ chính",
        chord: "Luyện Hợp âm",
        pentatonic: "Luyện Ngũ cung",
        note: "Luyện Nốt",
      },
    },
    Footer: {
      label: "Móc's - Tập luyện để giỏi guitar",
      content: [
        {
          label: "Về Móc's",
          item: ["Giới thiệu", "Tác giả", "Hướng dẫn sử dụng"],
        },
        {
          label: "Tài liệu",
          item: [
            "Nhạc lý cơ bản",
            "Nhạc lý nâng cao",
            "Học đàn qua Youtube",
            "Gái xinh đánh guitar",
          ],
        },
        {
          label: "Liên hệ",
          item: ["Báo cáo bugs", "Đóng góp nội dung", "Liên hệ", "GOH"],
        },
      ],
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
