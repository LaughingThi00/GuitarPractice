import React, { useContext } from "react";
import { RisingBeat } from "../../../features/sound";
import { createChordImage } from "../../../features/image";
import { ChordPageContext } from "./../provider/ChordProvider";

const ChordPart = () => {
  const { NowChord } = useContext(ChordPageContext);
  return (
    <div className="ChordPart-ChordPage med:w-full">
      <div className="MyChord-Container med:min-h-[50vh]">
        {NowChord ? createChordImage(NowChord, true, true) : <div></div>}
        <RisingBeat />{" "}
      </div>
    </div>
  );
};

export default ChordPart;
