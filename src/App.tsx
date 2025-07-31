import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Transmision from "./Transmision";
import RutaProtegida from "../src/components/RutaProtegida";

const App: React.FC = () => {
  // Simulación temporal — esto luego se consulta al backend
  const [isAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/transmision"
          element={
            <RutaProtegida isAuthenticated={isAuthenticated}>
              <Transmision />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
