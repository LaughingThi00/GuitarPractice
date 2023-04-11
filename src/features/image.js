import { findBabyChord } from "../pages/Chord";
import Chord from "@tombatossals/react-chords/lib/Chord";

function translateData(chord,baby){
  let ThisChordFret = null;
  let ThisChordFinger = null;
  let PreChordFinger = null;


  if (baby) {
    let ThisBabyChord = findBabyChord(chord[1]);
    ThisChordFret = ThisBabyChord.p.split(",");
    PreChordFinger = ThisBabyChord.f.split(";")[0].split("");
  } else {

    let PreThisChordPitch = chord[1];
    ThisChordFret = chord[1][0].p.split(",");

    if(PreThisChordPitch[0].f.indexOf(';')!==-1){
      PreChordFinger = PreThisChordPitch[0].f.split(";")[0].split("");

    } else {
      PreChordFinger = PreThisChordPitch[0].f.split("");

    }

  }
  let CountFinger = 0;
  ThisChordFinger = ThisChordFret;
  for (let i = 0; i < ThisChordFret.length; i++) {
    if (ThisChordFret[i] === "x") {
      ThisChordFret[i] = Number(-1);
      ThisChordFinger[i] = Number(-1);
    } else {
      ThisChordFret[i] = Number(ThisChordFret[i]);
      if (ThisChordFret[i] === "0") {
        ThisChordFinger[i] = Number(PreChordFinger[CountFinger]);
        ++CountFinger;
      }
    }
  }
  return {fret:ThisChordFret,finger:ThisChordFinger}
}

function findCapo(fret){
  let capo = 100;
  for (let i = 0; i < fret.length; i++) {
    if (fret[i] !== 0 && fret[i] !== -1) {
      if (Number(fret[i]) < capo) capo = fret[i];
    }
  }
  capo = capo === 100 ? 0 : --capo;
  for (let i = 0; i < fret.length; i++) {
    if (fret[i] !== 0 && fret[i] !== -1) {
      fret[i] -= capo;
    }
  }
return capo
}

export const MyChord = ({ fret, finger }) => {
  const chord = {
    frets: fret,
    fingers: finger,
    barres:[1],
    capo: true,
  };

  const instrument = {
    strings: 6,
    fretsOnChord: 4,
    name: "Guitar",
    keys: [],
    tunings: {
      standard: ["E", "A", "D", "G", "B", "E"],
    },
  };
  const lite = false; // defaults to false if omitted
  return (  <Chord chord={chord} instrument={instrument} lite={lite} /> );
};

export function createChordImage(chord, baby,title) {

const data=translateData(chord,baby)
  return (
    <div className="MyChord-Container">
      {title&&<h5 style={{margin:'0px 0px'}}>{chord[0]}</h5>}
      <div className="Chord-Unit">
      <h6 className="CapoFret">{findCapo(data.fret)+1}fr </h6>
      <MyChord fret={data.fret} finger={data.finger} />
      </div>
    </div>
  );
}
