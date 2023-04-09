import "./App.css";
import { createChordImage } from "./features/image";
import ListJSON from "./resource/chord/chordlibrary.json";
import { RisingPitch } from "./features/sound";

function App() {
  // let result= createChordImage('A','001110')

  // Converting JSON object to JS object

  // console.log(Object.entries(ListJSON));

  return (
    <div className="App">


      {/* <ul className="MenuType">
        <li>
          <Button>Hợp âm ngẫu nhiên</Button>
        </li>
        <li>
          <Button>Theo điệu</Button>
        </li>
        <li>
          <Button>Solo</Button>
        </li>
        <li>
          <Button>Theo bài hát</Button>
        </li>
        <li>
          <Button>Gypsy</Button>
        </li>
      </ul> */}
   <RisingPitch />
      {Object.entries(ListJSON).map((item) => {
        return <>{createChordImage(item[0], item[1][0].p)}</>;
      })}
    </div>
  );
}

export default App;
