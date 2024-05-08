import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../../asset/search.svg';
import { LIGHT_GRAY, LIGHT_PURPLE } from 'constant/colors';

const SearchBarContainer = styled.div`
  position: relative;
  width: 79vw;
  margin: 32px 0 12px 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 8px 8px 8px 52px;
  border-radius: 24px;
  border: none;
  background-color: ${LIGHT_GRAY};
  font-size: 16px;
  &:focus {
    outline: 3px solid ${LIGHT_PURPLE};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>

      <SearchInput type="search" placeholder="검색" />
    </SearchBarContainer>
  );
};

export default SearchBar;
