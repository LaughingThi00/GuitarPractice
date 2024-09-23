export function findBabyChord(chord) {
  let min = 20;
  let result = null;
  for (let idx = 0; idx < chord.length; idx++) {
    let p = chord[idx].p.split(",");
    for (let i = 0; i < p.length; i++) {
      if (p[i] === "x") {
      } else if (Number(p[i]) < min) {
        min = Number(p[i]);
        result = chord[idx];
      }
    }
  }

  return result;
}

export const findNext = (arr, idx) => {
    if (idx === arr.length - 1) {
      return arr[0];
    }
    return arr[idx + 1];
  };

// const [ChordShow, setChordShow] = useState(null);
// const handleChordShow = (chord) => {
//     if (NowChord && chord === NowChord[0]) {
//       setNowChord(null);
//       return;
//     }
//     setNowChord(Queue.find((item) => item[0] === chord));
//     if (ChordShow && ChordShow[0] === chord) setChordShow(null);
//     else setChordShow(Queue.find((item) => item[0] === chord));
//   };
