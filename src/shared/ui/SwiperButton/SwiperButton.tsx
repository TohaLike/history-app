import React from "react";
import style from "./swiperbutton.module.scss";
import { SwiperButtonProps } from "@/types";

export const SwiperButton: React.FC<SwiperButtonProps> = ({ onClick, icon, disabled }) => {
  return (
    <button onClick={onClick} className={style.button} disabled={disabled}>
      {icon}
    </button>
  );
};