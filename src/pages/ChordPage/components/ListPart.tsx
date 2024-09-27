import React, { useContext } from "react";
import { ChordPageContext } from "./../provider/ChordProvider";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa7,
  faAnglesRight,
  faBolt,
  faBroom,
  faGear,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
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
    NowChord,
    setNowChord,
    handleAdd,
    handleDelete,
    handleShowAll,
    addDegreeToChord,
    handleChangeChordForm,
    handleOnDragEnd,
    ChordList,
    empowerOneChord,
    findFifth
  } = useContext(ChordPageContext);
  return (
    <div className="w-1/6 Chord-QueueScreen flex flex-column justify-start items-center p-2 ">
      <div className="Chord-QueueList bg-blue-200">
        <Select
          options={ChordList}
          placeholder="Choose a chord"
          onChange={handleAdd}
          className="m-2 w-full"
        />

        <Button onClick={() => handleShowMenu()} variant="light">
          <FontAwesomeIcon icon={faGear} />{" "}
        </Button>
        <Button onClick={() => handleClearQueue()} variant="light">
          <FontAwesomeIcon icon={faBroom} />{" "}
        </Button>

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
                    const nameChord = addDegreeToChord(item)[0];
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
                              <div className="Chord-Menu flex flex-column flex-wrap	justify-center">
                                <Button
                                  variant="info"
                                  className="ChorDItemButton"
                                  onClick={() => handleChangeChordForm(item)}
                                >
                                  <FontAwesomeIcon icon={faAnglesRight} />{" "}
                                </Button>
                                {Content === ContentType.HarmonyBased ? (
                                  <>
                                    <Button
                                      variant="warning"
                                      className="ChorDItemButton"
                                      onClick={() =>
                                        empowerOneChord(addDegreeToChord(item))
                                      }
                                    >
                                      <FontAwesomeIcon icon={faBolt} />{" "}
                                    </Button>
                                    <Button
                                      variant="light"
                                      className="ChorDItemButton"
                                      onClick={() =>
                                        findFifth(addDegreeToChord(item))
                                      }
                                    >
                                      <FontAwesomeIcon icon={fa7} className="text-sm"/>
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    variant="light"
                                    className="ChorDItemButton"
                                    onClick={() => handleShowAll(item)}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />{" "}
                                  </Button>
                                )}
                                <Button
                                  onClick={() => handleDelete(item)}
                                  variant="danger"
                                  className="ChorDItemButton"
                                >
                                  <FontAwesomeIcon icon={faTrash} />{" "}
                                </Button>
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
