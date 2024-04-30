import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './sidebar/Sidebar';
import SearchBar from './search/SearchBar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const CommonLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentArea>
        <SearchBar />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentArea>
    </LayoutContainer>
  );
};

export default CommonLayout;
