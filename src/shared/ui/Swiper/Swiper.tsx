import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./swiper.module.scss";
import { Swiper as MainSwiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Swiper as SwiperProps } from "swiper/types";
import { SwiperItemProps } from "@/types";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SwiperButton } from "../SwiperButton/SwiperButton";
import { SelectControls } from "../SelectControls/SelectControls";
import { Pagination } from "swiper/modules";
import { AppContext } from "@/app/App";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

import { YEARS } from "@/years";

export const Swiper: React.FC = () => {
  const {
    currentYear,
    themeChanged,
    isCircleAnimationComplete,
    setCurrentYear,
    setIsCircleAnimationComplete,
    setThemeChanged,
  } = useContext(AppContext);
  const [isSwiper, setIsSwiper] = useState<SwiperProps>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(false);
  const [paginationEnabled, setPaginationEnabled] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const swiperRef = useRef<SwiperRef>(null);

  const nextSlide = () => {
    swiperRef?.current.swiper.slideNext();
  };

  const prevSlide = () => {
    swiperRef?.current.swiper.slidePrev();
  };

  const prevCategory = () => {
    if (currentYear === 0) return;

    setIsCircleAnimationComplete(false);
    setThemeChanged(true);

    setTimeout(() => {
      setActiveIndex(0);
      setCurrentYear((prev: number) => prev - 1);
      setIsCircleAnimationComplete(true);
      setThemeChanged(false);
    }, 100);
  };
  const nextCategory = () => {
    if (currentYear === YEARS.length - 1) return;

    setIsCircleAnimationComplete(false);
    setThemeChanged(true);

    setTimeout(() => {
      setActiveIndex(0);
      setCurrentYear((prev: number) => prev + 1);
      setIsCircleAnimationComplete(true);
      setThemeChanged(false);
    }, 100);
  };

  useEffect(() => {
    const handleResize = () => {
      setPaginationEnabled(window.innerWidth <= 1090);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const swiperKey = `swiper-${paginationEnabled}`;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        key={themeChanged}
      >
        <div className={style.swiper}>
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
                key={swiperKey}
                ref={swiperRef}
                slidesPerView={"auto"}
                spaceBetween={30}
                modules={[Pagination]}
                pagination={{ el: null }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                breakpoints={{
                  1090: {
                    spaceBetween: 80,
                  },
                }}
              >
                {YEARS[currentYear].data.map(
                  (e: SwiperItemProps, i: number) => (
                    <SwiperSlide
                      key={`slide-${i}`}
                      style={{ maxWidth: "320px" }}
                      className={style.swiper__slide}
                    >
                      <h2 className={style.swiper__year}>{e.year}</h2>
                      <p className={style.swiper__description}>
                        {e.description}
                      </p>
                    </SwiperSlide>
                  )
                )}
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
        </div>
      </motion.div>

      <div className={style.swiper__controls}>
        <SelectControls prevButton={prevCategory} nextButton={nextCategory} />
        <div className={style.custom__pagination}>
          {YEARS[currentYear].data.map((_, index) => (
            <span
              key={index}
              className={activeIndex === index ? style.active : style.dot}
              onClick={() => swiperRef.current?.swiper.slideTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
