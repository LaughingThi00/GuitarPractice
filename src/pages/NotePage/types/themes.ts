export const Theme = {
  Dark: {
    value: "Dark",
    name: {
      VN: "Màn đêm",
      US: "Dark Mode",
    },
    Background: "#697565",
    Logo: "Dark-Logo",
    ColorPath: [
      "Dark-ColorPath-First",
      "Dark-ColorPath-Second",
      "Dark-ColorPath-Third",
    ],
    Button: { On: "Dark-Button-On", Off: "Dark-Button-Off" },
    Header: "Dark-Header",
    Footer: "Dark-Footer",

    ChordPage: {
      SettingPart: { Slider: { Pointer: "black" } },
      ChordPart: {},
      ListPart: {
        ChordSelect: {
          mainColor: "#6A9C89",
          secondColor: "#E9EFEC",
        },
        ChordItem: {
          normal: "Dark-ChordPage-SettingPart-ChordItem-showing",
          chosen: "Dark-ChordPage-SettingPart-ChordItem-chosen",
        },
      },
    },
  },
  Light: {
    value: "Light",

    name: { VN: "Mặt trời", US: "Light Mode" },
    Logo: "Light-Logo",
    Background: "#faf6ed",

    ColorPath: [
      "Light-ColorPath-First",
      "Light-ColorPath-Second",
      "Light-ColorPath-Third",
    ],

    Button: { On: "Light-Button-On", Off: "Light-Button-Off" },
    Header: "Light-Header",
    Footer: "Light-Footer",

    ChordPage: {
      SettingPart: { Slider: { Pointer: "orange" } },
      ChordPart: {},
      ListPart: {
        ChordSelect: {
          mainColor: "#f8f398",
          secondColor: "white",
        },
        ChordItem: {
          normal: "Light-ChordPage-SettingPart-ChordItem-showing",
          chosen: "Light-ChordPage-SettingPart-ChordItem-chosen",
        },
      },
    },
    Colorful: {},
  },
};
