import React, { useContext, useEffect, useState } from "react";
import style from "./swiper.module.scss";
import { Swiper as MainSwiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperProps } from "swiper/types";
import { SwiperItemProps } from "@/types";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SwiperButton } from "../SwiperButton/SwiperButton";
import { AppContext } from "@/app/App";
import { motion } from "framer-motion";
import "swiper/css";

import { YEARS } from "@/years";

export const Swiper: React.FC = () => {
  const { swiperRef, currentYear, themeChanged, isCircleAnimationComplete } =
    useContext(AppContext);
  const [isSwiper, setIsSwiper] = useState<SwiperProps>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(false);

  const nextSlide = () => {
    swiperRef?.current.swiper.slideNext();
  };

  const prevSlide = () => {
    swiperRef?.current.swiper.slidePrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      key={themeChanged}
    >
      {isCircleAnimationComplete && (
        <div className={style.swiper__container}>
          <div className={style.button__prev}>
            <SwiperButton
              onClick={prevSlide}
              icon={<LeftArrowIcon />}
              disabled={isBeginning}
            />
          </div>

          <MainSwiper
            ref={swiperRef}
            slidesPerView={2}
            spaceBetween={30}
            breakpoints={{
              1090: { slidesPerView: 3.5, spaceBetween: 80 },
            }}
          >
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
              disabled={isEnd}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};
