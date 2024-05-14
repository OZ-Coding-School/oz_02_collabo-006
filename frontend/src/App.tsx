import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/index';
import './App.css';
import SignUpPage from 'pages/SignUpPage';
import MyArchive from 'pages/MyArchive';
import MyPage from 'pages/MyPage';
import CommonLayout from 'components/layout/CommonLayout';
import ViewItemPage from 'pages/ViewItemPage';
import CreatePostPage from 'pages/CreatePostPage';
import EditPostPage from 'pages/EditPostPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my-archive" element={<MyArchive />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/item/:category/:id" element={<ViewItemPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post" element={<EditPostPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
