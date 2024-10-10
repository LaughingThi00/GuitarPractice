import { deromanize } from "romans";
import { List } from "../provider/ChordProvider";
import { NoteList } from "../options/options";

export const addTimestamp = (chord, isPassingChord = false) => {
  if (!Array.isArray(chord)) return chord;
  if (chord.length !== 2) return chord;
  const timestamp = `${isPassingChord ? "PSC" : ""}${Math.floor(
    Math.random() * 100000
  )}`;
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
export const pickFirstChordFromGroup = (chord, isPassingChord = false) => {
  if (!chord) return undefined;
  const AddingChord = [
    `${chord[0]} [1]`,
    [chord[1].sort((a, b) => findCapo(a.p) - findCapo(b.p))[0]],
  ];
  return addTimestamp(AddingChord, isPassingChord);
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

export function translateData(chord, isUnchangedFret = true) {
  if (!chord) return null;
  let ThisChordFret = [];
  let ThisChordFinger = [];
  let Chord = chord[1][0];
  ThisChordFret = Chord.p.split(",").map((p) => {
    switch (p) {
      case "x":
        return -1;
      case "0":
        return 0;
      default:
        return Number(p);
    }
  });

  let Finger = Chord.f.split(";")[0].split("");

  if (!Finger.length) {
    Finger = [];
    const calFret = ThisChordFret.filter((f) => ![-1, 0].includes(f));
    const minFret = Math.min(...calFret);

    const staging = [];
    calFret.forEach((f) => {
      const existStaging = staging.find((s) => s.fret === f);
      if (existStaging)
        staging.push({ fret: f, finger: existStaging.finger + 1 });
      staging.push({
        fret: f,
        finger: staging.find((s) => s.finger === f - minFret + 1)
          ? f - minFret + 2
          : f - minFret + 1,
      });
    });
    Finger = staging.map((s) => s.finger);
    const calFing = Math.max(...Finger) - Math.min(...Finger);
    if (calFing > 3) {
      const minFing = Math.min(...Finger);
      Finger = Finger.map((f) => (f - minFing > 3 ? minFing + 3 : f));
    }
  }

  let fng = 0;
  ThisChordFret.forEach((p) => {
    switch (p) {
      case -1:
      case 0:
        ThisChordFinger.push(0);
        break;
      default:
        ThisChordFinger.push(Number(Finger[fng]));
        fng += 1;
    }
  });

  let capo = null;

  capo = isUnchangedFret
    ? findCapo(ThisChordFret, true)
    : findCapo(ThisChordFret, false);
  return { fret: ThisChordFret, finger: ThisChordFinger, capo };
}

export const findCapo = (fret, isUnchanged = true): number => {
  if (!fret) return null;
  if (!Array.isArray(fret)) {
    fret = fret.split(",").map((f) => (f === "x" ? -1 : Number(f)));
  }
  let capo = Math.min(...fret.filter((f) => f !== 0 && f !== -1), 100);
  capo = capo === 100 ? 0 : capo - 1;

  if (!isUnchanged) {
    fret.forEach((f, i) => {
      if (f !== 0 && f !== -1) fret[i] -= capo;
    });
  }

  return capo > 1 ? capo + 1 : capo;
};

export function quickSortChordGroup(arr) {
  return arr.sort((a, b) => translateData(a).capo - translateData(b).capo);
}

export function findDifference(str1, str2) {
  let index = -1;

  for (let i = 0; i < str2.length; i++) {
    if (str1[i] !== str2[i]) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return str1.slice(str2.length);
  }

  return str1.slice(index);
}

export function findChordItem(name) {
  return (
    pickFirstChordFromGroup(List.find((itm) => itm[0] === name)) ?? undefined
  );
}
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
export function replaceChordInQueue(queue, chord, replaceArr) {
  if (!chord) return;
  const chordName = chord[0];
  const index = queue.findIndex((c) => {
    if (c[2] === chord[2])
      return refreshChordName(c[0]) === refreshChordName(chordName);
  });
  if (index !== -1) {
    queue.splice(index, 1, ...replaceArr);
  }

  return queue;
}

export function replaceArrInQueue(queue, replacedArr, replaceArr) {
  const index = queue.findIndex((_, i) =>
    queue
      .slice(i, i + replacedArr.length)
      .every((val, j) => val[2] === replacedArr[j][2])
  );

  if (index !== -1) {
    queue.splice(index, replacedArr.length, ...replaceArr);
  }

  return queue;
}

export const refreshChordName = (
  chordName,
  removeDegree = true,
  removeForm = true
) => {
  let result = chordName;

  if (removeDegree && chordName.includes("-")) {
    result = chordName.split("-")[1];
  }

  if (removeForm) {
    result = result.split(" ")[0];
  }
  return result;
};

export const findDegree = (chordName, returnNum = true) => {
  if (returnNum)
    return chordName.includes("-") ? deromanize(chordName.split("-")[0]) : 0;
  else return chordName.includes("-") ? chordName.split("-")[0] : undefined;
};

export const findForm = (chordName) => {
  return chordName.includes(" ") ? chordName.split(" ")[1] : undefined;
};

export const analyzeName = (chordName) => {
  const Head =
    chordName.length >= 2
      ? chordName[1] === "#" || chordName[1] === "b"
        ? chordName.slice(0, 2)
        : chordName[0]
      : chordName;

  const Tail = findDifference(chordName, Head);
  return { Head, Tail };
};

export const findNextoRoot = (originRoot: string, findNext = true) => {
  const idx = NoteList.findIndex((x) => x.split("/").includes(originRoot));
  if (idx === -1) return null;

  if (findNext) {
    return idx === NoteList.length - 1
      ? NoteList[0].split("/")[0]
      : NoteList[idx + 1].split("/")[0];
  } else {
    return idx === 0
      ? NoteList[NoteList.length - 1].split("/")[0]
      : NoteList[idx - 1].split("/")[0];
  }
};
