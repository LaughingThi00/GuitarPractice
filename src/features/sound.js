
import useSound from 'use-sound';
import Button from 'react-bootstrap/Button';
import Beat44_70 from './../resource/sound/70beat44.mp3';
import { useState } from 'react';


export function RisingPitch() {
    const [playbackRate, setPlaybackRate] = useState(0.75);

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

    return (<>
      <Button onClick={handleClick} varriant="success"/>

      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
    </>
      
    );
}
