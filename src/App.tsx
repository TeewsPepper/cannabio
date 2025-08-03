import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Transmision from "./Transmision";
import RutaProtegida from "./components/RutaProtegida";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setIsAuthenticated(data.authenticated);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Mientras no sabemos si está auth, podés mostrar cargando
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

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
