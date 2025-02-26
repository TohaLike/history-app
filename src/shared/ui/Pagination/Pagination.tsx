import React from "react";
import style from "./pagination.module.scss";
import { PaginationProps } from "@/types";

export const Pagination: React.FC<PaginationProps> = ({ handleChange, array, currentIndex }) => {
  return (
    <div className={style.pagination}>
      {Array.from({ length: array.length }).map((_, index) => (
        <span
          key={index}
          className={currentIndex === index ? style.active : style.dot}
          onClick={() => handleChange(index)}
        />
      ))}
    </div>
  );
};
