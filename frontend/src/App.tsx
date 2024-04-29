import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/index';
import './App.css';
import SignUpPage from 'pages/SignUpPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
