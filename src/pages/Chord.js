import React, { useEffect, useRef, useState } from "react";
import { RisingBeat } from "../features/sound";
import { Button } from "react-bootstrap";
import ListJSON from "../resource/chord/chordlibrary.json";
import ListBasicJSON from "../resource/chord/basicchord.json";

import { createChordImage } from "../features/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBriefcase,
  faLayerGroup,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export function findBabyChord(chord) {
  let min = 20;
  let result = null;
  for (let idx = 0; idx < chord.length; idx++) {
    //for each finger style (object {p,f}) of this input chord
    let p = chord[idx].p.split(",");
    for (let i = 0; i < p.length; i++) {
      //for each word in number-string in f of a finger style
      if (p[i] === "x") {
      } else if (Number(p[i]) < min) {
        min = Number(p[i]);
        result = chord[idx];
      }
    }
  }

  return result;
}

const ChordPage = () => {
  const List = Object.entries(ListJSON);
  const BasicList = Object.entries(ListBasicJSON);
  const [RecommendList, setRecommendList] = useState([]);
  const [ShowMenu, setShowMenu] = useState(false);
  const [Queue, setQueue] = useState([]);
  const [Mode, setMode] = useState("Single");
  const [CurrentChord, setCurrentChord] = useState(null);
  const [Group, setGroup] = useState(false);
  const [NowChord, setNowChord] = useState(null);
  var Interval = useRef(null);
  var NowChordRef = useRef(null);

  useEffect(() => {
    NowChordRef.current = NowChord;
  }, [NowChord]);
  const handleChangeMode = () => {
    if (Mode === "Single") {
      setMode("Multiple");

      Interval.current = setInterval(() => {
        if (!NowChordRef.current) {
          setNowChord(Queue[0]);
        } else {
          let idx = Queue.findIndex(
            (item) => item[0] === NowChordRef.current[0]
          );

          if (idx === -1 || idx === Queue.length - 1) {
            setNowChord(Queue[0]);
          } else {
            setNowChord(Queue[idx + 1]);
          }
        }
      }, 1000);
    } else {
      setMode("Single");
      clearInterval(Interval.current);
    }
  };

  const [Baby, setBaby] = useState(false);

  const handleAdd = (chord) => {
    if (!chord || chord === "0") return;
    if (!Queue.find((item) => item[0] === chord)) {
      if (
        typeof chord === "string" &&
        !Queue.includes((item) => item[0] === chord)
      ) {
        let AddingChord = Object.entries(ListJSON).find(
          (item) => item[0] === chord
        );
        if (AddingChord) {
          setQueue((prev) => [...prev, AddingChord]);
        }
      }
    }
  };
  const handleDelete = (chord) => {
    if (!chord || chord === "0") return;
    setQueue(Queue.filter((item) => item[0] !== chord));
  };
  const handleShowBaby = (chord) => {
    setBaby(!Baby);
    if (!Baby) {
      chord = Object.entries(ListJSON).find((item) => item[0] === chord);
      if (chord) setNowChord(chord);
    }
  };
  const handleShowAll = (chord) => {
    setGroup(true);
  };
  const handlePracticeThis = (chord) => {
    setGroup(true);
    setMode("Single");
  };
  const handleShowMenu = () => {
    setShowMenu(!ShowMenu);
  };

  return (
    <div className="Chord-Screen">
      <datalist id="team_list">
        {Object.entries(ListJSON).map((item, index) => {
          return <option key={index} value={item[0]} />;
        })}
      </datalist>
      <label>Thêm hợp âm: </label>
      <input
        type="text"
        name="team"
        id="favorite_team"
        list="team_list"
        onClick={(e) => handleAdd(e.target.value)}
      />

      <div className="Chord-QueueScreen">
        <Button onClick={() => handleShowMenu()} variant="primary">
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <br />

        <ul className="Chord-QueueList">
          {Queue &&
            Queue.map((item, index) => {
              return (
                <li className="Chord-QueueList-Item" key={index}>
                  {ShowMenu && (
                    <div className="Chord-Menu">
                      <Button
                        onClick={() => handleAdd(item[0])}
                        variant="success"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                      <Button
                        onClick={() => handleDelete(item[0])}
                        variant="danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />{" "}
                      </Button>
                      <Button
                        onClick={() => handleShowAll(item[0])}
                        variant="light"
                      >
                        <FontAwesomeIcon icon={faLayerGroup} />{" "}
                      </Button>
                      <Button
                        onClick={() => handlePracticeThis(item[0])}
                        variant="secondary"
                      >
                        <FontAwesomeIcon icon={faBriefcase} />{" "}
                      </Button>
                    </div>
                  )}

                  <Button
                    onClick={() => handleShowBaby(item[0])}
                    variant="warning"
                    className="Chord-Name"
                  >
                    {<h3> {item[0]}</h3>}
                  </Button>
                  {Baby &&
                    item[0] === NowChord[0] &&
                    createChordImage(item, true, false)}
                </li>
              );
            })}
        </ul>
      </div>
      <Button variant="secondary" onClick={() => handleChangeMode()}>
        {Mode}
      </Button>
      <div className="Chord-ImageBox">
        {NowChord && createChordImage(NowChord, true, true)}
      </div>
      <RisingBeat />
    </div>
  );
};

export default ChordPage;
