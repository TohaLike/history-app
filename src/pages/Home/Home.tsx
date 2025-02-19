import { createRef, useEffect, useRef, useState } from "react";
import style from "./home.module.scss";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import "swiper/css";
import "swiper/css/navigation";
import { YEARS_2015_2022 } from "../../years";

gsap.registerPlugin(MotionPathPlugin);

const Home: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(5);

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
              const newItem =  wrapTracker(lengthOfItems - 1 - Math.round(value))
              setCurrentYear(newItem)
              return newItem;
            },
          },
        },
        0
      );
    },

    { scope: wrapperRef }
  );

  const handleNext = () => {
    if (tl.current) {
      gsap.to(tl.current, {
        progress: snap(tl.current.progress() + step),
        modifiers: {
          progress: wrapProgress,
        },
      });
    }
  };

  const handlePrev = () => {
    if (tl.current) {
      gsap.to(tl.current, {
        progress: snap(tl.current.progress() - step),
        modifiers: {
          progress: wrapProgress,
        },
      });
    }
  };
    function moveWheel(amount: any) {
    gsap.to(tl.current, {
      progress: snap(tl.current.progress() + amount),
      modifiers: {
        progress: wrapProgress
      }
    });
  }

  const handleMove = (index: number) => {
    if (index === currentYear) return;
  
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
      modifiers: {
        progress: wrapProgress,
      },
    });
  };


  return (
    <>
      <div>
        <div className={style.container}>
          <div className={style.title__container}>
            <span className={style.line}></span>
            <h1 className={style.title}>Исторические даты</h1>
          </div>

          {/* Круг с годами */}
          <div className={style.circular__container}>
            <div className={style.year__container}>
              <span className={style.year__first}>2015</span>
              <span className={style.year__last}>2022</span>
            </div>
            <div className={style.circular__carousel}>
              <div className={style.wrapper} ref={wrapperRef}>
                <div className={style.items}>
                  {[...Array(lengthOfItems)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        handleMove(i);
                      }}
                      className={style.item}
                      ref={(el: any) => el && (itemsRef.current[i] = el)}
                    >
                      {currentYear === i ? (
                        <div className={style.item__active}>{i + 1}</div>
                      ) : (
                        <div className={style.item__content}>{i + 1}</div>
                      )}
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

          <div className={style.actions__container}>
            <div className={style.buttons__container}>
              <button className={style.button__prev} onClick={handlePrev}>
                Prev
              </button>
              <button className={style.button__prev} onClick={handleNext}>
                Next
              </button>
            </div>

            <div className={style.swiper__container}>
              <Swiper
                slidesPerView={3.5}
                spaceBetween={80}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {YEARS_2015_2022.map((e: any, i: number) => (
                  <SwiperSlide
                    key={`slide-${i}`}
                    style={{ maxWidth: "320px" }}
                    className={style.swiper__slide}
                  >
                    <h2 className={style.swiper__year}>{e.year}</h2>
                    <p className={style.swiper__description}>{e.description}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
// document.querySelector('.item.active').classList.remove('active');
// items[activeItem].classList.add('active');

// var diff = current - i;

// if (Math.abs(diff) < numItems / 2) {
//   moveWheel(diff * itemStep);
// } else {
//   var amt = numItems - Math.abs(diff);

//   if (current > i) {
//     moveWheel(amt * -itemStep);
//   } else {
//     moveWheel(amt * itemStep);
//   }
// }
