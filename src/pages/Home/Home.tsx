import { useEffect, useRef, useState } from "react";
import classes from "./home.module.scss";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

const Home: React.FC = () => {
  const slides = [
    "Наука",
    "История",
    "Искусство",
    "Музыка",
    "Спорт",
    "Технологии",
  ];
  const radius = 200; // Радиус окружности
  const centerX = 250; // Центр окружности (X)
  const centerY = 250; // Центр окружности (Y)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      if (el) {
        const angle = (i / slides.length) * Math.PI * 2; // Угол для размещения элемента
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        gsap.to(el, { x, y, duration: 0.5, ease: "power2.out" });
      }
    });
  }, []);

  return (
    <>
      <div>
        <div className={classes.container}>
          <div className={classes.title__container}>
            <span className={classes.line}></span>
            <h1 className={classes.title}>Исторические даты</h1>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Home;
