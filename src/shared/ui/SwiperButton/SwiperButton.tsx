import React from "react";
import style from "./swiperbutton.module.scss";
import { ButtonProps } from "@/types";

export const SwiperButton: React.FC<ButtonProps> = ({ onClick, icon, disabled }) => {
  return (
    <button onClick={onClick} className={style.swiper__button} disabled={disabled}>
      {icon}
    </button>
  );
};