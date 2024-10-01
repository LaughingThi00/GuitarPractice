import { deromanize } from "romans";
import { pickFirstChordFromGroup } from "../../../features/image";
import { List } from "../provider/ChordProvider";

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

export function replaceChordInQueue(queue, chord, replaceArr) {
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
