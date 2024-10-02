import React, { useContext } from "react";
import { RisingBeat } from "../../../features/sound";
import { Button } from "react-bootstrap";
import { createChordImage } from "../../../features/image";
import { ChordPageContext } from "./../provider/ChordProvider";

const ChordPart = () => {
  const { NowChord } = useContext(ChordPageContext);
  return (
    <div className="ChordPart-ChordPage">
      <div className="MyChord-Container ">
        {NowChord ? createChordImage(NowChord, true, true) : <div></div>}
        <RisingBeat />{" "}
      </div>
    </div>
  );
};

export default ChordPart;
