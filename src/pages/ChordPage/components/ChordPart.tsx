import React, { useContext } from "react";
import { RisingBeat } from "../../../features/sound";
import { Button } from "react-bootstrap";
import { createChordImage } from "../../../features/image";
import { ChordPageContext } from "../Chord";

const ChordPart = () => {
  const {
    Mode,
    handleChangeMode,
    NowChord,
    IntervalChord,
    handleSliderIntervalChordChange,
  } = useContext(ChordPageContext);
  return (
    <div className=" w-4/6 Chord-ImageBox flex justify-center items-center">
      <div className="h-2/3 border-solid border-2 border-indigo-600">
        {NowChord && createChordImage(NowChord, true, true)}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="IntervalChord">IntervalChord: </label>
        <input
          id="IntervalChord"
          type="range"
          min="1000"
          max="20000"
          step="1000"
          value={IntervalChord}
          onChange={handleSliderIntervalChordChange}
          style={{ margin: "0 10px", flexGrow: 1 }}
        />
        <span>{IntervalChord}</span>
      </div>
      <Button variant="secondary" onClick={() => handleChangeMode()}>
        {Mode}
      </Button>

      <RisingBeat />
    </div>
  );
};

export default ChordPart;
