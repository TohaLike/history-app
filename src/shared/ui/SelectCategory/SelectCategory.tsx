import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./selectcategory.module.scss";
import gsap from "gsap";
import { AppContext } from "@/app/App";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SelectControls } from "../SelectControls/SelectControls";

import { YEARS } from "@/years";
import { TypeBtn } from "@/types";

gsap.registerPlugin(MotionPathPlugin);

export const SelectCategory: React.FC = () => {
  const {
    currentYear,
    setCurrentYear,
    setThemeChanged,
    setIsCircleAnimationComplete,
  } = useContext(AppContext);
  const [showText, setShowText] = useState<boolean>(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<any[]>([]);
  const yearRef = useRef<HTMLDivElement>(null);
  const yearRefTwo = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<any[]>([]);

  const itemsRef = useRef<any[]>([]);
  const tl = useRef(gsap.timeline({ paused: true, reversed: true }));
  const tracker = useRef({ item: 0 });

  const lengthOfItems = 6;

  const numItems = 6;
  const wrapTracker = gsap.utils.wrap(0, numItems);

  const openCircle = (index: number) => {
    gsap.to(itemsRef.current[index], {
      width: 56,
      height: 56,
      backgroundColor: "#f4f5f9",
      border: "1px solid #42567a",
      borderRadius: 100,
      fontSize: "20px",
      borderWidth: 1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const closedCircle = (index?: number) => {
    gsap.to(itemsRef.current[index], {
      width: 6,
      height: 6,
      borderWidth: 0,
      backgroundColor: "#42567a",
      fontSize: 0,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  useEffect(() => {
    const svg = document.querySelector("svg");
    if (!svg) return;

    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";
    svg.prepend(circlePath);

    if (!itemsRef.current) return;

    gsap.set(itemsRef.current, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i: number) => i / numItems - 0.1666666666666667,
      },
      scale: 0.9,
    });

    tl.current.to(wrapperRef.current, {
      rotation: 360,
      transformOrigin: "center",
      duration: 1,
      ease: "none",
    });

    tl.current.to(
      itemsRef.current,
      {
        rotation: "-=360",
        transformOrigin: "center",
        duration: 1,
        ease: "none",
      },
      0
    );

    gsap.set(itemsRef.current, {
      width: 6,
      height: 6,
      borderWidth: 0,
      backgroundColor: "#42567a",
      fontSize: 0,
      duration: 0.3,
      ease: "power1.out",
    });

    openCircle(tracker.current.item);

    gsap.set(textRef.current, {
      display: "none",
    });

    gsap.set(textRef.current[tracker.current.item], {
      display: "block",
    });

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

  const yearAction = (yearRef: any, year: any, secondYear: any) => {
    gsap.fromTo(
      yearRef,
      { textContent: year },
      {
        textContent: secondYear,
        duration: 0.8,
        ease: "Power1.easeIn",
        snap: { textContent: 1 },
        stagger: {
          each: 1.0,
        },
      }
    );
  };

  const moveWheel = (amount: number) => {
    if (!itemsRef.current) return;

    setIsCircleAnimationComplete(false);
    setThemeChanged(true);
    setShowText(false);

    const numItems = itemsRef.current.length;
    const itemStep = 1 / numItems;
    const wrapProgress = gsap.utils.wrap(0, 1);
    const snap = gsap.utils.snap(itemStep);

    let progress = tl.current.progress();
    tl.current.progress(wrapProgress(snap(tl.current.progress() + amount)));

    let next = tracker.current.item;
    tl.current.progress(progress);

    closedCircle(tracker.current.item);
    openCircle(next);

    gsap.set(textRef.current[tracker.current.item], {
      display: "none",
    });

    gsap.set(textRef.current[next], {
      display: "block",
    });

    yearAction(
      yearRef.current,
      YEARS[currentYear].data[0].year,
      YEARS[next].data[0].year
    );

    yearAction(
      yearRefTwo.current,
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
        setShowText(true);
      },
    });
  };

  function moveItem(targetIndex: number) {
    let current = tracker.current.item;
    if (targetIndex === current) return;

    closedCircle(targetIndex);

    let diff = current - targetIndex;

    if (Math.abs(diff) < numItems / 2) {
      moveWheel((diff * 1) / (itemsRef.current?.length || 1));
    } else {
      let amt = numItems - Math.abs(diff);
      if (current > targetIndex) {
        moveWheel((amt * -1) / (itemsRef.current?.length || 1));
      } else {
        moveWheel((amt * 1) / (itemsRef.current?.length || 1));
      }
    }
  }

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
              {[...Array(lengthOfItems)].map((_, i) => (
                <div
                  key={`circle-item-${i}`}
                  onClick={() => moveItem(i)}
                  // onMouseEnter={() => openCircle(i)}
                  // onMouseLeave={() => closedCircle(i)}
                  className={style.item}
                  ref={(el) => {
                    if (el) itemsRef.current[i] = el;
                  }}
                >
                  <div className={style.item__content}>
                    <span>{i + 1}</span>
                    <p
                      ref={(el) => {
                        if (el) textRef.current[i] = el;
                      }}
                    >
                      {YEARS[currentYear].category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <svg viewBox="0 0 300 300">
              <circle
                id="holder"
                className={style.st}
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
