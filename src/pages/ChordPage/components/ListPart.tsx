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
    listRef,
  } = useContext(ChordPageContext);
  const { theme, language } = useContext(GlobalContext);

  const ButtonArea = () => {
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
          noteTooltip={lang[language].ListPart.ToolTip.Setting}
        />
      ),

      HideForm: (
        <ButtonOnOff
          handleClick={handleHideForm}
          displayCond={ShowMenu}
          condOn={!HideForm}
          icon={faShapes}
          noteTooltip={lang[language].ListPart.ToolTip.DisplayForm}
        />
      ),
      HideDegree: (
        <ButtonOnOff
          handleClick={handleHideDegree}
          displayCond={ShowMenu && Content === ContentType.HarmonyBased}
          condOn={!HideDegree}
          icon={faStairs}
          noteTooltip={lang[language].ListPart.ToolTip.DisplayDegree}
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
          noteTooltip={lang[language].ListPart.ToolTip.ChangeAllForm}
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
          noteTooltip={lang[language].ListPart.ToolTip.FindFifthAll}
        />
      ),
      IncreaseTone: (
        <ButtonFeature
          handleClick={() => {
            changeTone(true);
          }}
          displayCond={ShowMenu && Content !== ContentType.Custom}
          icon={faUpLong}
          noteTooltip={lang[language].ListPart.ToolTip.IncreaseTone}
        />
      ),
      DecreaseTone: (
        <ButtonFeature
          handleClick={() => {
            changeTone(false);
          }}
          displayCond={ShowMenu && Content !== ContentType.Custom}
          icon={faDownLong}
          noteTooltip={lang[language].ListPart.ToolTip.DecreaseTone}
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
          noteTooltip={lang[language].ListPart.ToolTip.Save}
        />
      ),
      Clear: (
        <ButtonFeature
          handleClick={handleClearQueue}
          displayCond={ShowMenu}
          icon={faBroom}
          hasTooltip={true}
          noteTooltip={lang[language].ListPart.ToolTip.Clear}
        />
      ),
    };
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
    return (
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
  };

  const QueueArea = () => {
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
          <FontAwesomeIcon icon={icon} />
        </Button>
      );
      return hasTooltip ? (
        <HoverTooltip item={butt} note={noteTooltip} />
      ) : (
        <>{butt}</>
      );
    };

    const ButtonChord = ({ item, isShow }) => {
      const ButtList = [
        {
          variant: "info",
          icon: faAnglesRight,
          displayCond: true,
          click: () => handleChangeChordForm(item),
          noteTooltip: lang[language].ListPart.ToolTip.Item.ChangeForm,
        },
        {
          variant: "warning",
          icon: faBolt,
          displayCond: Content === ContentType.HarmonyBased,
          click: () => empowerOneChord(item),
          noteTooltip: lang[language].ListPart.ToolTip.Item.Empower,
        },
        {
          variant: "light",
          icon: faBridge,
          displayCond:
            Content === ContentType.HarmonyBased && findDegree(item[0]) !== 0,
          click: () => findFifth(item),
          noteTooltip: lang[language].ListPart.ToolTip.Item.FindFifth,
        },
        {
          variant: "light",
          icon: faPlus,
          displayCond: Content !== ContentType.HarmonyBased,
          click: () => handleShowAll(item),
          noteTooltip: lang[language].ListPart.ToolTip.Item.ShowAll,
        },
        {
          variant: "danger",
          icon: faTrash,
          displayCond: true,
          click: () => handleDelete(item),
          noteTooltip: lang[language].ListPart.ToolTip.Item.Delete,
        },
      ];

      return (
        isShow && (
          <div className="Chord-Menu">
            {ButtList.map((it, idx) => (
              <ButtonChordItem
                handleClick={it.click}
                displayCond={it.displayCond}
                icon={it.icon}
                variant={it.variant}
                noteTooltip={it.noteTooltip}
                key={idx}
              />
            ))}
          </div>
        )
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
                  {findDegree(nameChord, false)}
                </h3>
              )}
              <h3
                className={`text-2xl ${
                  item[2].includes("PSC") ? "text-gray-500" : "text-black"
                }`}
              >
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

    return (
      <div className="Chord-QueueList">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="playlist">
            {(provided) => (
              <ul
                className="w-full med:w-1/2 mx-auto pt-1 pb-3 flex flex-col justify-start items-center overflow-y-scroll"
                {...provided.droppableProps}
                ref={(el) => {
                  provided.innerRef(el);
                  listRef.current = el;
                }}
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
                            scrollid={item[2]}
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
  };

  return (
    <div
      className={`ListPart-ChordPage ${theme}-Background med:w-full med:h-[80dvh] med:min-h-[80dvh] med:max-h-[80dvh] med:pb-5`}
      id="_ListPart"
    >
      <div
        className={`ListPart-ChordPage-Main ${theme}-ChordPage-ListPart h-full flex-grow med:w-screen`}
      >
        <ButtonArea />
        <QueueArea />
      </div>
    </div>
  );
};

export default ListPart;
