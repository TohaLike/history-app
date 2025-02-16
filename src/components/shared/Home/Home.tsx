import React from "react";
import classes from "./home.module.scss";

export const Home = () => {
  // console.log(classes.title)

  return (
    <>
      <div>
        <h1 className={classes.title}>Home</h1>
        <button className={classes.button}>te</button>
      </div>
    </>
  );
};
