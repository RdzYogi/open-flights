import React from "react";
import Airlines from "./Airlines/Airlines";
import Airline from "./Airline/Airline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={Airlines} />
        <Route exact path="/airlines" element={Airlines} />
        <Route exact path="/airlines/:slug" element={Airline} />
      </Routes>
    </Router>
  )
}

export default App
