import ChordPart from "./components/ChordPart";
import ListPart from "./components/ListPart";
import SettingPart from "./components/SettingPart";
import { ChordProvider } from "./provider/ChordProvider";

const ChordPage = () => {
  return (
    <ChordProvider>
      <div className=" ChordPage med:flex-col med:h-auto ">
        <SettingPart />
        <ChordPart />
        <ListPart />
      </div>
    </ChordProvider>
  );
};

export default ChordPage;
