import React, { useRef, useState } from "react";
import style from "./swiper.module.scss";
import { Swiper as MainSwiper, SwiperRef, SwiperSlide } from "swiper/react";
import { SwiperItemProps, SwiperProps } from "@/types";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { SwiperButton } from "../SwiperButton/SwiperButton";

export const Swiper: React.FC<SwiperProps> = ({ array, currentYear }) => {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);

  const swiperRef = useRef<SwiperRef>(null);

  const nextSlide = () => swiperRef?.current.swiper.slideNext();

  const prevSlide = () => swiperRef?.current.swiper.slidePrev();

  return (
    <>
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
          {array[currentYear].data.map((e: SwiperItemProps, i: number) => (
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
    </>
  );
};
