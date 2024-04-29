import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/index';
import './App.css';
import SignUpPage from 'pages/SignUpPage';
import MyArchive from 'pages/MyArchive';
import MyPage from 'pages/MyPage';
import LayoutWithSidebar from 'components/layout/sidebar/SidebarLayout';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<LayoutWithSidebar />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my-archive" element={<MyArchive />} />
          <Route path="/my-page" element={<MyPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
