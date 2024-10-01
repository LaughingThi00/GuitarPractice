import useSound from "use-sound";
import Button from "react-bootstrap/Button";
import Beat44_100 from "./../resource/sound/beat44_100.mp3";
import Beat34_100 from "./../resource/sound/beat34_100.mp3";
import Beat24_100 from "./../resource/sound/beat24_100.mp3";

import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlay,
  faPlus,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { lang } from "../pages/ChordPage/types/language";
import { GlobalContext } from "../provider/globalProvider";

export function RisingBeat() {
  const { language } = useContext(GlobalContext);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [PlayState, setPlayState] = useState(false);
  const BeatList = [
    { name: "2/4", sound: Beat24_100 },
    { name: "3/4", sound: Beat34_100 },
    { name: "4/4", sound: Beat44_100 },
  ];
  const [beat, setBeat] = useState(BeatList[0].sound);
  const [play, { stop }] = useSound(beat, {
    playbackRate,
    interrupt: true,
    volume: 1,
  });

  const handleIncr = () => {
    setPlaybackRate(playbackRate + 0.01);
    play();
    setPlayState(true);
  };
  const handleDecr = () => {
    setPlaybackRate(playbackRate - 0.01);
    play();
    setPlayState(true);
  };

  const handlePlay = () => {
    if (PlayState) {
      stop();
      setPlayState(false);
    } else {
      play();
      setPlayState(true);
    }
  };

  const handleChangeBeat = () => {
    switch (beat) {
      case BeatList[0].sound:
        stop();
        setBeat(BeatList[1].sound);
        break;
      case BeatList[1].sound:
        stop();
        setBeat(BeatList[2].sound);
        break;
      case BeatList[2].sound:
        stop();
        setBeat(BeatList[0].sound);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div>
        <Button variant="secondary" onClick={handleChangeBeat} className="mt-2">
          {beat === BeatList[0].sound
            ? BeatList[0].name
            : beat === BeatList[1].sound
            ? BeatList[1].name
            : BeatList[2].name}
        </Button>
        <h3 className="font-bold m-2">
          {lang[language].ChordPart.Tempo}: {Math.floor(playbackRate * 100)}
        </h3>
      </div>
      <div className="flex flex-row">
        <button className="button-ListPart" onClick={handleDecr} role="button">
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button className="button-ListPart" onClick={handlePlay} role="button">
          <FontAwesomeIcon icon={PlayState ? faStop : faPlay} />
        </button>
        <button className="button-ListPart" onClick={handleIncr} role="button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
}

export function RisingBackingTrack() {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [PlayState, setPlayState] = useState(false);
  const BeatList = [
    { name: "2/4", sound: Beat24_100 },
    { name: "3/4", sound: Beat34_100 },
    { name: "4/4", sound: Beat44_100 },
  ];
  const [beat, setBeat] = useState(BeatList[0].sound);
  const [play, { stop }] = useSound(beat, {
    playbackRate,
    interrupt: true,
    volume: 1,
  });

  const handleIncr = () => {
    setPlaybackRate(playbackRate + 0.01);
    play();
    setPlayState(true);
  };
  const handleDecr = () => {
    setPlaybackRate(playbackRate - 0.01);
    play();
    setPlayState(true);
  };

  const handlePlay = () => {
    if (PlayState) {
      stop();
      setPlayState(false);
    } else {
      play();
      setPlayState(true);
    }
  };

  const handleChangeBeat = () => {
    switch (beat) {
      case BeatList[0].sound:
        stop();
        setBeat(BeatList[1].sound);
        break;
      case BeatList[1].sound:
        stop();
        setBeat(BeatList[2].sound);
        break;
      case BeatList[2].sound:
        stop();
        setBeat(BeatList[0].sound);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div>
        <Button variant="secondary" onClick={handleChangeBeat}>
          {beat === BeatList[0].sound
            ? BeatList[0].name
            : beat === BeatList[1].sound
            ? BeatList[1].name
            : BeatList[2].name}
        </Button>
        <h3>Tempo: {Math.floor(playbackRate * 100)}</h3>
      </div>
      <Button variant="danger" onClick={handleDecr}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Button variant="warning" onClick={handlePlay}>
        <FontAwesomeIcon icon={PlayState ? faStop : faPlay} />
      </Button>
      <Button onClick={handleIncr} variant="success">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </>
  );
}
