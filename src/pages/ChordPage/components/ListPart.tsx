import React, { useContext } from "react";
import { ChordPageContext } from "./../provider/ChordProvider";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faArrowUpRightDots,
  faBolt,
  faBridge,
  faBroom,
  faDownLong,
  faGear,
  faPersonWalkingArrowRight,
  faPlus,
  faSave,
  faShapes,
  faStairs,
  faTrash,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ContentType } from "../types/types";
import { GlobalContext } from "../../../provider/globalProvider";
import { Theme } from "../types/themes";
import { findDegree, findForm, refreshChordName } from "../utils/ChordUtils";
import { lang } from "../types/language";
import { HoverTooltip } from "../utils/utilsComponents";

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
    changeTone,
  } = useContext(ChordPageContext);
  const { theme, language } = useContext(GlobalContext);

  const SelectChord = (
    <Select
      options={ChordList}
      placeholder={lang[language].ListPart.PlaceHolder.chooseChord}
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
  );
  const ButtonFeature = ({
    classStyled = "",
    handleClick = null,
    displayCond = true,
    hasTooltip = true,
    icon,
    noteTooltip = "",
  }) => {
    if (!displayCond) return null;

    const butt = (
      <button
        className={`button-ListPart ${classStyled}`}
        onClick={
          handleClick
            ? handleClick
            : () => {
                console.log("Not exist");
              }
        }
        role="button"
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    );
    return hasTooltip ? (
      <HoverTooltip item={butt} note={noteTooltip} />
    ) : (
      <>{butt}</>
    );
  };

  const ButtonOnOff = ({
    handleClick = null,
    classStyled = "",
    icon,
    hasTooltip = true,
    displayCond = true,
    noteTooltip = "",
    condOn,
  }) => {
    if (!displayCond) return null;

    const butt = (
      <button
        role="button"
        className={`button-ListPart ${classStyled}
    ${!HideForm ? `${theme}-Button-On` : `${theme}-Button-Off`}
  `}
        onClick={
          handleClick
            ? handleClick
            : () => {
                console.log("Not exist");
              }
        }
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    );
    return hasTooltip ? (
      <HoverTooltip item={butt} note={noteTooltip} />
    ) : (
      <>{butt}</>
    );
  };

  const ButtonList = {
    ShowMenu: (
      <ButtonFeature
        handleClick={handleShowMenu}
        icon={faGear}
        hasTooltip={true}
        noteTooltip="Hien cai dat"
      />
    ),

    HideForm: (
      <ButtonOnOff
        handleClick={handleHideForm}
        displayCond={ShowMenu}
        condOn={!HideForm}
        icon={faShapes}
        noteTooltip="che form"
      />
    ),
    HideDegree: (
      <ButtonOnOff
        handleClick={handleHideDegree}
        displayCond={ShowMenu && Content === ContentType.HarmonyBased}
        condOn={!HideDegree}
        icon={faStairs}
        noteTooltip="che bac"
      />
    ),
    ChangeForm: (
      <ButtonFeature
        handleClick={() => {
          Queue.forEach((item) => {
            handleChangeChordForm(item);
          });
        }}
        displayCond={ShowMenu}
        icon={faArrowUpRightDots}
        noteTooltip="change all chord form"
      />
    ),

    FindFifth: (
      <ButtonFeature
        handleClick={() => {
          const queue = Queue;
          queue.forEach((item) => {
            findFifth(item);
          });
        }}
        displayCond={ShowMenu && Content === ContentType.HarmonyBased}
        icon={faPersonWalkingArrowRight}
        noteTooltip="find fifth all chord"
      />
    ),
    DecreaseTone: (
      <ButtonFeature
        handleClick={() => {
          changeTone(false);
        }}
        displayCond={ShowMenu && Content !== ContentType.Custom}
        icon={faDownLong}
        noteTooltip="Giam tone"
      />
    ),
    IncreaseTone: (
      <ButtonFeature
        handleClick={() => {
          changeTone(true);
        }}
        displayCond={ShowMenu && Content !== ContentType.Custom}
        icon={faUpLong}
        noteTooltip="Tang tone"
      />
    ),
    Save: (
      <ButtonFeature
        handleClick={() => {
          console.log("Clicked save");
        }}
        displayCond={ShowMenu}
        icon={faSave}
        hasTooltip={true}
        noteTooltip="save"
      />
    ),
    Clear: (
      <ButtonFeature
        handleClick={handleClearQueue}
        displayCond={ShowMenu}
        icon={faBroom}
        hasTooltip={true}
        noteTooltip="clear q"
      />
    ),
  };
  const ButtonArea = (
    <div className="w-full flex flex-col">
      <div className="m-1 w-full SettingPart-settingButtonGroup">
        {Object.entries(ButtonList).map(([key, butt]) => {
          return (
            <div className="inline-block" key={key}>
              {butt}
            </div>
          );
        })}
      </div>
      {SelectChord}
    </div>
  );
  const ButtonChord = ({ item, isShow }) => {
    return (
      isShow && (
        <div className="Chord-Menu">
          <ButtonChordItem
            handleClick={() => handleChangeChordForm(item)}
            icon={faAnglesRight}
            variant="info"
            noteTooltip="handleChangeChordForm"
          />

          <ButtonChordItem
            handleClick={() => empowerOneChord(item)}
            displayCond={Content === ContentType.HarmonyBased}
            icon={faBolt}
            variant="warning"
            noteTooltip="empowerOneChord"
          />

          <ButtonChordItem
            handleClick={() => findFifth(item)}
            displayCond={
              Content === ContentType.HarmonyBased && findDegree(item[0]) !== 0
            }
            icon={faBridge}
            variant="light"
            noteTooltip="findFifth"
          />

          <ButtonChordItem
            handleClick={() => handleShowAll(item)}
            displayCond={Content !== ContentType.HarmonyBased}
            icon={faPlus}
            variant="light"
            noteTooltip="handleShowAll"
          />

          <ButtonChordItem
            handleClick={() => handleDelete(item)}
            icon={faTrash}
            variant="danger"
            noteTooltip="handleDelete"
          />
        </div>
      )
    );
  };

  const ButtonChordItem = ({
    classStyled = "",
    handleClick = null,
    displayCond = true,
    hasTooltip = true,
    icon,
    variant = "info",
    noteTooltip = "",
  }) => {
    if (!displayCond) return null;

    const butt = (
      <Button
        variant={variant}
        className={`ChorDItemButton ${classStyled}`}
        onClick={
          handleClick
            ? handleClick
            : () => {
                console.log("Not exist");
              }
        }
      >
        <FontAwesomeIcon icon={icon} />{" "}
      </Button>
    );
    return hasTooltip ? (
      <HoverTooltip item={butt} note={noteTooltip} />
    ) : (
      <>{butt}</>
    );
  };

  const ItemChord = ({ item }) => {
    const nameChord = addDegreeToChord(item)[0];

    return (
      <div
        className={`ChordItem med:flex-grow ${theme}-ChordPage-SettingPart-ChordItem-${
          NowChord && item[2] === NowChord[2] ? "chosen" : "showing"
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
            <h3
              className={`text-2xl ${
                item[2].includes("PSC") ? "text-gray-500" : "text-black"
              }`}
            >
              {" "}
              {refreshChordName(nameChord)}
            </h3>
            {!HideForm && (
              <h3 className="text-neutral-500">{findForm(nameChord)}</h3>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <h3
              className={`text-2xl ${
                item[2].includes("PSC") ? "text-gray-500" : "text-black"
              }`}
            >
              {" "}
              {refreshChordName(nameChord)}
            </h3>
            {!HideForm && (
              <h3 className="text-neutral-500">{findForm(nameChord)}</h3>
            )}
          </div>
        )}
      </div>
    );
  };
  const QueueArea = (
    <div className="Chord-QueueList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <ul
              className=" mx-auto pb-3 pt-1 w-full flex flex-col justify-start items-center overflow-y-scroll med:w-1/2 "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Queue &&
                Queue.map((item, index) => {
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
                          className="Chord-QueueList-Item med:h-[10vh] med:justify-center "
                          key={item[2]}
                        >
                          <ItemChord item={item} />
                          <ButtonChord item={item} isShow={ShowMenu} />
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
  );
  return (
    <div
      className={`ListPart-ChordPage med:w-full med:min-h-[80dvh] med:max-h-[80dvh] med:h-[80dvh] med:pb-20 ${theme}-Background`}
      id="_ListPart"
    >
      <div
        className={`ListPart-ChordPage-Main  ${theme}-ChordPage-ListPart med:w-screen h-full flex-grow`}
      >
        {ButtonArea}
        {QueueArea}
      </div>
    </div>
  );
};

export default ListPart;
