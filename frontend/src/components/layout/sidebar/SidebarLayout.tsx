import { Outlet } from 'react-router-dom';
import SideBar from './MenuUI';

const SidebarLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideBar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
