import React, { useEffect, useRef, useState } from "react";
import style from "./swiper.module.scss";
import { Swiper as MainSwiper, SwiperRef, SwiperSlide } from "swiper/react";
import { SwiperItemProps, SwiperProps } from "@/types";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SwiperButton } from "../SwiperButton/SwiperButton";
import { SelectControls } from "../SelectControls/SelectControls";
import { Pagination } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/pagination";

export const Swiper: React.FC<SwiperProps> = ({
  array,
  currentYear,
  themeChanged,
  isCircleAnimationComplete,
  setCurrentYear,
  setIsCircleAnimationComplete,
  setThemeChanged,
}) => {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  const nextSlide = () => swiperRef?.current.swiper.slideNext();

  const prevSlide = () => swiperRef?.current.swiper.slidePrev();

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
    if (currentYear === array.length - 1) return;

    setIsCircleAnimationComplete(false);
    setThemeChanged(true);

    setTimeout(() => {
      setCurrentYear((prev: number) => prev + 1);
      setIsCircleAnimationComplete(true);
      setThemeChanged(false);
    }, 100);
  };

  const handleChange = (index: number) => {
    if (currentYear === index) return;

    setIsCircleAnimationComplete(false);
    setThemeChanged(true);

    setTimeout(() => {
      setCurrentYear(index);
      setIsCircleAnimationComplete(true);
      setThemeChanged(false);
    }, 100);
  };

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
              <h2 className={style.title}>{array[currentYear].category}</h2>

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
                  {array[currentYear].data.map(
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
        <SelectControls
          arrLength={array.length}
          index={currentYear}
          prevButton={prevCategory}
          nextButton={nextCategory}
        />

        <div className={style.custom__pagination}>
          {Array.from({ length: array.length }).map((_, index) => (
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
