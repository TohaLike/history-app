import React, { useState } from "react";
import style from "./home.module.scss";
import { SelectCategory, Swiper } from "@/shared/ui";
import { YEARS } from "@/years";

const Home: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [themeChanged, setThemeChanged] = useState<boolean>(false);
  const [isCircleAnimationComplete, setIsCircleAnimationComplete] = useState<boolean>(true);

  return (
    <>
      <div className={style.container}>
        <div className={style.title__container}>
          <span className={style.line}></span>
          <h1 className={style.title}>Исторические даты</h1>
        </div>

        <div className={style.select__container}>
          <SelectCategory
            array={YEARS}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            setThemeChanged={setThemeChanged}
            setIsCircleAnimationComplete={setIsCircleAnimationComplete}
          />
        </div>

        <div className={style.swiper__container}>
          <Swiper
            array={YEARS}
            currentYear={currentYear}
            themeChanged={themeChanged}
            isCircleAnimationComplete={isCircleAnimationComplete}
            setCurrentYear={setCurrentYear}
            setIsCircleAnimationComplete={setIsCircleAnimationComplete}
            setThemeChanged={setThemeChanged}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
