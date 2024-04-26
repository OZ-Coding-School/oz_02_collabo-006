import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index";
import "./App.css";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
