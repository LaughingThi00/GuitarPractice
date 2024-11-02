import Chord from "@tombatossals/react-chords/lib/Chord";
import {
  findForm,
  refreshChordName,
  translateData,
} from "../pages/ChordPage/utils/ChordUtils";

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

export function createChordImage(chord, showName) {
  const data = translateData(chord, false);
  let name = null;

  if (showName) {
    name = chord[0].includes(" ") ? (
      <div className="pt-3">
        <span className="relative m-0 inline text-4xl font-bold">
          <span>{refreshChordName(chord[0])} </span>
          <span className="absolute ml-2 text-2xl inline font-bold text-neutral-500">
            {findForm(chord[0])}
          </span>
        </span>
      </div>
    ) : (
      <span className="m-0 text-4xl font-bold">{chord[0]}</span>
    );
  }

  return (
    <div className="h-full">
      <span>{showName && name}</span>
      <div className="relative flex flex-row justify-center items-center">
        <div className="absolute left-22pc top-1/4 h-3/4 text-xl med:left-5pc med:top-22pc med:text-sm">
          {![0].includes(data.capo) ? `[${data.capo}fr]` : ` `}
        </div>
        <div className="flex flex-row items-center justify-center w-1/2 h-1/2 med:h-90pc med:w-90pc">
          <MyChord fret={data.fret} finger={data.finger} />
        </div>
      </div>
    </div>
  );
}
