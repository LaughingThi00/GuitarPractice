import React, { useMemo } from "react";
import Guitar, { getRenderFingerSpn } from "react-guitar";
import { standard } from "react-guitar-tunings";
import useSound, { withSamples } from "react-guitar-sound";

function SampleGuitarWithSound() {
  const strings = useMemo(() => [0, 1, 2, 2, 0, -1], []);
  const { play } = useSound({ fretting: strings, tuning: standard });

  return (
    <Guitar
      strings={strings}
      renderFinger={getRenderFingerSpn(standard)}
      playOnHover
      onPlay={play}
    />
  );
}

const flamencoGuitar = withSamples({
  E2: "https://react-guitar.com/samples/E2.mp3",
  D3: "https://react-guitar.com/samples/D3.mp3",
  G3: "https://react-guitar.com/samples/G3.mp3",
  E4: "https://react-guitar.com/samples/E4.mp3",
});

function SampleGuitarWithSound2() {
  const strings = useMemo(() => [0, 1, 2, 2, 0, -1], []);
  const { play, strum } = useSound({
    instrument: flamencoGuitar,
    fretting: strings,
    tuning: standard,
  });

  return <Guitar strings={strings} onPlay={play} />;
}

const Test = () => {
  return <SampleGuitarWithSound />;
};

export default Test;
