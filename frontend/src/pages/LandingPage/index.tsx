import { useState } from 'react';
import styled from 'styled-components';

const menuName = [
  {
    name: "For You",
    text: "For You page"
  },
  {
    name: "Trending",
    text: "Trending page"
  },
  {
    name: "New",
    text: "New page"
  }
]

const img = [
  ["For You page", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ["Trending page", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ["New page", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

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
border-bottom: 1px solid gray
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
border-bottom: 0px solid #B98CE0
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
z-index: 100;
overflow: hidden;
`

const LandingPage = () => {

  const [isArchiveBarName, setIsisArchiveBarName] = useState(0);

  const archiveBarClick = (index: number) => {
    setIsisArchiveBarName(index)
  }

  return (
    <ArchiveContainer>
      <ArchiveBarContainer>
        {menuName.map((item, index) => (
          <ArchiveBarBtn
            key={index}
            style={isArchiveBarName === index ?
              { borderBottomWidth: 3, borderBottomColor: '#B98CE0' } :
              { borderBottomWidth: 3, borderBottomColor: 'gray' }}
            onClick={() => archiveBarClick(index)}
          >
            {item.name}
          </ArchiveBarBtn>
        ))}
      </ArchiveBarContainer>
      <ArchiveImgContainer>
        {img[isArchiveBarName].map((item, index) => (
          <ArchiveImg key={index}>
          </ArchiveImg>
        ))}
      </ArchiveImgContainer>
    </ArchiveContainer>
  );
};

export default LandingPage;
