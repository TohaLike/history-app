import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
