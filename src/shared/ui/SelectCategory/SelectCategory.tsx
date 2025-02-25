import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./selectcategory.module.scss";
import gsap from "gsap";
import { AppContext } from "@/app/App";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SelectControls } from "../SelectControls/SelectControls";

import { YEARS } from "@/years";

gsap.registerPlugin(MotionPathPlugin);

export const SelectCategory: React.FC = () => {
  const {
    currentYear,
    setCurrentYear,
    setThemeChanged,
    setIsCircleAnimationComplete,
  } = useContext(AppContext);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<any[]>([]);
  const yearRef = useRef<HTMLDivElement>(null);
  const yearRefTwo = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const tl = useRef(gsap.timeline({ paused: true, reversed: true }));
  const tracker = useRef({ item: 0 });

  const numItems = 6;
  const itemStep = 1 / numItems;
  const wrapTracker = gsap.utils.wrap(0, numItems);
  const wrapProgress = gsap.utils.wrap(0, 1);
  const snap = gsap.utils.snap(itemStep);

  const openCircle = (index: number) => {
    gsap.to(circlesRef.current[index], {
      width: 56,
      height: 56,
      backgroundColor: "#f4f5f9",
      border: "1px solid #42567a",
      borderRadius: 100,
      fontSize: "20px",
      borderWidth: 1,
      duration: 0.1,
      ease: "power1.out",
    });
  };

  const closedCircle = (index?: number) => {
    gsap.to(circlesRef.current[index], {
      duration: 0.1,
      ease: "power1.out",
      onComplete: () =>
        gsap.set(circlesRef.current[index], { clearProps: "all" }),
    });
  };

  const animateYear = (
    ref: React.RefObject<HTMLSpanElement>,
    oldYear: number,
    newYear: number
  ) => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { textContent: oldYear },
      {
        textContent: newYear,
        duration: 0.8,
        ease: "Power1.easeIn",
        snap: { textContent: 1 },
      }
    );
  };

  useEffect(() => {
    const svg = document.querySelector("svg");
    if (!svg) return;

    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";
    svg.prepend(circlePath);

    gsap.set(itemsRef.current, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i: number) => i / numItems - 0.1667,
      },
    });

    tl.current
      .to(wrapperRef.current, {
        rotation: 360,
        transformOrigin: "center",
        duration: 1,
        ease: "none",
      })
      .to(
        itemsRef.current,
        {
          rotation: "-=360",
          transformOrigin: "center",
          duration: 1,
          ease: "none",
        },
        0
      );

    openCircle(tracker.current.item);

    gsap.set(textRef.current, { display: "none" });
    gsap.set(textRef.current[tracker.current.item], { display: "block" });

    tl.current.to(
      tracker.current,
      {
        item: numItems,
        duration: 1,
        ease: "none",
        modifiers: {
          item(value: number) {
            return wrapTracker(numItems - Math.round(value));
          },
        },
      },
      0
    );
  }, []);

  const moveWheel = (amount: number) => {
    if (!itemsRef.current) return;

    setIsCircleAnimationComplete(false);
    setThemeChanged(true);

    let progress = tl.current.progress();
    tl.current.progress(wrapProgress(snap(tl.current.progress() + amount)));
    let next = tracker.current.item;
    tl.current.progress(progress);

    closedCircle(tracker.current.item);
    openCircle(next);

    gsap.set(textRef.current, { display: "none" });
    gsap.set(textRef.current[next], { display: "block" });

    animateYear(
      yearRef,
      YEARS[currentYear].data[0].year,
      YEARS[next].data[0].year
    );

    animateYear(
      yearRefTwo,
      YEARS[currentYear].data[YEARS[currentYear].data.length - 1].year,
      YEARS[next].data[YEARS[currentYear].data.length - 1].year
    );

    gsap.to(tl.current, {
      progress: snap(tl.current.progress() + amount),
      modifiers: {
        progress: wrapProgress,
      },
      onUpdate: () => {
        setCurrentYear(next);
      },
      onComplete: () => {
        setIsCircleAnimationComplete(true);
        setThemeChanged(false);
      },
    });
  };

  const moveItem = (targetIndex: number) => {
    if (tracker.current.item === targetIndex) return;
    const diff = tracker.current.item - targetIndex;
    moveWheel(
      Math.abs(diff) < numItems / 2
        ? diff / numItems
        : ((numItems - Math.abs(diff)) / numItems) * (diff > 0 ? -1 : 1)
    );
  };

  const handleNext = () => moveWheel(-1 / (itemsRef.current?.length || 1));
  const handlePrev = () => moveWheel(1 / (itemsRef.current?.length || 1));

  return (
    <div>
      <div className={style.circular__container}>
        <div className={style.year__container}>
          <span className={style.year__first} ref={yearRef}>
            {YEARS[currentYear].data[0].year}
          </span>
          <span className={style.year__last} ref={yearRefTwo}>
            {YEARS[currentYear].data[YEARS[currentYear].data.length - 1].year}
          </span>
        </div>

        <div className={style.circular__carousel}>

          <div className={style.wrapper} ref={wrapperRef}>
            <div className={style.items}>
              {Array.from({ length: numItems }).map((_, i) => (
                <div
                  key={`circle-item-${i}`}
                  onClick={() => moveItem(i)}
                  className={style.item}
                  ref={(el: any) => (itemsRef.current[i] = el)}
                >
                  <div
                    className={style.item__content}
                    ref={(el: any) => (circlesRef.current[i] = el)}
                  >
                    <span>{i + 1}</span>
                    <p ref={(el: any) => (textRef.current[i] = el)}>
                      {YEARS[currentYear].category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <svg viewBox="0 0 300 300">
              <circle
                id="holder"
                className={style.circle}
                cx="151"
                cy="151"
                r="150"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={style.controls}>
        <SelectControls prevButton={handlePrev} nextButton={handleNext} />
      </div>
    </div>
  );
};
