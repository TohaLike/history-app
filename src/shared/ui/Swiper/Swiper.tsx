import React, { useContext } from "react";
import style from "./swiper.module.scss";
import { Swiper as MainSwiper, SwiperSlide } from "swiper/react";
import { SwiperItemProps } from "@/types";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SwiperButton } from "../SwiperButton/SwiperButton";
import { AppContext } from "@/app/App";
import "swiper/css";

import { YEARS } from "@/years";

export const Swiper: React.FC = () => {
  const { swiperRef, currentYear } = useContext<any>(AppContext);

  const nextSlide = () => {
    swiperRef?.current.swiper.slideNext();
  };

  const prevSlide = () => {
    swiperRef?.current.swiper.slidePrev();
  };

  return (
    <div className={style.swiper__container}>
      <div className={style.button__prev}>
        <SwiperButton
          onClick={prevSlide}
          icon={<LeftArrowIcon />}
          disabled={false}
        />
      </div>

      <MainSwiper ref={swiperRef} slidesPerView={3.5} spaceBetween={80}>
        {YEARS[currentYear].data.map((e: SwiperItemProps, i: number) => (
          <SwiperSlide
            key={`slide-${i}`}
            style={{ maxWidth: "320px" }}
            className={style.swiper__slide}
          >
            <h2 className={style.swiper__year}>{e.year}</h2>
            <p className={style.swiper__description}>{e.description}</p>
          </SwiperSlide>
        ))}
      </MainSwiper>

      <div className={style.button__next}>
        <SwiperButton
          onClick={nextSlide}
          icon={<RightArrowIcon />}
          disabled={false}
        />
      </div>
    </div>
  );
};
