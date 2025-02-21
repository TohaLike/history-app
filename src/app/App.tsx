import React, { createContext, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { SwiperRef } from "swiper/react";
import Home from "@/pages/Home/Home";
import Layout from "./layout";

export const AppContext = createContext(null);

const App: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [themeChanged, setThemeChanged] = useState<boolean>(false);
  const [isCircleAnimationComplete, setIsCircleAnimationComplete] =
    useState<boolean>(true);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <AppContext.Provider
      value={{
        currentYear,
        setCurrentYear,
        swiperRef,
        themeChanged,
        setThemeChanged,
        isCircleAnimationComplete,
        setIsCircleAnimationComplete,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
