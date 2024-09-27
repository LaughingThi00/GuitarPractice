import React, { createContext, useEffect, useRef, useState } from "react";
import ListJSON from "../../../resource/chord/chordlibrary.json";
import {
  addTimestamp,
  createGroupFromOneChord,
  pickFirstChordFromGroup,
} from "../../../features/image";
import { deromanize, romanize } from "romans";
import { ContentType, ModeType } from "./../types/types";
import {
  optionChordSet,
  optionColorChord,
  optionsTone,
} from "./../options/options";
import {
  analyzeName,
  findChordItem,
  findDegree,
  findDifference,
  findNext,
  refreshChordName,
  replaceArrInQueue,
  replaceChordInQueue,
} from "./../utils/utils";

export const List = Object.entries(ListJSON);
export const ChordPageContext = createContext(null);

export function ChordProvider({ children }) {
  var Interval = useRef(null);
  var NowChordRef = useRef(null);

  const ChordList = List.map((itm) => ({ value: itm[0], label: itm[0] })).sort(
    (a, b) => {
      const lengthComparison = a.value.length - b.value.length;
      if (lengthComparison !== 0) {
        return lengthComparison;
      }
      return a.value.localeCompare(b.value);
    }
  );

  const [HideForm, setHideForm] = useState(false);
  const handleHideForm = () => {
    setHideForm(!HideForm);
  };
  const [HideDegree, setHideDegree] = useState(false);
  const handleHideDegree = () => {
    setHideDegree(!HideDegree);
  };
  const [AllowRepeat, setAllowRepeat] = useState(false);
  const handleChangeAllowRepeat = () => {
    setAllowRepeat(!AllowRepeat);
  };
  const [Content, setContent] = useState(ContentType.Custom);
  const handleChangeContent = () => {
    switch (Content) {
      case ContentType.Custom:
        setContent(ContentType.TonicBased);
        break;
      case ContentType.TonicBased:
        setContent(ContentType.HarmonyBased);
        break;
      case ContentType.HarmonyBased:
        setContent(ContentType.Custom);
        break;
      default:
        break;
    }
    setQueue([]);
    setToneOption(null);
    setHarmonyOption(null);
    setRingOption(null);
  };
  const [ShowMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!ShowMenu);
  };
  const [Mode, setMode] = useState(ModeType.Single);
  const handleChangeMode = () => {
    if (Mode === ModeType.Single) {
      setMode(ModeType.Multiple);

      Interval.current = setInterval(() => {
        if (!NowChordRef.current) {
          setNowChord(Queue[0]);
        } else {
          let idx = Queue.findIndex(
            (item) => item[2] === NowChordRef.current[2]
          );

          if (idx === -1 || idx === Queue.length - 1) {
            setNowChord(Queue[0]);
          } else {
            setNowChord(Queue[idx + 1]);
          }
        }
      }, IntervalChord);
    } else {
      setMode(ModeType.Single);
      clearInterval(Interval.current);
    }
  };
  const [Queue, setQueue] = useState([]);
  const handleClearQueue = () => {
    setQueue([]);
  };
  const [ringOption, setRingOption] = useState(null);
  const handleChangeRingOption = (val) => {
    if (!val) return;
    setRingOption(val);
  };
  const [NowChord, setNowChord] = useState(null);
  const [IntervalChord, setIntervalChord] = useState(1000);
  useEffect(() => {
    NowChordRef.current = NowChord;
  }, [NowChord]);

  const handleSliderIntervalChordChange = (event) => {
    setIntervalChord(event.target.value);
    clearInterval(Interval.current);
    Interval.current = setInterval(() => {
      if (!NowChordRef.current) {
        setNowChord(Queue[0]);
      } else {
        let idx = Queue.findIndex((item) => item[0] === NowChordRef.current[0]);

        if (idx === -1 || idx === Queue.length - 1) {
          setNowChord(Queue[0]);
        } else {
          setNowChord(Queue[idx + 1]);
        }
      }
    }, event.target.value);
  };
  const [toneOption, setToneOption] = useState(null);
  const handleChangeToneOption = (val) => {
    if (!AllowRepeat) setQueue([]);
    if (!val) return;
    setToneOption(val);
  };
  const [noteOption, setNoteOption] = useState(null);
  const handleChangeNoteOption = (val) => {
    if (!val) return;
    setNoteOption(val);
  };
  const [tonicOption, setTonicOption] = useState(null);
  const handleChangeTonicOption = (val) => {
    if (!val) return;
    setTonicOption(val);
  };
  const [harmonyOption, setHarmonyOption] = useState(null);
  const handleChangeHarmonyOption = (val) => {
    if (!val) return;
    setHarmonyOption(val);
  };
  const handleAdd = (chord) => {
    if (!chord) return;
    if (typeof chord === "object") chord = chord.label;
    if (AllowRepeat || !Queue.find((item) => item[0] === chord)) {
      let AddingChord = pickFirstChordFromGroup(
        List.find((item) => item[0] === chord)
      );
      if (AddingChord) {
        if (
          !AllowRepeat &&
          Queue.find((item) => item[0].split(" ")[0] === chord)
        )
          return;

        setQueue((prev) => [...prev, addTimestamp(AddingChord)]);
        setNowChord(AddingChord);
      }
    }
  };
  const handleDelete = (chord) => {
    if (!chord) return;
    setQueue(Queue.filter((item) => item[2] !== chord[2]));
  };
  const handleShowAll = (chord) => {
    if (!chord) return;
    if (chord[0].includes("-")) chord[0] = chord[0].split("-")[1];
    if (chord[0].includes(" ")) chord[0] = chord[0].split(" ")[0];
    setQueue((prev) => {
      const idx = prev.findIndex((mem) => mem[2] === chord[2]);
      prev = prev.filter((item) => item[2] !== chord[2]);
      let group = createGroupFromOneChord(
        List.find((item) => item[0] === chord[0])
      );
      if (!AllowRepeat)
        group = group.filter((item) => !Queue.find((x) => x[0] === item[0]));
      return [...prev.slice(0, idx), ...group, ...prev.slice(idx)];
    });
  };
  const addDegreeToChord = (chord) => {
    if (Content === ContentType.HarmonyBased && toneOption) {
      toneOption.value.forEach((item, index) => {
        if (item === chord[0].split(" ")[0]) {
          chord[0] = `${String(romanize(index + 1))}-${chord[0]}`;
        }
      });
    }
    return chord;
  };
  const addDegreeToPowerChord = (chord, degree, passing = undefined) => {
    if (!chord || !degree || chord.includes("-")) return chord;
    let newchord = chord;
    newchord[0] = `${romanize(degree)}-${chord[0]}`;
    if (passing !== undefined) newchord.push(passing);
    return newchord;
  };
  const handleBuildChorSet = () => {
    if (!AllowRepeat) setQueue([]);
    let res = [];
    if (Content === ContentType.TonicBased) {
      if (!tonicOption) {
        return;
      } else {
        let chords = optionChordSet.find(
          (chords) => chords.name === tonicOption.value
        );
        if (!chords) return;
        res = chords.set
          .map((chord) =>
            pickFirstChordFromGroup(
              List.find((c) => c[0] === noteOption.value + chord)
            )
          )
          .filter(Boolean);
        if (AllowRepeat) setQueue((prev) => [...prev, ...res]);
        else setQueue(res);
      }
    } else if (Content === ContentType.HarmonyBased) {
      if (!toneOption) return;
      if (!ringOption) {
        res = toneOption.value
          .map((chord) =>
            pickFirstChordFromGroup(List.find((c) => c[0] === chord))
          )
          .filter(Boolean);
        if (AllowRepeat) setQueue((prev) => [...prev, ...res]);
        else setQueue(res);
      } else {
        ringOption.value.split("").forEach((degree) => {
          degree = Number(degree);
          toneOption.value.forEach((chord, index) => {
            if (index + 1 === degree)
              res.push(
                pickFirstChordFromGroup(List.find((c) => c[0] === chord))
              );
          });
        });
        if (AllowRepeat) setQueue((prev) => [...prev, ...res]);
        else setQueue(res);
      }
    }
    setNowChord(res[0]);
  };

  const handleChangeChordForm = (chord) => {
    const chordOrigin = List.find(
      (item) => item[0] === refreshChordName(chord[0])
    );
    const group = createGroupFromOneChord(chordOrigin);
    let idx = group.findIndex(
      (chrd) => chrd[0] === refreshChordName(chord[0], true, false)
    );
    if (idx === -1) return;
    const next = addDegreeToPowerChord(
      findNext(group, idx),
      findDegree(chord[0])
    );
    idx = Queue.findIndex((item) => item[2] === chord[2]);
    if (idx !== -1) {
      Queue[idx] = next;
      setQueue(Queue);
      setNowChord(next);
    }
  };

  const empowerGroupChord = (chord) => {
    let arr = [];
    let checkArr = [];
    let flag = false;
    Queue.forEach((itm) => {
      if (itm[3] !== undefined) arr.push(itm);
      else {
        if (!flag) arr = [];
        else {
          arr.forEach((e) => checkArr.push(e));
          flag = false;
        }
      }
      if (itm[2] === chord[2]) flag = true;
    });
    if (!checkArr.length) return;

    const DegreeOfChord = findDegree(chord[0]);
    const analName = analyzeName(refreshChordName(checkArr[0][0]));

    optionColorChord[toneOption.label.includes("m") ? 1 : 0].list.forEach(
      (item, index) => {
        if (item.degree === DegreeOfChord) {
          let isChanged = false;
          item.option.forEach((op, idx) => {
            if (Array.isArray(op) && op[0] === analName.Tail && !isChanged) {
              if (idx === item.option.length - 1)
                analName.Tail = item.option[0];
              else analName.Tail = item.option[idx + 1];
              isChanged = true;
            }
          });
        }
      }
    );
    let res = [];
    if (Array.isArray(analName.Tail)) {
      analName.Tail.forEach((itm, ind) =>
        res.push(
          addDegreeToPowerChord(
            findChordItem(analName.Head + itm),
            DegreeOfChord,
            ind
          )
        )
      );
    } else
      res.push(
        addDegreeToPowerChord(
          findChordItem(analName.Head + analName.Tail),
          DegreeOfChord
        )
      );

    setQueue((prev) => replaceArrInQueue(prev, checkArr, res));
    setNowChord(res[0]);
  };

  const empowerOneChord = (chord) => {
    if (Content === ContentType.HarmonyBased) {
      if (!toneOption) return;
      if (chord[3] !== undefined) {
        return empowerGroupChord(chord);
      }

      const DegreeOfChord = findDegree(chord[0]);
      let res = [];
      const analName = analyzeName(refreshChordName(chord[0]));

      optionColorChord[toneOption.label.includes("m") ? 1 : 0].list.forEach(
        (op, ind) => {
          if (op.degree === DegreeOfChord) {
            let isChanged = false;
            op.option.forEach((o, idx) => {
              if (o === analName.Tail && !isChanged) {
                if (idx === op.option.length - 1) analName.Tail = op.option[0];
                else analName.Tail = op.option[idx + 1];
                isChanged = true;
              }
            });
          }
        }
      );

      if (Array.isArray(analName.Tail)) {
        analName.Tail.forEach((itm, ind) =>
          res.push(
            addDegreeToPowerChord(
              findChordItem(analName.Head + itm),
              DegreeOfChord,
              ind
            )
          )
        );
      } else
        res.push(
          addDegreeToPowerChord(
            findChordItem(analName.Head + analName.Tail),
            DegreeOfChord
          )
        );

      setQueue((prev) => replaceChordInQueue(prev, chord, res));
      setNowChord(res[0]);
    }
  };

  const findFifth = (chord) => {
    const OriginChord = chord[0].includes("-")
      ? toneOption.value.find((c, index) => index + 1 === findDegree(chord[0]))
      : refreshChordName(chord[0]);
    let AddingChord = null;
    if (OriginChord.includes("dim")) return;
    else {
      AddingChord = optionsTone
        .find((tone) => tone.label === OriginChord)
        .value.find((c, index) => index + 1 === 5);
    }
    if (!AddingChord) return;
    AddingChord = pickFirstChordFromGroup(
      List.find((c) => c[0] === AddingChord)
    );
    setQueue((prev) => {
      let index = prev.findIndex((c) => c[2] === chord[2]);
      if (chord[3] !== undefined && chord[3] !== 0)
        index = index - chord[3] >= 0 ? index - chord[3] : -1;
      if (index < 0) return prev;
      if (
        index > 0 &&
        refreshChordName(prev[index - 1][0]) ===
          refreshChordName(AddingChord[0])
      )
        return prev;
      else {
        prev.splice(index, 0, AddingChord);
        setNowChord(AddingChord);
        return prev;
      }
    });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(Queue);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setQueue(newItems);
  };
  return (
    <ChordPageContext.Provider
      value={{
        HideForm,
        HideDegree,
        AllowRepeat,
        Content,
        ShowMenu,
        Mode,
        Queue,
        ringOption,
        NowChord,
        IntervalChord,
        toneOption,
        noteOption,
        tonicOption,
        harmonyOption,
        ChordList,
        handleShowMenu,
        handleChangeMode,
        handleChangeRingOption,
        handleClearQueue,
        setNowChord,
        handleSliderIntervalChordChange,
        handleChangeToneOption,
        handleChangeNoteOption,
        handleChangeTonicOption,
        handleChangeHarmonyOption,
        handleAdd,
        handleDelete,
        handleShowAll,
        addDegreeToChord,
        handleBuildChorSet,
        handleChangeChordForm,
        handleOnDragEnd,
        handleChangeContent,
        handleHideForm,
        handleHideDegree,
        handleChangeAllowRepeat,
        empowerOneChord,
        findFifth,
      }}
    >
      {children}
    </ChordPageContext.Provider>
  );
}