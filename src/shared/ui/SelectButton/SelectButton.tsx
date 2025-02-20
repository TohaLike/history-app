import React from "react";
import style from "./selectbutton.module.scss";
import { ButtonProps } from "@/types";

export const SelectButton: React.FC<ButtonProps> = ({ onClick, icon, disabled }) => {
  return (
    <button className={style.select__button} onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
};
