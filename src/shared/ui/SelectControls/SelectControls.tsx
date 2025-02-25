import React from "react";
import style from "./selectcontrols.module.scss";
import { SelectButton } from "../SelectButton/SelectButton";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SelectControlsProps } from "@/types";

export const SelectControls: React.FC<SelectControlsProps> = ({
  arrLength,
  index,
  prevButton,
  nextButton,
}) => {
  const toPaddedString = (value: number) => {
    return String(value).padStart(2, "0");
  };

  function CurrentList() {
    return `${toPaddedString(index + 1)}/${toPaddedString(arrLength)}`;
  }

  return (
    <div>
      <div className={style.current__list}>
        <span>
          <CurrentList />
        </span>
      </div>

      <div className={style.buttons__container}>
        <SelectButton
          icon={<LeftArrowIcon />}
          onClick={prevButton}
          disabled={index === 0}
        />
        <SelectButton
          icon={<RightArrowIcon />}
          onClick={nextButton}
          disabled={index === arrLength - 1}
        />
      </div>
    </div>
  );
};
