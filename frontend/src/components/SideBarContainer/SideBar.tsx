import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginWrap from "./LoginWrap";
import { ReactComponent as ArchiveIcon } from "../../asset/archive.svg";
import { ReactComponent as MyArchiveIcon } from "../../asset/myarchive.svg";
import { ReactComponent as DesignIcon } from "../../asset/design.svg";
import { ReactComponent as NailShopIcon } from "../../asset/nailshop.svg";
import { ReactComponent as ProductIcon } from "../../asset/product.svg";
import { ReactComponent as MyPageIcon } from "../../asset/mypage.svg";
import { ReactComponent as SettingsIcon } from "../../asset/settings.svg";

const MenuContainer = styled.div`
  width: 267px;
  height: 85vh;
  margin: 36px 40px;
  font-size: 14px;
`;

const MenuListWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLink = styled(Link)<{ archive?: boolean; largerFont?: boolean }>`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 20px;

  ${(props) =>
    props.archive &&
    `
    font-weight: bold;
    background-color: #f2f2f5;
  `}

  ${(props) =>
    props.largerFont &&
    `
    font-size: 16px;
    &:hover {
      color: #b98ce0;
      svg {
        fill: #b98ce0;
      }
    }
    &:active {
      font-weight: bold;
      color: #000000;
      background-color: #F2F2F5;
      svg {
        fill:#000000
      }
    }
  `}

  ${(props) =>
    !props.largerFont &&
    `
    &:hover {
      color: white;
      background-color: #b98ce0;
      font-weight: bold;
      svg {
        fill: white;
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
    fill: inherit; /* Inherit the color from the parent element */
  }

  &:hover ${MenuItemText} {
    display: inline-block;
    margin-left: 14px;
    font-size: 12px;
  }
`;

// Menu items data
const menuItems = [
  { icon: ArchiveIcon, text: "아카이브", description: "네일아트 디자인 탐색" },
  { icon: MyArchiveIcon, text: "내 아카이브" },
  {
    icon: DesignIcon,
    text: "디자인 제작",
    description: "네일아트 디자인 제작",
  },
  {
    icon: NailShopIcon,
    text: "네일 숍 예약",
    description: "내 주변 네일 숍 예약",
  },
  {
    icon: ProductIcon,
    text: "제품 구매",
    description: "수제 네일팁 및 제품 구매",
  },
];

const additionalMenuItems = [
  { icon: MyPageIcon, text: "마이 페이지", largerFont: true },
  { icon: SettingsIcon, text: "환경설정", largerFont: true },
];

const SideBar = () => {
  return (
    <MenuContainer>
      <LoginWrap />
      <MenuListWrap>
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <StyledLink
                to=""
                className="menu"
                archive={index === 0}
                largerFont={false}
              >
                <item.icon />
                {item.text}
                {item.description && (
                  <MenuItemText>{item.description}</MenuItemText>
                )}
              </StyledLink>
            </MenuItem>
          ))}
        </MenuList>

        <MenuList>
          {additionalMenuItems.map((item, index) => (
            <MenuItem key={index}>
              <StyledLink to="" className="menu" largerFont={item.largerFont}>
                <item.icon />
                {item.text}
              </StyledLink>
            </MenuItem>
          ))}
        </MenuList>
      </MenuListWrap>
    </MenuContainer>
  );
};

export default SideBar;
