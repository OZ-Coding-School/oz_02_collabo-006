import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostPlusBtn from '../../asset/post-plusBtn.png';
import { LIGHT_PURPLE } from 'constant/colors';

const ArchiveContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ArchiveBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 79vw;
  height: 54px;
  border: none;
  border-bottom: 1px solid #e5e8eb;
`;

const ArchiveBarBtn = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: none;
  background-color: white;
  color: #756982;
  font-weight: bold;
  cursor: pointer;
  margin-right: 32px;
  border-bottom: 0px solid ${LIGHT_PURPLE};
`;

const ArchiveImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 79vw;
  height: 90%;
  margin-top: 12px;
  box-sizing: border-box;
  overflow-y: auto;
  white-space: nowrap;
  gap: 10px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  /* Chrome, Safari, Opera용
  &::-webkit-scrollbar {
    display: none;
  } */

  /* Firefox용 */
  /* scrollbar-width: none; */

  /* IE and Edge용 */
  /* -ms-overflow-style: none; */
`;

const ArchiveImg = styled.button`
  width: 240px;
  height: 240px;
  max-width: 100%;
  background-color: gray;
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
  scroll-snap-align: start;
`;
const CreatePost = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 12px;
  border: 2px dashed ${LIGHT_PURPLE};
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
`;
const CreatePostImg = styled.img`
  cursor: pointer;
  transform: scale(1); /* 기본 상태 */
  transition: transform 0.3s ease-out; /* 변형에 대한 부드러운 전환 효과 */

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const menuName = [
  {
    name: '내 게시물',
    text: 'My post',
  },
  {
    name: '예약',
    text: 'Reservation page',
  },
  {
    name: '구매',
    text: 'Purchase page',
  },
];

const img = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
];
const MyPage = () => {
  const [isMypageName, setIsMypageName] = useState(0);

  const archiveBarClick = (index: number) => {
    setIsMypageName(index);
  };

  const navigate = useNavigate();

  return (
    <ArchiveContainer>
      <ArchiveBarContainer>
        {menuName.map((item, index) => (
          <ArchiveBarBtn
            key={index}
            style={
              isMypageName === index
                ? {
                    borderBottomWidth: 3,
                    borderBottomColor: '#B98CE0',
                    color: '#141217',
                  }
                : { borderBottomWidth: 3, borderBottomColor: '#E5E8EB' }
            }
            onClick={() => archiveBarClick(index)}
          >
            {item.name}
          </ArchiveBarBtn>
        ))}
      </ArchiveBarContainer>
      <ArchiveImgContainer>
        {isMypageName === 0 && (
          <CreatePost>
            <CreatePostImg
              src={PostPlusBtn}
              onClick={() => navigate('/create-post')}
            />
          </CreatePost>
        )}
        {img[isMypageName].map((item, index) => (
          <ArchiveImg
            key={index}
            onClick={() =>
              navigate(`/item/${menuName[isMypageName].name}/${item}`)
            }
          ></ArchiveImg>
        ))}
      </ArchiveImgContainer>
    </ArchiveContainer>
  );
};

export default MyPage;
