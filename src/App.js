import "./App.css";
import { MyChord, createChordImage } from "./features/image";
import ListJSON from "./resource/chord/chordlibrary.json";
import ChordPage from "./pages/Chord";
import { RisingBeat } from "./features/sound";

function App() {


  return (
    <div className="App">

<ChordPage />    </div>
  );
}

export default App;
