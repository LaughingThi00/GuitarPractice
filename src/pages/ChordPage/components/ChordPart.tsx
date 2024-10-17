import React, { useContext } from "react";
import { RisingBeat } from "../../../features/sound";
import { createChordImage } from "../../../features/image";
import { ChordPageContext } from "./../provider/ChordProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ChordPart = () => {
  const { NowChord, Queue, setNowChord } = useContext(ChordPageContext);
  const setNextChordInQueue = (isNext = true) => {
    if (!NowChord) return;
    const ind = Queue.findIndex((x) => x[2] === NowChord[2]);
    if (isNext) setNowChord(Queue[ind === Queue.length - 1 ? 0 : ind + 1]);
    else setNowChord(Queue[ind === 0 ? Queue.length - 1 : ind - 1]);
  };
  return (
    <div
      className="ChordPart-ChordPage med:w-full med:min-h-[50vh] med:h-[50vh]"
      id="_ChordPart"
    >
      <div className="MyChord-Container min-h-[80vh] relative med:min-h-[50vh]   ">
        {Queue.length > 1 && (
          <div
            onClick={() => setNextChordInQueue(false)}
            className="absolute left-0 z-10 flex items-center justify-center h-full w-1/4 med:w-1/6 hover:bg-gray-200/50 cursor-pointer text-4xl"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        )}
        {NowChord ? createChordImage(NowChord, true) : <div></div>}
        <RisingBeat />
        {Queue.length > 1 && (
          <div
            onClick={() => setNextChordInQueue(true)}
            className="absolute right-0 z-10 flex items-center justify-center h-full w-1/4 med:w-1/6 hover:bg-gray-200/50 cursor-pointer text-4xl"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChordPart;
