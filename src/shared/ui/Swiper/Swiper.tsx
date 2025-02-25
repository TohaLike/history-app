import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./swiper.module.scss";
import { Swiper as MainSwiper, SwiperRef, SwiperSlide } from "swiper/react";
import { SwiperItemProps } from "@/types";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SwiperButton } from "../SwiperButton/SwiperButton";
import { SelectControls } from "../SelectControls/SelectControls";
import { Pagination } from "swiper/modules";
import { AppContext } from "@/app/App";
import gsap from "gsap";
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
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [paginationEnabled, setPaginationEnabled] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  const swiperKey = `swiper-${paginationEnabled}`;

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
      setCurrentYear((prev: number) => prev + 1);
      setIsCircleAnimationComplete(true);
      setThemeChanged(false);
    }, 100);
  };

  const handleChange = (index: number) => {
    setIsCircleAnimationComplete(false);
    setThemeChanged(true);

    setTimeout(() => {
      setCurrentYear(index);
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

  useEffect(() => {
    setIsBeginning(true);
    setIsEnd(false);

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [themeChanged]);

  return (
    <>
      <div ref={containerRef}>
        <div className={style.swiper}>
          {isCircleAnimationComplete && (
            <div>
              <h2 className={style.title}>{YEARS[currentYear].category}</h2>

              <div className={style.swiper__container}>
                {!isBeginning && (
                  <div className={style.button__prev}>
                    <SwiperButton
                      onClick={prevSlide}
                      icon={<LeftArrowIcon />}
                      disabled={isBeginning}
                    />
                  </div>
                )}

                <MainSwiper
                  key={swiperKey}
                  ref={swiperRef}
                  slidesPerView={"auto"}
                  spaceBetween={30}
                  modules={[Pagination]}
                  pagination={{ el: null }}
                  onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                  }}
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

                {!isEnd && (
                  <div className={style.button__next}>
                    <SwiperButton
                      onClick={nextSlide}
                      icon={<RightArrowIcon />}
                      disabled={isEnd}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={style.swiper__controls}>
        <SelectControls prevButton={prevCategory} nextButton={nextCategory} />
        <div className={style.custom__pagination}>
          {Array.from({
            length: YEARS.length,
          }).map((_, index) => (
            <span
              key={index}
              className={currentYear === index ? style.active : style.dot}
              onClick={() => handleChange(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
