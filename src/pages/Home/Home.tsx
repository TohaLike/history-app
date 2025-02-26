import React, { useState } from "react";
import style from "./home.module.scss";
import { SelectCategory, Swiper } from "@/shared/ui";
import { YEARS } from "@/years";

const Home: React.FC = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.title__container}>
          <span className={style.line}></span>
          <h1 className={style.title}>Исторические даты</h1>
        </div>

        <div className={style.select__container}>
          <SelectCategory array={YEARS} />
        </div>
      </div>
    </>
  );
};

export default Home;
