import useSound from 'use-sound';
import Beat44_70 from '../resource/sound/70beat44';
import React from 'react';
import { Button } from 'bootstrap';


export function RisingPitch() {
    const [playbackRate, setPlaybackRate] = React.useState(0.75);

    const [play] = useSound(Beat44_70, {
        playbackRate,
        // `interrupt` ensures that if the sound starts again before it's
        // ended, it will truncate it. Otherwise, the sound can overlap.
        interrupt: true,
    });

    const handleClick = () => {
        setPlaybackRate(playbackRate + 0.1);
        play();
    };

    return (
        <Button onClick={handleClick}>
            <span role="img" aria-label="Person with lines near mouth">
                ?
            </span>
        </Button>
    );
}
