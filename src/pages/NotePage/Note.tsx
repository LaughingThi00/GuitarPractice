import { useContext } from "react";

import NoteProvider from "./provider/NoteProvider";
import { GlobalContext } from "../../provider/globalProvider";
import Test from "./components/Test";

const NotePage = () => {
  const { theme } = useContext(GlobalContext);

  return (
    <NoteProvider>
      <div className={` NotePage med:flex-col med:h-auto landscape:pt-10 ${theme}-Background med:relative`}>
        <div className="">
          <Test />
        </div>
      </div>
    </NoteProvider>
  );
};

export default NotePage;
