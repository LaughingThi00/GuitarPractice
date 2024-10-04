import Chord from "@tombatossals/react-chords/lib/Chord";
import ListJSON from "../resource/chord/chordlibrary.json";
import {
  findBabyChord,
  findDegree,
  findForm,
  refreshChordName,
} from "../pages/ChordPage/utils/utils";
import { romanize } from "romans";

const List = Object.entries(ListJSON);

export const addTimestamp = (chord) => {
  if (!Array.isArray(chord)) return chord;
  if (chord.length !== 2) return chord;

  const timestamp = String(Math.floor(Math.random() * 100000));
  return [...chord, timestamp];
};
export const createGroupFromOneChord = (chord) => {
  if (!chord) return [];
  const ThisNameChord = chord[0];
  const ThisFFChord = chord[1];

  let group = [];
  let count = 0;
  ThisFFChord.forEach((item) => {
    const AddingChord = [`${ThisNameChord} [${++count}]`, [item]];
    group.push(addTimestamp(AddingChord));
  });

  group = quickSortChordGroup(group);
  count = 0;
  group.forEach((item) => {
    item[0] = `${ThisNameChord} [${++count}]`;
    return item;
  });
  return quickSortChordGroup(group);
};

export const pickFirstChordFromGroup = (chord) => {
  if (!chord) return undefined;
  const AddingChord = [`${chord[0]} [1]`, chord[1]];
  return addTimestamp(AddingChord);
};
export const createGroupFromChordSet = (list, scale, set) => {
  if (!list || !scale || !set) return;

  const resList = [];
  const listSet = set.set.map((item) => scale + item);

  list.forEach((chord) => {
    if (listSet.includes(chord[0])) resList.push(chord);
  });

  return resList;
};

function translateData(chord, baby) {
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

    if (PreThisChordPitch[0].f.indexOf(";") !== -1) {
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
  return { fret: ThisChordFret, finger: ThisChordFinger };
}

function findCapo(fret) {
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
  return capo;
}
export function quickSortChordGroup(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arr.length - 1 - i; x++) {
      if (
        findCapo(arr[x][1][0].p.split(",")) >
        findCapo(arr[x + 1][1][0].p.split(","))
      ) {
        [arr[x], arr[x + 1]] = [arr[x + 1], arr[x]];
      }
    }
  }

  return arr;
}

export const MyChord = ({ fret, finger }) => {
  const chord = {
    frets: fret,
    fingers: finger,
    barres: [1],
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
  const lite = false;
  return <Chord chord={chord} instrument={instrument} lite={lite} />;
};

export function createChordImage(chord, baby, showName) {
  const data = translateData(chord, baby);
  let name = null;
  if (showName) {
    name = chord[0].includes(" ") ? (
      <div>
        <span className="m-0 text-4xl inline font-bold relative">
          <span>{refreshChordName(chord[0])} </span>
          <span className="ml-2 text-2xl inline font-bold text-neutral-500 absolute">
            {findForm(chord[0])}
          </span>
        </span>
      </div>
    ) : (
      <span className="m-0 text-4xl font-bold">{chord[0]}</span>
    );
  }
  return (
    <div>
      <span>{showName && name}</span>
      <div className="relative flex flex-row justify-center items-center">
        <div className=" absolute left-1/4 top-1/4 h-3/4 text-2xl med:left-15pc med:top-15pc">
          [{findCapo(data.fret) + 1}fr]{" "}
        </div>
        <div className="flex flex-row justify-center items-center w-1/2 h-1/2 ">
          <MyChord fret={data.fret} finger={data.finger} />
        </div>
      </div>
    </div>
  );
}
