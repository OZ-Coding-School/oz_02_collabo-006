import { Outlet } from 'react-router-dom';
import SideBar from './Menu';

const SidebarLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
