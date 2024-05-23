import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostPlusBtn from '../../asset/post-plusBtn.png';
import { LIGHT_PURPLE } from 'constant/colors';
import { useAuth } from 'context/AuthContext';
import axios from 'axios';
import { GET_ALL_POSTS } from 'constant/endPoint';

const ArchiveContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ArchiveBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 79vw;
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
  padding-bottom: 14px;
  margin-top: 15px;
`;

const ArchiveImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 79vw;
  margin-top: 28px;
  box-sizing: border-box;
  gap: 10px;
`;

const ArchiveImg = styled.img`
  width: 240px;
  height: 240px;
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
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
`;

const CreatePostImg = styled.img`
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.3s ease-out;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const ArchiveBodyDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: calc(100% - 260px);
  box-sizing: border-box;
  gap: 10px;
`;

const ArchiveImgDiv = styled.div`
  width: 240px;
  height: 240px;
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border-radius: 15px;
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

interface PostData {
  comment_ck: boolean;
  content: string;
  created_at: string;
  hashtag: string[];
  id: number;
  likes: number;
  media_set: Media[];
  updated_at: string;
  user: User;
  visible: boolean;
}

interface Media {
  id: number;
  file_url: string;
  created_at: string;
  updated_at: string;
  post: number;
}

interface User {
  id: number;
  username: string;
  phone: string | null;
  email: string;
  profile_image: string | null;
  status: number;
  subscription: boolean;
  created_at: string;
  updated_at: string;
}

const MyPage = () => {
  const { isLoggedIn } = useAuth();
  const [isMypageName, setIsMypageName] = useState(0);
  const [isArchiveBarName, setIsisArchiveBarName] = useState(0);
  const [isFolderModal, setIsFolderModal] = useState(false);
  const [isArchive, setIsArchive] = useState<PostData[]>([]);

  const archiveBarClick = (index: number) => {
    setIsMypageName(index);
  };

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(GET_ALL_POSTS, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setIsArchive(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        {isLoggedIn &&
          isArchive.map((item, index) => (
            <ArchiveImgDiv
              key={index}
              onClick={() =>
                navigate(`/item/${menuName[isArchiveBarName].name}/${item.id}`)
              }
            >
              {item.media_set.length > 0 && (
                <ArchiveImg src={item.media_set[0].file_url} alt="" />
              )}
            </ArchiveImgDiv>
          ))}
      </ArchiveImgContainer>
    </ArchiveContainer>
  );
};

export default MyPage;
