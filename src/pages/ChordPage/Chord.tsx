import ChordPart from "./components/ChordPart";
import ListPart from "./components/ListPart";
import SettingPart from "./components/SettingPart";
import { ChordProvider } from "./provider/ChordProvider";



const ChordPage = () => {
  return (
    <ChordProvider>
      <div className="flex flex-row min-h-screen max-h-screen	 justify-center ">
        <SettingPart />
        <ChordPart />
        <ListPart />
      </div>
    </ChordProvider>
  );
};

export default ChordPage;
