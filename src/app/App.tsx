import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "../components/shared/Home/Home";
import Layout from "./layout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
