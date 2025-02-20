import React, { useContext, useRef } from "react";
import style from "./selectcategory.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AppContext } from "@/app/App";
import { LeftArrowIcon, RightArrowIcon } from "@/shared/assets/icons";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SelectButton } from "../SelectButton/SelectButton";
import { YEARS } from "@/years";

gsap.registerPlugin(MotionPathPlugin);

export const SelectCategory: React.FC = () => {
  const {
    currentYear,
    setCurrentYear,
    setThemeChanged,
    setIsCircleAnimationComplete,
  } = useContext(AppContext);

  const itemsRef = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  const lengthOfItems = 6;

  const step = 1 / lengthOfItems;
  const wrapProgress = gsap.utils.wrap(0, 1);
  const wrapTracker = gsap.utils.wrap(0, lengthOfItems);
  const snap = gsap.utils.snap(step);

  let tracker = { item: 0 };

  useGSAP(
    () => {
      const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
      circlePath.id = "circlePath";

      document.querySelector("svg")?.prepend(circlePath);

      gsap.set(itemsRef.current, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          end: (i: number) => i / lengthOfItems,
        },
        scale: 1,
      });

      tl.current = gsap.timeline({ paused: true });

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

      tl.current.to(
        tracker,
        {
          item: lengthOfItems,
          duration: 1,
          ease: "none",
          modifiers: {
            item(value: number) {
              const newItem = wrapTracker(
                lengthOfItems - 1 - Math.round(value)
              );
              setCurrentYear(newItem);
              return newItem;
            },
          },
        },
        0
      );
    },
    

    { scope: wrapperRef }
  );

  const handlePrev = () => {
    if (tl.current) {
      setIsCircleAnimationComplete(false);
      setThemeChanged(true);

      gsap.to(tl.current, {
        progress: snap(tl.current.progress() + step),
        modifiers: {
          progress: wrapProgress,
        },
        onComplete: () => {
          setIsCircleAnimationComplete(true);
          setThemeChanged(false);
        },
      });
    }
  };

  const handleNext = () => {
    if (tl.current) {
      setIsCircleAnimationComplete(false);
      setThemeChanged(true);

      gsap.to(tl.current, {
        progress: snap(tl.current.progress() - step),
        modifiers: {
          progress: wrapProgress,
        },
        onComplete: () => {
          setIsCircleAnimationComplete(true);
          setThemeChanged(false);
        },
      });
    }
  };

  const handleMove = (index: number) => {
    if (index === currentYear) return;

    setThemeChanged(true);
    setIsCircleAnimationComplete(false);

    let diff = currentYear - index;
    let newProgress;

    if (Math.abs(diff) < lengthOfItems / 2) {
      newProgress = snap(tl.current.progress() + diff * step);
    } else {
      let amt = lengthOfItems - Math.abs(diff);
      newProgress = snap(
        tl.current.progress() + (currentYear > index ? -amt * step : amt * step)
      );
    }

    gsap.to(tl.current, {
      progress: newProgress,
      modifiers: { progress: wrapProgress },
      onComplete: () => {
        setIsCircleAnimationComplete(true);
        setThemeChanged(false);
      },
    });
  };

  const toPaddedString = (value: number) => {
    return String(value).padStart(2, "0");
  };

  function CurrentList() {
    return `${toPaddedString(currentYear + 1)}/${toPaddedString(YEARS.length)}`;
  }

  return (
    <div>
      <div className={style.circular__container}>
        <div className={style.year__container}>
          <span className={style.year__first}>
            {YEARS[currentYear].data[0].year}
          </span>
          <span className={style.year__last}>
            {YEARS[currentYear].data[YEARS[currentYear].data.length - 1].year}
          </span>
        </div>

        <div className={style.circular__carousel}>
          <div className={style.wrapper} ref={wrapperRef}>
            <div className={style.items}>
              {[...Array(lengthOfItems)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => handleMove(i)}
                  className={style.item}
                  ref={(el) => {
                    if (el) itemsRef.current[i] = el;
                  }}
                >
                  <div
                    className={
                      i === currentYear
                        ? style.item__active
                        : style.item__content
                    }
                  >
                    {i + 1}
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

      <div>
        <div className={style.current__list}>
          <span>
            <CurrentList />
          </span>
        </div>

        <div className={style.buttons__container}>
          <SelectButton
            icon={<LeftArrowIcon />}
            onClick={handlePrev}
            disabled={currentYear === 0}
          />
          <SelectButton
            icon={<RightArrowIcon />}
            onClick={handleNext}
            disabled={currentYear === YEARS.length - 1}
          />
        </div>
      </div>
    </div>
  );
};
