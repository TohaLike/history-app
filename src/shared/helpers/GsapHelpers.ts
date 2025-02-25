import gsap from "gsap";
import { RefObject } from "@/types";

export const animateYear = (
  ref: RefObject,
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

export const openCircle = (ref: RefObject) => {
  gsap.to(ref, {
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

export const closedCircle = (ref: RefObject) => {
  gsap.to(ref, {
    duration: 0.1,
    ease: "power1.out",
    onComplete: () =>
      gsap.set(ref, { clearProps: "all" }),
  });
};
