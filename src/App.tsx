
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Transmision from "./Transmision";


const App: React.FC = () => {
 


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transmision" element={<Transmision />} />
      </Routes>
    </Router>
  );
};

export default App;
