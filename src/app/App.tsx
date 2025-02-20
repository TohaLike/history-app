import React, { createContext, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { SwiperRef } from "swiper/react";
import Home from "@/pages/Home/Home";
import Layout from "./layout";

export const AppContext = createContext(null);

const App: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(5);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <AppContext.Provider value={{ currentYear, setCurrentYear, swiperRef }}>
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
