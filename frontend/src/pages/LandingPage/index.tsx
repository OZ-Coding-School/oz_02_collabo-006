import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LIGHT_PURPLE } from 'constant/colors';
import axios from 'axios';
import { GET_ALL_POSTS } from 'constant/endPoint';
import ArchiveFolder from 'components/modal/ArchiveFolder';

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

const ArchiveBarContainer = styled.div`
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
`;

const ArchiveImg = styled.button`
  width: 24%;
  height: 32.5%;
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
  overflow: hidden;
`;

const LandingPage = () => {
  const [isArchiveBarName, setIsisArchiveBarName] = useState(0);
  const [isFolderModal, setIsFolderModal] = useState(false);
  const [isArchive, setIsArchive] = useState([]);

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
    axios.get(GET_ALL_POSTS,{
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    }).then((response) => {
      setIsArchive(response.data.data)
      console.log(isArchive);
    }).catch((error) => {
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
              isArchiveBarName === index
                ? { borderBottomWidth: 3, borderBottomColor: '#B98CE0' }
                : { borderBottomWidth: 3, borderBottomColor: 'gray' }
            }
            onClick={() => archiveBarClick(index)}
          >
            {item.name}
          </ArchiveBarBtn>
        ))}
      </ArchiveBarContainer>
      <ArchiveImgContainer>
        {isArchive.map((item, index) => (
          <ArchiveImg
            key={index}
            onClick={() =>
              navigate(`/item/${menuName[isArchiveBarName].name}/${item}`)
            }
            // onClick={modalOn}
          ></ArchiveImg>
        ))}
        {isFolderModal && <ArchiveFolder onClose={modalOff} />}
      </ArchiveImgContainer>
    </ArchiveContainer>
  );
};

export default LandingPage;
