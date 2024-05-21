import {
  LIGHT_PURPLE,
  LIGHT_PURPLE_HOVER,
  LIGHT_GRAY,
  DARK_PURPLE,
} from 'constant/colors';
import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as AlbumIcon } from '../../asset/myArchivePageIcons/album.svg';
import { ReactComponent as ListIcon } from '../../asset/myArchivePageIcons/list.svg';

const cartegoryMenu = [
  {
    name: 'folder',
    text: '폴더별',
  },
  {
    name: 'created',
    text: '제작됨',
  },
  {
    name: 'following',
    text: '팔로잉',
  },
];

const lookMenu = [
  {
    icon: AlbumIcon,
    name: 'albumLook',
    text: '앨범형',
  },
  {
    icon: ListIcon,
    name: 'listLook',
    text: '리스트형',
  },
];

const MyArchiveContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitleText = styled.h1`
  font-size: 28px;
  font-weight: 700;
`;

const HeaderNewFolderBtn = styled.button`
  width: 155px;
  height: 32px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  background-color: ${LIGHT_PURPLE};

  &:hover {
    background-color: ${LIGHT_PURPLE_HOVER};
  }

  transition: background-color 0.3s ease;
`;

const HeaderNewFolderBtnText = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
`;

const BarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e0dee3;
`;

const CategoryBtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

const CategoryBtn = styled.button<{
  $isSelected?: boolean;
}>`
  width: 60px;
  height: 100%;
  background-color: transparent;
  align-items: center;
  font-size: 14px;
  outline: none;
  border: none;
  color: ${({ $isSelected }) => ($isSelected ? '#000000' : DARK_PURPLE)};
  font-weight: bold;
  cursor: pointer;
  margin-right: 13px;
  border-bottom: 3px solid
    ${({ $isSelected }) => ($isSelected ? LIGHT_PURPLE : LIGHT_GRAY)};
  transition: all 0.3s ease;
`;

const LookBtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

const LookBtn = styled.button<{
  $isSelected?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  background-color: white;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 13px;
  svg {
    fill: ${({ $isSelected }) => ($isSelected ? DARK_PURPLE : '#DADADA')};
  }
`;

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
`;

const FolderAlbumComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 1%;
  flex-wrap: wrap;
`;

const AlbumDiv = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
`;

const AlbumImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  cursor: pointer;
`;

const AlbumInfoDiv = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const InfoNumber = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${DARK_PURPLE};
`;

const testMyArchivesArray = [1, 2, 3, 4];

const MyArchive = () => {
  const [categoryListNumber, setCategoryListNumber] = useState(0);
  const [lookListNumber, setLookNumber] = useState(0);

  const cartegoryBtnClick = (index: number) => {
    setCategoryListNumber(index);
  };

  const lookBtnClick = (index: number) => {
    setLookNumber(index);
  };

  return (
    <MyArchiveContainer>
      <HeaderDiv>
        <HeaderTitleText>저장된 네일아트 디자인</HeaderTitleText>
        <HeaderNewFolderBtn>
          <HeaderNewFolderBtnText>새로운 폴더 만들기</HeaderNewFolderBtnText>
        </HeaderNewFolderBtn>
      </HeaderDiv>
      <BarDiv>
        <CategoryBtnDiv>
          {cartegoryMenu.map((item, index) => (
            <CategoryBtn
              key={index}
              $isSelected={categoryListNumber === index}
              onClick={() => cartegoryBtnClick(index)}
            >
              {item.text}
            </CategoryBtn>
          ))}
        </CategoryBtnDiv>
        <LookBtnDiv>
          {lookMenu.map((item, index) => (
            <LookBtn
              key={index}
              $isSelected={lookListNumber === index}
              onClick={() => lookBtnClick(index)}
            >
              <item.icon />
            </LookBtn>
          ))}
        </LookBtnDiv>
      </BarDiv>
      <ContentDiv>
        {categoryListNumber === 0 && lookListNumber === 0 && (
          <FolderAlbumComponent>
            {testMyArchivesArray.map((item, index) => (
              <AlbumDiv key={index}>
                <AlbumImg src="/folderAlbumImgTest.jfif"></AlbumImg>
                <AlbumInfoDiv>
                  <InfoTitle>봄 네일</InfoTitle>
                  <InfoNumber>12 designs</InfoNumber>
                </AlbumInfoDiv>
              </AlbumDiv>
            ))}
          </FolderAlbumComponent>
        )}
      </ContentDiv>
    </MyArchiveContainer>
  );
};

export default MyArchive;
