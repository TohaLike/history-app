import { ReactNode } from "react";

export interface SwiperItemProps {
  year: number;
  description: string;
}

export interface SwiperProps {
  currentSlideList: number;
}

export interface SwiperButtonProps {
  onClick: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon: ReactNode;
  disabled: boolean;
}
