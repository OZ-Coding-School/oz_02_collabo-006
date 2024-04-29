import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import SearchBar from './search/SearchBar';

const CommonLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SearchBar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CommonLayout;
