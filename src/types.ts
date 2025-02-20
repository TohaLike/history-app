import { ReactNode } from "react";

export interface SwiperItemProps {
  year: number;
  description: string;
}

export interface SwiperProps {
  currentSlideList: number;
}

export interface ButtonProps {
  onClick: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon: ReactNode;
  disabled: boolean;
}

export type SizeType = string | number

export interface IconProps {
  width: SizeType;
  height: SizeType;
  color: string;
}
