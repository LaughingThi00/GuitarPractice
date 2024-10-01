import ChordPart from "./components/ChordPart";
import ListPart from "./components/ListPart";
import SettingPart from "./components/SettingPart";
import { ChordProvider } from "./provider/ChordProvider";

const ChordPage = () => {
  return (
    <ChordProvider>
      <div
        className=" ChordPage"
        style={{ paddingTop: "10vh", height: "100%" }}
      >
        <SettingPart />
        <ChordPart />
        <ListPart />
      </div>
    </ChordProvider>
  );
};

export default ChordPage;
