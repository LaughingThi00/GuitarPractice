import useSound from "use-sound";
import Button from "react-bootstrap/Button";
import Beat44_100 from "./../resource/sound/beat44_100.mp3";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlay,
  faPlus,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
// import { faHouse } from '@fortawesome/free-solid-svg-icons';

export function RisingPitch() {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [PlayState, setPlayState] = useState(false);
  const [play, { pause }] = useSound(Beat44_100, {
    playbackRate,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
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
      console.log(new Date().toUTCString(), "Play state:", PlayState);
      pause();
      setPlayState(false);
    } else {
      console.log(new Date().toUTCString(), "Play state:", PlayState);
      play();
      setPlayState(true);
    }
  };
  return (
    <>
      <Button onClick={handleIncr} varriant="success">
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Button variant="warning" onClick={handlePlay}>
        <FontAwesomeIcon icon={PlayState ? faStop : faPlay} />
      </Button>

      <Button varriant="danger" onClick={handleDecr}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>

      <h3>{Math.floor(playbackRate * 100)}</h3>
    </>
  );
}
