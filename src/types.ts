import { ReactNode } from "react";

export interface SwiperItemProps {
  year: number;
  description: string;
}

export interface SwiperProps {
  currentSlideList: number;
}

export type TypeBtn = (
  value: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export interface ButtonProps {
  onClick: TypeBtn;
  icon: ReactNode;
  disabled: boolean;
}

export type SizeType = string | number;

export interface IconProps {
  width: SizeType;
  height: SizeType;
  color: string;
}

export interface SelectControlsProps {
  prevButton: TypeBtn;
  nextButton: TypeBtn;
}


export type RefObject = React.RefObject<HTMLSpanElement>