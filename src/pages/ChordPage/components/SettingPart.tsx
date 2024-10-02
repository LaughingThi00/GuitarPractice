import React, { useContext, useLayoutEffect } from "react";
import { ChordPageContext } from "./../provider/ChordProvider";
import { ContentType, ModeType } from "../types/types";
import Select from "react-select";
import {
  optionsHarmonyBased,
  optionsNote,
  optionsRing,
  optionsTone,
  optionsTonicBased,
} from "../options/options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { Theme } from "../types/themes";
import { GlobalContext } from "../../../provider/globalProvider";
import { lang } from "../types/language";

const SettingPart = () => {
  const {
    AllowRepeat,
    Content,
    toneOption,
    IntervalChord,
    Mode,
    handleChangeToneOption,
    noteOption,
    handleChangeNoteOption,
    tonicOption,
    handleChangeTonicOption,
    harmonyOption,
    handleChangeHarmonyOption,
    handleBuildChorSet,
    handleChangeContent,
    handleChangeAllowRepeat,
    handleChangeRingOption,
    ringOption,
    handleChangeMode,
    handleSliderIntervalChordChange,
  } = useContext(ChordPageContext);
  const { theme, language } = useContext(GlobalContext);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--pointer",
      Theme[theme].ChordPage.SettingPart.Slider.Pointer
    );
  }, [theme]);
  return (
    <div className="SettingPart-ChordPage ">
      <div className="flex flex-column justify-center items-center">
        <button
          className={`button-SettingPart
            ${
              AllowRepeat
                ? `${Theme[theme].ColorPath[0]}`
                : `${Theme[theme].ColorPath[1]}`
            }
          `}
          onClick={() => handleChangeAllowRepeat()}
          role="button"
        >
          {AllowRepeat
            ? lang[language].SettingPart.AllowRepeat.Only
            : lang[language].SettingPart.AllowRepeat.Repeated}
        </button>
        <button
          className={`button-SettingPart
            ${
              Mode === ModeType.Single
                ? `${Theme[theme].ColorPath[0]}`
                : `${Theme[theme].ColorPath[1]}`
            }`}
          onClick={() => handleChangeMode()}
          role="button"
        >
          {
            lang[language].SettingPart.ChangingMode[
              Object.keys(lang[language].SettingPart.ChangingMode).find(
                (key) => key === Mode
              )
            ]
          }
        </button>

        {Mode === ModeType.Multiple && (
          <>
            <div className="flex items-center p-2 m-1 border rounded-lg shadow-md bg-white w-4/5">
              <FontAwesomeIcon
                className={` mr-2`}
                icon={faClock}
                style={{
                  color: Theme[theme].ChordPage.SettingPart.Slider.Pointer,
                }}
              />
              <input
                id="IntervalChord"
                type="range"
                min="1000"
                max="20000"
                step="1000"
                value={IntervalChord}
                onChange={handleSliderIntervalChordChange}
                className="w-full mx-1  range-slider"
                style={{
                  flexGrow: 1,
                }}
              />
              <div className="inline-block font-bold text-gray-700">
                {IntervalChord / 1000} s
              </div>
            </div>
          </>
        )}
        <button
          className={`button-SettingPart
            ${
              Content === ContentType.Custom
                ? `${Theme[theme].ColorPath[0]}`
                : Content === ContentType.TonicBased
                ? `${Theme[theme].ColorPath[1]}`
                : `${Theme[theme].ColorPath[2]}`
            }
          `}
          onClick={() => handleChangeContent()}
          role="button"
        >
          {
            lang[language].SettingPart.Content[
              Object.keys(lang[language].SettingPart.Content).find(
                (key) => key === Content
              )
            ]
          }
        </button>

        {Content !== ContentType.Custom && (
          <div className="flex flex-column justify-center items-center w-full">
            <Select
              placeholder={
                Content === ContentType.TonicBased
                  ? lang[language].SettingPart.PlaceHolder.chooseNote
                  : lang[language].SettingPart.PlaceHolder.chooseTone
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
              className="w-4/5 m-1"
            />{" "}
            {Content === ContentType.HarmonyBased && (
              <Select
                options={optionsRing}
                placeholder={lang[language].SettingPart.PlaceHolder.chooseRing}
                onChange={handleChangeRingOption}
                value={ringOption}
                className="w-4/5 m-1"
              />
            )}
            <Select
              options={
                Content === ContentType.TonicBased
                  ? optionsTonicBased.map((item) => ({
                      value: item.value,
                      label:
                        lang[language].SettingPart.TonicTypeOption[
                          Object.keys(
                            lang[language].SettingPart.TonicTypeOption
                          ).find((k) => k === item.value)
                        ],
                    }))
                  : optionsHarmonyBased.map((item) => ({
                      value: item.value,
                      label:
                        lang[language].SettingPart.HarmonyTypeOption[
                          Object.keys(
                            lang[language].SettingPart.HarmonyTypeOption
                          ).find((k) => k === item.value)
                        ],
                    }))
              }
              onChange={
                Content === ContentType.TonicBased
                  ? handleChangeTonicOption
                  : handleChangeHarmonyOption
              }
              value={
                Content === ContentType.TonicBased ? tonicOption : harmonyOption
              }
              placeholder={lang[language].SettingPart.PlaceHolder.chooseOption}
              className="w-4/5 m-1"
            />
            <button
              className={`button-ListPart mt-3 ${
                toneOption || (noteOption && tonicOption)
                  ? Theme[theme].Button.On
                  : Theme[theme].Button.Off
              }`}
              onClick={() => handleBuildChorSet()}
              role="button"
            >
              <FontAwesomeIcon icon={faArrowsToDot} />{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingPart;
