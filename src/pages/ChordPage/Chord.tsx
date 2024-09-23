import React, { createContext, useEffect, useRef, useState } from "react";
import { RisingBeat } from "../../features/sound";
import { Button } from "react-bootstrap";
import ListJSON from "../../resource/chord/chordlibrary.json";
import Select from "react-select";
import RomanNumerals from "roman-numerals";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  addTimestamp,
  createChordImage,
  createGroupFromOneChord,
  pickFirstChordFromGroup,
} from "../../features/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faArrowsToDot,
  faBroom,
  faEye,
  faGear,
  faLayerGroup,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ContentType, ModeType, TonicType } from "./types/types";
import {
  ChordSet,
  optionsHarmonyBased,
  optionsNote,
  optionsRing,
  optionsTone,
  optionsTonicBased,
} from "./options/options";
import { findNext } from "./utils/utils";
import SettingPart from "./components/SettingPart";
import ChordPart from "./components/ChordPart";
import ListPart from "./components/ListPart";

const List = Object.entries(ListJSON);
export const ChordPageContext = createContext(null);

function ChordProvider({ children }) {
  var Interval = useRef(null);
  var NowChordRef = useRef(null);

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
    if (!Queue.find((item) => item[0] === chord)) {
      if (
        typeof chord === "string" &&
        !Queue.includes((item) => item[0] === chord || item)
      ) {
        let AddingChord = pickFirstChordFromGroup(
          List.find((item) => item[0] === chord)
        );
        if (AddingChord) {
          const checkExist = Queue.find(
            (item) => item[0].split(" ")[0] === chord
          );
          if (checkExist) return;

          setQueue((prev) => [...prev, addTimestamp(AddingChord)]);
          setNowChord(AddingChord);
        }
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
      return [
        ...prev.slice(0, idx),
        ...createGroupFromOneChord(List.find((item) => item[0] === chord[0])),
        ...prev.slice(idx),
      ];
    });
  };
  const degreedChord = (chord: string): string => {
    let res = chord;

    if (Content === ContentType.HarmonyBased && toneOption) {
      toneOption.value.forEach((item, index) => {
        if (item === chord.split(" ")[0]) {
          res = `${String(RomanNumerals.toRoman(index + 1))}-${chord}`;
        }
      });
    }
    return res;
  };
  const handleBuildChorSet = () => {
    let res = null;
    if (Content === ContentType.TonicBased) {
      if (!tonicOption) {
        return;
      } else {
        let chords = ChordSet.find(
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
      res = toneOption.value
        .map((chord) =>
          pickFirstChordFromGroup(List.find((c) => c[0] === chord))
        )
        .filter(Boolean);
      if (AllowRepeat) setQueue((prev) => [...prev, ...res]);
      else setQueue(res);
    }
    setNowChord(res[0]);
  };

  const handleChangeChordForm = (chord) => {
    const chordOrigin = List.find((item) => item[0] === chord[0].split(" ")[0]);
    const group = createGroupFromOneChord(chordOrigin);
    let idx = group.findIndex((chrd) => chrd[0] === chord[0]);
    if (idx === -1) return;
    const next = findNext(group, idx);
    idx = Queue.findIndex((item) => item[2] === chord[2]);
    if (idx !== -1) {
      Queue[idx] = next;
      setQueue(Queue);
      setNowChord(next);
    }
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(Queue);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setQueue(newItems);
  };

  const ChordList = (
    <datalist id="team_list">
      {List.map((item, index) => {
        return <option key={index} value={item[0]} />;
      })}
    </datalist>
  );

  return (
    <ChordPageContext.Provider
      value={{
        HideForm,
        HideDegree,
        AllowRepeat,
        Content,
        ShowMenu,
        handleShowMenu,
        Mode,
        handleChangeMode,
        Queue,
        handleClearQueue,
        ringOption,
        handleChangeRingOption,
        NowChord,
        setNowChord,
        IntervalChord,
        handleSliderIntervalChordChange,
        toneOption,
        handleChangeToneOption,
        noteOption,
        handleChangeNoteOption,
        tonicOption,
        handleChangeTonicOption,
        harmonyOption,
        handleChangeHarmonyOption,
        handleAdd,
        handleDelete,
        handleShowAll,
        degreedChord,
        handleBuildChorSet,
        handleChangeChordForm,
        handleOnDragEnd,
        ChordList,
        handleChangeContent,
        handleHideForm,
        handleHideDegree,
        handleChangeAllowRepeat,
      }}
    >
      {children}
    </ChordPageContext.Provider>
  );
}

const ChordPage = () => {
  return (
    <ChordProvider>
      <div className="flex flex-row min-h-screen max-h-screen	 justify-center ">
        <SettingPart />
        <ChordPart />
        <ListPart />
      </div>
    </ChordProvider>
  );
};

export default ChordPage;
