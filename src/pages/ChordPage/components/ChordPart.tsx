import React, { useContext } from "react";
import { RisingBeat } from "../../../features/sound";
import { createChordImage } from "../../../features/image";
import { ChordPageContext } from "./../provider/ChordProvider";
import { GlobalContext } from "../../../provider/globalProvider";

const ChordPart = () => {
  const { NowChord } = useContext(ChordPageContext);
  const { groupNav } = useContext(GlobalContext);

  return (
    <div
      className="ChordPart-ChordPage med:w-full med:min-h-[60vh]"
      id="_ChordPart"
    >
      <div className="MyChord-Container med:h-full">
        {NowChord ? createChordImage(NowChord, true, true) : <div></div>}
        <RisingBeat />{" "}
      </div>
    </div>
  );
};

export default ChordPart;
