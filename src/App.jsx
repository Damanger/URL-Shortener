import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputShortener from "./components/InputShortener";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputShortener />} />
        <Route
          path="/display"
          element={<div>Este es el QR con los datos generados.</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
