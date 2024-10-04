import React, { useContext } from "react";
import { ChordPageContext } from "./../provider/ChordProvider";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa7,
  faAnglesRight,
  faBolt,
  faBridge,
  faBroom,
  faGear,
  faPersonWalkingArrowRight,
  faPlus,
  faSave,
  faShapes,
  faStairs,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ContentType } from "../types/types";
import { GlobalContext } from "../../../provider/globalProvider";
import { Theme } from "../types/themes";
import { findDegree, findForm, refreshChordName } from "../utils/utils";
import { lang } from "../types/language";

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
    findFifth,
    handleHideForm,
    handleHideDegree,
  } = useContext(ChordPageContext);
  const { theme, language } = useContext(GlobalContext);
  return (
    <div
      className={`ListPart-ChordPage med:w-full med:min-h-[50dvh] med:max-h-[50dvh] med:h-[50dvh] med:pb-20 ${theme}-Background`}
    >
      <div
        className={`ListPart-ChordPage-Main  ${theme}-ChordPage-ListPart w-full`}
      >
        <div className="w-full flex flex-col">
          <div className="m-1 w-full  SettingPart-settingButtonGroup">
            <button
              className="button-ListPart"
              onClick={() => handleShowMenu()}
              role="button"
            >
              <FontAwesomeIcon icon={faGear} />{" "}
            </button>
            {ShowMenu && (
              <>
                {" "}
                <button className="button-ListPart" role="button">
                  <FontAwesomeIcon icon={faSave} />{" "}
                </button>
                <button
                  onClick={handleHideForm}
                  role="button"
                  className={`button-ListPart
                      ${
                        !HideForm ? `${theme}-Button-On` : `${theme}-Button-Off`
                      }
                    `}
                >
                  <FontAwesomeIcon icon={faShapes} />{" "}
                </button>
                {Content === ContentType.HarmonyBased && (
                  <button
                    onClick={handleHideDegree}
                    role="button"
                    className={`button-ListPart
                      ${
                        !HideDegree
                          ? `${theme}-Button-On`
                          : `${theme}-Button-Off`
                      }
                    `}
                  >
                    <FontAwesomeIcon icon={faStairs} />
                  </button>
                )}
                <button
                  className="button-ListPart"
                  onClick={() => handleClearQueue()}
                  role="button"
                >
                  <FontAwesomeIcon icon={faBroom} />{" "}
                </button>
              </>
            )}
          </div>{" "}
          <Select
            options={ChordList}
            placeholder={lang[language].ListPart.PlaceHolder.chooseChord}
            menuPlacement={window.innerWidth <= 900 ? "top" : "bottom"}
            onChange={handleAdd}
            className="w-full mb-1 font-bold med:w-4/5  med:ml-auto med:mr-auto "
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor:
                  Theme[theme].ChordPage.ListPart.ChordSelect.mainColor,
                borderColor: state.isFocused
                  ? Theme[theme].ChordPage.ListPart.ChordSelect.mainColor
                  : Theme[theme].ChordPage.ListPart.ChordSelect.mainColor,
                "&:hover": {
                  opacity: "0.8",
                },
                outline: "none",
                boxShadow: state.isFocused
                  ? `0 0 5px ${Theme[theme].ChordPage.ListPart.ChordSelect.secondColor}`
                  : "none",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? Theme[theme].ChordPage.ListPart.ChordSelect.mainColor
                  : Theme[theme].ChordPage.ListPart.ChordSelect.secondColor,
                "&:hover": {
                  backgroundColor: state.isSelected
                    ? Theme[theme].ChordPage.ListPart.ChordSelect.mainColor
                    : Theme[theme].ChordPage.ListPart.ChordSelect.secondColor,
                  opacity: "0.8",
                },
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
                backgroundColor:
                  Theme[theme].ChordPage.ListPart.ChordSelect.mainColor,
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "gray",
                fontWeight: "normal",
              }),
            }}
          />
        </div>
        <div className=" w-full h-full overflow-y-scroll">
          <div className="Chord-QueueList">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="playlist">
                {(provided) => (
                  <ul
                    className=" pb-3 pt-1 w-full"
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
                                className="Chord-QueueList-Item med:h-[8vh]"
                                key={item[2]}
                              >
                                <div
                                  className={`ChordItem ${theme}-ChordPage-SettingPart-ChordItem-${
                                    NowChord && item[2] === NowChord[2]
                                      ? "chosen"
                                      : "showing"
                                  }`}
                                  onClick={() => {
                                    setNowChord(item);
                                  }}
                                >
                                  {nameChord.includes("-") ? (
                                    <div className="flex flex-col">
                                      {!HideDegree && (
                                        <h3 className="text-xs text-red-500">
                                          {" "}
                                          {findDegree(nameChord, false)}
                                        </h3>
                                      )}
                                      <h3 className="text-2xl">
                                        {" "}
                                        {refreshChordName(nameChord)}
                                      </h3>
                                      {!HideForm && (
                                        <h3 className="text-neutral-500">
                                          {findForm(nameChord)}
                                        </h3>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col">
                                      <h3 className="text-2xl">
                                        {" "}
                                        {refreshChordName(nameChord)}
                                      </h3>
                                      {!HideForm && (
                                        <h3 className="text-neutral-500">
                                          {findForm(nameChord)}
                                        </h3>
                                      )}
                                    </div>
                                  )}
                                </div>
                                {ShowMenu && (
                                  <div className="Chord-Menu">
                                    <Button
                                      variant="info"
                                      className="ChorDItemButton"
                                      onClick={() =>
                                        handleChangeChordForm(item)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faAnglesRight} />{" "}
                                    </Button>
                                    {Content === ContentType.HarmonyBased ? (
                                      <>
                                        <Button
                                          variant="warning"
                                          className="ChorDItemButton"
                                          onClick={() =>
                                            empowerOneChord(
                                              addDegreeToChord(item)
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon icon={faBolt} />{" "}
                                        </Button>
                                        {findDegree(item[0]) !== 0 && (
                                          <Button
                                            variant="light"
                                            className="ChorDItemButton"
                                            onClick={() => findFifth(item)}
                                          >
                                            <FontAwesomeIcon
                                              icon={faBridge}
                                              className="text-sm"
                                            />
                                          </Button>
                                        )}
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
      </div>
    </div>
  );
};

export default ListPart;
