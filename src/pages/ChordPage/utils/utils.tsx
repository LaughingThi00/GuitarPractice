import { deromanize } from "romans";
import { pickFirstChordFromGroup } from "./ChordUtils";

export const findNext = (arr, idx) => {
  if (idx === arr.length - 1) {
    return arr[0];
  }
  return arr[idx + 1];
};


export function getMinMaxSecondMin(arr) {
  if (arr.length === 0) {
    return {
      max: null,
      min: null,
      secondMin: null,
    };
  } else if (arr.length === 0) {
    return {
      max: arr[0],
      min: arr[0],
      secondMin: null,
    };
  }

  let min = Math.min(...arr);
  let max = Math.max(...arr);

  let filteredArr = arr.filter((num) => num !== min);

  if (filteredArr.length === 0) {
    return {
      max: max,
      min: min,
      secondMin: null,
    };
  }

  let secondMin = Math.min(...filteredArr);

  return {
    max: max,
    min: min,
    secondMin: secondMin,
  };
}
