import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginWrap from './components/LoginWrap';
import { ReactComponent as ArchiveIcon } from '../../../asset/sidebarIcons/archive.svg';
import { ReactComponent as MyArchiveIcon } from '../../../asset/sidebarIcons/myarchive.svg';
import { ReactComponent as DesignIcon } from '../../../asset/sidebarIcons/design.svg';
import { ReactComponent as NailShopIcon } from '../../../asset/sidebarIcons/nailshop.svg';
import { ReactComponent as ProductIcon } from '../../../asset/sidebarIcons/product.svg';
import { ReactComponent as MyPageIcon } from '../../../asset/sidebarIcons/mypage.svg';
import { ReactComponent as SettingsIcon } from '../../../asset/sidebarIcons/settings.svg';
import { LIGHT_GRAY, LIGHT_PURPLE } from 'constant/colors';
import { useState } from 'react';

const MenuContainer = styled.div`
  width: 267px;
  height: 100vh;
  margin: 36px 16px 0 40px;
  font-size: 14px;
`;

const MenuListWrap = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLink = styled(Link)<{
  $archive?: boolean;
  $largerFont?: boolean;
  $isSelected?: boolean;
}>`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};
  background-color: ${({ $isSelected }) =>
    $isSelected ? LIGHT_GRAY : 'transparent'};

  ${(props) =>
    props.$archive &&
    `
    font-weight: bold;
    background-color: ${LIGHT_GRAY};
  `}

  ${(props) =>
    props.$largerFont &&
    `
    font-size: 16px;
    &:hover {
      color: ${LIGHT_PURPLE};
      svg {
        fill: ${LIGHT_PURPLE};
      }
    }
    &:active {
      font-weight: bold;
      color: #000000;
      background-color: ${LIGHT_GRAY};
      svg {
        fill:#000000
      }
    }
  `}

  ${(props) =>
    !props.$largerFont &&
    `
    &:hover {
      color: white;
      background-color: ${LIGHT_PURPLE};
      font-weight: bold;
      svg {
        fill: white;
        stroke: white;
        stroke-width: 0; 
      }
    }
  `}
`;

const MenuItemText = styled.span`
  display: none;
`;

const MenuItem = styled.li`
  margin-bottom: 9px;
  position: relative;

  svg {
    margin-right: 12px;
    fill: inherit;
  }

  &:hover ${MenuItemText} {
    display: inline-block;
    margin-left: 14px;
    font-size: 12px;
  }
`;

const menuItems = [
  {
    icon: ArchiveIcon,
    text: '아카이브',
    description: '네일아트 디자인 탐색',
    route: '/',
  },
  { icon: MyArchiveIcon, text: '내 아카이브', route: '/my-archive' },
  {
    icon: DesignIcon,
    text: '디자인 제작',
    description: '네일아트 디자인 제작',
    route: '/design-creation',
  },
  {
    icon: NailShopIcon,
    text: '네일 숍 예약',
    description: '내 주변 네일 숍 예약',
    route: '/nail-shop-booking',
  },
  {
    icon: ProductIcon,
    text: '제품 구매',
    description: '수제 네일팁 및 제품 구매',
    route: '/product-purchase',
  },
];

const additionalMenuItems = [
  {
    icon: MyPageIcon,
    text: '마이 페이지',
    route: '/my-page',
    $largerFont: true,
  },
  {
    icon: SettingsIcon,
    text: '환경설정',
    route: '/settings',
    $largerFont: true,
  },
];

const Sidebar = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(0);

  const handleMenuClick = (index: number) => {
    setSelectedMenuIndex(index);
  };
  return (
    <MenuContainer>
      <LoginWrap />
      <MenuListWrap>
        {/* 메뉴 목록 */}
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <StyledLink
                to={item.route}
                className="menu"
                $largerFont={false} // 항상 false로 설정
                $isSelected={selectedMenuIndex === index} // 선택된 메뉴의 경우 $isSelected prop을 true로 설정
                onClick={() => handleMenuClick(index)}
              >
                <item.icon /> {/* 해당 아이콘 표시 */}
                {item.text} {/* 메뉴 텍스트 표시 */}
                {item.description /* 아이템 설명이 있는 경우에만 표시 */ && (
                  <MenuItemText>{item.description}</MenuItemText>
                )}
              </StyledLink>
            </MenuItem>
          ))}
        </MenuList>

        {/* 추가 메뉴 목록 */}
        <MenuList>
          {additionalMenuItems.map((item, index) => (
            <MenuItem key={index}>
              <StyledLink
                to={item.route}
                className="menu"
                $largerFont={item.$largerFont}
                $isSelected={selectedMenuIndex === index + menuItems.length}
                onClick={() => handleMenuClick(index + menuItems.length)}
              >
                <item.icon /> {/* 해당 아이콘 표시 */}
                {item.text} {/* 메뉴 텍스트 표시 */}
              </StyledLink>
            </MenuItem>
          ))}
        </MenuList>
      </MenuListWrap>
    </MenuContainer>
  );
};

export default Sidebar;
