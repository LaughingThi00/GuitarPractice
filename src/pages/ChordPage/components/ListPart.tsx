import React, { useContext } from "react";
import { ChordPageContext } from "../Chord";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faBroom,
  faGear,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { optionsRing } from "../options/options";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ContentType } from "../types/types";

const ListPart = () => {
  const {
    HideForm,
    HideDegree,
    Content,
    ShowMenu,
    handleShowMenu,
    Queue,
    handleClearQueue,
    ringOption,
    handleChangeRingOption,
    NowChord,
    setNowChord,
    handleAdd,
    handleDelete,
    handleShowAll,
    degreedChord,
    handleChangeChordForm,
    handleOnDragEnd,
  } = useContext(ChordPageContext);
  return (
    <div className="w-1/6 Chord-QueueScreen flex flex-column justify-start items-center p-2 ">
      <div className="Chord-QueueList bg-blue-200">
        <div className="my-4">
          <input
            placeholder="Choose a chord"
            type="text"
            name="team"
            id="favorite_team"
            list="team_list"
            className="p-2 w-full border-gray-300 rounded"
            onClick={(e) => handleAdd(e.currentTarget.value)}
          />
        </div>
        <Button onClick={() => handleShowMenu()} variant="light">
          <FontAwesomeIcon icon={faGear} />{" "}
        </Button>
        <Button onClick={() => handleClearQueue()} variant="light">
          <FontAwesomeIcon icon={faBroom} />{" "}
        </Button>

        <Select
          options={optionsRing}
          placeholder="Choose a chord ring"
          onChange={handleChangeRingOption}
          value={ringOption}
          className="m-2"
        />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="playlist">
            {(provided) => (
              <ul
                className=" w-4/5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Queue &&
                  Queue.map((item, index) => {
                    const nameChord = degreedChord(item[0]);
                    return (
                      <Draggable
                        key={item[2]}
                        draggableId={item[2]}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                            className="Chord-QueueList-Item flex flex-row"
                            key={item[2]}
                          >
                            <div
                              className={
                                NowChord && item[2] === NowChord[2]
                                  ? "ChordItem ChordItemShowing"
                                  : Queue.filter(
                                      (itm) =>
                                        itm[0].split(" ")[0] ===
                                        item[0].split(" ")[0]
                                    ).length >= 1 && item[0].includes("[")
                                  ? "ChordItem ChordItemChosen "
                                  : "ChordItem ChordItemGroup"
                              }
                              onClick={() => {
                                setNowChord(item);
                              }}
                            >
                              {nameChord.includes("-") ? (
                                <div className="flex flex-column">
                                  {!HideDegree && (
                                    <h3 className="text-xs text-red-500">
                                      {" "}
                                      {nameChord.split("-")[0]}
                                    </h3>
                                  )}
                                  <h3 className="text-2xl">
                                    {" "}
                                    {nameChord.split("-")[1].split(" ")[0]}
                                  </h3>
                                  {!HideForm &&
                                    nameChord.split(" ").length > 1 && (
                                      <h3 className="text-neutral-500">
                                        {nameChord.split("-")[1].split(" ")[1]}
                                      </h3>
                                    )}
                                </div>
                              ) : (
                                <div className="flex flex-column">
                                  <h3 className="text-2xl">
                                    {" "}
                                    {nameChord.split(" ")[0]}
                                  </h3>
                                  {!HideForm &&
                                    nameChord.split(" ").length > 1 && (
                                      <h3 className="text-neutral-500">
                                        {nameChord.split(" ")[1]}
                                      </h3>
                                    )}
                                </div>
                              )}
                            </div>
                            {ShowMenu && (
                              <div className="Chord-Menu flex flex-column">
                                <Button
                                  onClick={() => handleDelete(item)}
                                  variant="danger"
                                  className="p-2 text-xl flex items-center justify-center "
                                >
                                  <FontAwesomeIcon icon={faTrash} />{" "}
                                </Button>
                                <Button
                                  variant="info"
                                  className="p-2 text-xl flex items-center justify-center "
                                  onClick={() => handleChangeChordForm(item)}
                                >
                                  <FontAwesomeIcon icon={faAnglesRight} />{" "}
                                </Button>
                                {Content === ContentType.Custom && (
                                  <Button
                                    variant="light"
                                    className="p-2 text-xl flex items-center justify-center "
                                    onClick={() => handleShowAll(item)}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />{" "}
                                  </Button>
                                )}
                              </div>
                            )}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ListPart;
