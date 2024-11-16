import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputShortener from "./components/InputShortener";
import DisplayData from "./components/DisplayData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputShortener />} />
        <Route path="/display" element={<DisplayData />} />
      </Routes>
    </Router>
  );
}

export default App;
