import React, { useContext } from "react";
import { ChordPageContext } from "./../provider/ChordProvider";
import { ContentType } from "../types/types";
import Select from "react-select";
import {
  optionsHarmonyBased,
  optionsNote,
  optionsRing,
  optionsTone,
  optionsTonicBased,
} from "../options/options";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToDot } from "@fortawesome/free-solid-svg-icons";

const SettingPart = () => {
  const {
    HideForm,
    HideDegree,
    AllowRepeat,
    Content,
    toneOption,
    handleChangeToneOption,
    noteOption,
    handleChangeNoteOption,
    tonicOption,
    handleChangeTonicOption,
    harmonyOption,
    handleChangeHarmonyOption,
    handleBuildChorSet,
    handleHideForm,
    handleHideDegree,
    handleChangeContent,
    handleChangeAllowRepeat,
    handleChangeRingOption,
    ringOption,
  } = useContext(ChordPageContext);

  return (
    <div className="w-1/6 flex flex-column bg-blue-200">
      <div className="flex flex-column">
        <Button onClick={handleHideForm} variant="success">
          HideForm: {String(HideForm)}
        </Button>

        <Button onClick={handleHideDegree} variant="success">
          HideDegree: {String(HideDegree)}
        </Button>

        <Button variant="secondary" onClick={() => handleChangeContent()}>
          {Content}
        </Button>
        <Button variant="secondary" onClick={() => handleChangeAllowRepeat()}>
          {AllowRepeat ? "Repeated" : "Only"}
        </Button>

        {Content !== ContentType.Custom && (
          <div>
            <Select
              placeholder={
                Content === ContentType.TonicBased
                  ? "Choose a note"
                  : "Choose a tone"
              }
              onChange={
                Content === ContentType.TonicBased
                  ? handleChangeNoteOption
                  : handleChangeToneOption
              }
              value={
                Content === ContentType.TonicBased ? noteOption : toneOption
              }
              options={
                Content === ContentType.TonicBased ? optionsNote : optionsTone
              }
              className="m-2"
            />
            <Select
              options={
                Content === ContentType.TonicBased
                  ? optionsTonicBased
                  : optionsHarmonyBased
              }
              onChange={
                Content === ContentType.TonicBased
                  ? handleChangeTonicOption
                  : handleChangeHarmonyOption
              }
              value={
                Content === ContentType.TonicBased ? tonicOption : harmonyOption
              }
              placeholder="Choose an option"
              className="m-2"
            />
            {Content === ContentType.HarmonyBased && (
              <Select
                options={optionsRing}
                placeholder="Choose a chord ring"
                onChange={handleChangeRingOption}
                value={ringOption}
                className="m-2"
              />
            )}
            <Button onClick={() => handleBuildChorSet()} variant="success">
              <FontAwesomeIcon icon={faArrowsToDot} />{" "}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingPart;
