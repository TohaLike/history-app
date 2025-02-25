import React from "react";
import style from "./home.module.scss";
import { SelectCategory, Swiper } from "@/shared/ui";

const Home: React.FC = () => {
  return (
    <>
      <div className={style.home}>
        <div className={style.left__space}></div>
        <div className={style.container}>
          <div className={style.title__container}>
            <span className={style.line}></span>
            <h1 className={style.title}>Исторические даты</h1>
          </div>

          <div className={style.select__container}>
            <SelectCategory />
          </div>

          <div className={style.swiper__container}>
            <Swiper />
          </div>
        </div>
        <div className={style.right__space}></div>
      </div>
    </>
  );
};

export default Home;
