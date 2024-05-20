import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LIGHT_PURPLE } from 'constant/colors';
import axios from 'axios';
import { GET_ALL_POSTS } from 'constant/endPoint';
import ArchiveFolder from 'components/modal/ArchiveFolder';
import { useAuth } from 'context/AuthContext';

interface PostData {
  comment_ck: boolean;
  content: string;
  created_at: string;
  hashtag: number[];
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

const menuName = [
  {
    name: 'For You',
    text: 'For You page',
  },
  {
    name: 'Trending',
    text: 'Trending page',
  },
  {
    name: 'New',
    text: 'New page',
  },
];

const img = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
];

const ArchiveContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ArchiveBarDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 79vw;
  height: 54px;
  border: none;
  border-bottom: 1px solid gray;
`;

const ArchiveBarBtn = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: none;
  background-color: white;
  color: black;
  font-weight: bold;
  cursor: pointer;
  margin-right: 13px;
  border-bottom: 0px solid ${LIGHT_PURPLE};
`;

const ArchiveBodyDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 79vw;
  margin-top: 12px;
  box-sizing: border-box;
  overflow-y: auto;
  white-space: nowrap;
  gap: 10px;
`;

const ArchiveImgDiv = styled.div`
  width: 240px;
  height: 240px;
  background-color: red;
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
const ArchiveImg = styled.img`
width: 100%;
height: 100%;
border-radius: 15px;
`
const Notification = styled.div`
  width: 50%;
  height: 120px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #444;
  color: white;
  padding: 16px;
  border-radius: 10px 10px 0 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
`;

const LandingPage = () => {
  const { isLoggedIn } = useAuth();
  const [isArchiveBarName, setIsisArchiveBarName] = useState(0);
  const [isFolderModal, setIsFolderModal] = useState(false);
  const [isArchive, setIsArchive] = useState<PostData[]>([]);

  const archiveBarClick = (index: number) => {
    setIsisArchiveBarName(index);
  };

  const modalOn = () => {
    setIsFolderModal(true)
  }
  const modalOff = () => {
    setIsFolderModal(false)
  }

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(GET_ALL_POSTS, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    }).then((response) => {
      console.log(response.data.data);
      setIsArchive(response.data.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <ArchiveContainer>
      <ArchiveBarDiv>
        {menuName.map((item, index) => (
          <ArchiveBarBtn
            key={index}
            style={
              isArchiveBarName === index
                ? { borderBottomWidth: 3, borderBottomColor: '#B98CE0' }
                : { borderBottomWidth: 3, borderBottomColor: 'gray' }
            }
            onClick={() => archiveBarClick(index)}
          >
            {item.name}
          </ArchiveBarBtn>
        ))}
      </ArchiveBarDiv>
      <ArchiveBodyDiv>
        {isArchive.map((item, index) => (
          <ArchiveImgDiv
            key={index}
            onClick={() =>
              navigate(`/item/${menuName[isArchiveBarName].name}/${item}`)
            }
          >
            {item.media_set.length > 0 && <ArchiveImg src={item.media_set[0].file_url} alt="" />}
          </ArchiveImgDiv>
        ))}
        {isFolderModal && <ArchiveFolder onClose={modalOff} />}
      </ArchiveBodyDiv>
      {!isLoggedIn && (
        <Notification>
          로그인하시면 더 많은 서비스를 이용해보실 수 있습니다.
        </Notification>
      )}
    </ArchiveContainer>
  );
};

export default LandingPage;
