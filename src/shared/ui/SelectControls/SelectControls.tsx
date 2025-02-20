import React, { useContext } from "react";
import style from "./selectcontrols.module.scss";
import { AppContext } from "@/app/App";
import { SelectButton } from "../SelectButton/SelectButton";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SelectControlsProps } from "@/types";
import { YEARS } from "@/years";

export const SelectControls: React.FC<SelectControlsProps> = ({prevButton, nextButton}) => {
  const { currentYear, setCurrentYear } = useContext(AppContext);

    const toPaddedString = (value: number) => {
      return String(value).padStart(2, "0");
    };
  
    function CurrentList() {
      return `${toPaddedString(currentYear + 1)}/${toPaddedString(YEARS.length)}`;
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
          disabled={currentYear === 0}
        />
        <SelectButton
          icon={<RightArrowIcon />}
          onClick={nextButton}
          disabled={currentYear === YEARS.length - 1}
        />
      </div>
    </div>
  );
};
