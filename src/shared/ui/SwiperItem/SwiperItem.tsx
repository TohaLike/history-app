import React from "react";
import style from "./swiperitem.module.scss";
import { SwiperItemProps } from "src/types";
import { SwiperSlide } from "swiper/react";
import "swiper/css";

export const SwiperItem: React.FC<SwiperItemProps> = ({
  year,
  description,
}) => {
  return (
    <>
      <SwiperSlide>
        <div className={style.swiper__slide}>
          <h2 className={style.swiper__year}>{year || "Год"}</h2>
          <p className={style.swiper__description}>
            {description || "Описание"}
          </p>
        </div>
      </SwiperSlide>
    </>
  );
};
