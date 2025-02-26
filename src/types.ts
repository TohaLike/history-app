import { Dispatch, ReactNode, SetStateAction } from "react";

export interface SwiperItemProps {
  year: number;
  description: string;
}

export type TypeBtn = (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export interface ButtonProps {
  onClick: TypeBtn;
  icon: ReactNode;
  disabled: boolean;
}

export type SizeType = string | number;
export type StateType<K extends any> = Dispatch<SetStateAction<K>>;

export interface IconProps {
  width: SizeType;
  height: SizeType;
  color: string;
}

export interface SelectCategoryProps {
  array: any;
  currentYear: number;
  setCurrentYear: StateType<number>;
  setThemeChanged: StateType<boolean>;
  setIsCircleAnimationComplete: StateType<boolean>;
}

export interface SelectControlsProps {
  arrLength: number;
  index: number;
  prevButton: TypeBtn;
  nextButton: TypeBtn;
}

export interface SwiperProps {
  array: any;
  currentYear: number;
}

export interface PaginationProps {
  array: any;
  currentIndex: number;
  handleChange: (value: number) => void;
}

export type RefObject = React.RefObject<HTMLSpanElement>;
