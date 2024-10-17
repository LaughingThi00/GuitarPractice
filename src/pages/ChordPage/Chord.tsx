import { useContext } from "react";
import ChordPart from "./components/ChordPart";
import ListPart from "./components/ListPart";
import SettingPart from "./components/SettingPart";
import { ChordProvider } from "./provider/ChordProvider";
import { GlobalContext } from "../../provider/globalProvider";

const ChordPage = () => {
  const { theme, groupNav } = useContext(GlobalContext);

  return (
    <ChordProvider>
      <div
        className={` ChordPage med:flex-col med:h-auto landscape:pt-10 ${theme}-Background med:relative`}
      >
        <div className="hidden med:block">{groupNav}</div>
        <SettingPart />
        <ChordPart />
        <ListPart />
      </div>
    </ChordProvider>
  );
};

export default ChordPage;
