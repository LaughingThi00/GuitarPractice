import React, { useContext, useLayoutEffect } from "react";
import { ChordPageContext } from "./../provider/ChordProvider";
import { ContentType, ModeType } from "../types/types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
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
  const { theme, language, groupNav } = useContext(GlobalContext);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--pointer",
      Theme[theme].ChordPage.SettingPart.Slider.Pointer
    );

    document.documentElement.style.backgroundColor = Theme[theme].Background;
  }, [theme]);

  return (
    <div
      className="SettingPart-ChordPage med:w-full med:mb-5"
      id="_SettingPart"
    >
      <div className="flex flex-col justify-center items-center med:flex-row  med:flex-wrap">
        <button
          className={`button-SettingPart med:w-1/4
            ${
              !AllowRepeat
                ? `${Theme[theme].ColorPath[0]}`
                : `${Theme[theme].ColorPath[1]}`
            }
          `}
          onClick={() => handleChangeAllowRepeat()}
          role="button"
        >
          {!AllowRepeat
            ? lang[language].SettingPart.AllowRepeat.Only
            : lang[language].SettingPart.AllowRepeat.Repeated}
        </button>
        <button
          className={`button-SettingPart  med:w-1/4
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
        <button
          className={`button-SettingPart med:w-1/4
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
        {Mode === ModeType.Multiple && (
          <>
            <div className="flex items-center p-2 m-1 border rounded-lg shadow-md bg-white w-4/5 mini:w-90pc">
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
                className="w-full mx-1 range-slider"
                style={{
                  flexGrow: 1,
                }}
              />
              <div className="inline-block font-bold text-gray-700">
                {IntervalChord / 1000} s
              </div>
            </div>
          </>
        )}{" "}
        {Content !== ContentType.Custom && (
          <div className="flex flex-col justify-center items-center w-full med:flex-row med:flex-wrap med:w-4/5  ">
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
              className="w-4/5 m-1 med:w-full"
            />{" "}
            {Content === ContentType.HarmonyBased && (
              <CreatableSelect
                isClearable
                options={optionsRing}
                placeholder={lang[language].SettingPart.PlaceHolder.chooseRing}
                onChange={handleChangeRingOption}
                value={ringOption}
                className="w-4/5 m-1 med:w-full"
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
                          ).find((k) => k === item.label)
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
              className="w-4/5 m-1 med:w-full"
            />
            <button
              disabled={
                !(Content === ContentType.HarmonyBased && toneOption) &&
                !(
                  Content === ContentType.TonicBased &&
                  noteOption &&
                  tonicOption
                )
              }
              className={`button-ListPart ${
                (Content === ContentType.HarmonyBased && toneOption) ||
                (Content === ContentType.TonicBased &&
                  noteOption &&
                  tonicOption)
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
