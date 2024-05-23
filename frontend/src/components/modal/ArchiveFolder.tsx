// import { useEffect, useRef } from 'react';
import closeIcon from '../../asset/close.svg';
import styled from 'styled-components';
import { INPUT_TEXT, LIGHT_GRAY, LIGHT_PURPLE } from 'constant/colors';
import { useState } from 'react';
import folderModalLogo from '../../asset/folderModal/folderModalLogo.svg';
import { ReactComponent as FolderIcon } from '../../asset/folderModal/folder-g.svg';
import { ReactComponent as PlusIcon } from '../../asset/folderModal/plusButton.svg'

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(117, 105, 130, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const ModalContainer = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32%;
  min-height: 10vh;
  min-width: 350px;
  border: 1px solid ${LIGHT_PURPLE};
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 3px 2px rgba(20, 18, 23, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ModalInput = styled.input`
  width: 60%;
  height: 40px;
  padding: 20px;
  border: none; 
  border-radius: 20px; 
  font-size: 18px; 
  background-color: ${LIGHT_GRAY};
  color: ${INPUT_TEXT}; 
`
const ModalText = styled.h3`
  cursor: default;
  flex: 1;
  text-align: center;
`

const ModalBody = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`

const ModalButton = styled.button`
  width: 45%;
  height: 40px;
  margin: auto;
  margin-bottom: 10px;
  background-color: white;
  border: 2px solid ${LIGHT_PURPLE}; /* 테두리 없애기 */
  color: ${LIGHT_PURPLE};
  font-size: 14px; /* 글꼴 크기 */
  font-weight: bold; /* 글꼴 굵기 */
  cursor: pointer;
  border-radius: 20px;
`;

const ModalNav = styled.div`
  padding: 16px 17px;
  height: 55px;
  border-bottom: 1px solid #e5e8eb;
  display: flex;
  align-items: center;
`;

const FmodalLogoDiv = styled.div`
  display: flex;
  align-items: center;
  width: 23%;
`

const FmodalLogo = styled.img`
  width: 24px;
  height: 24px;
  
`;

const FmodalLogoText = styled.text`
  color:${LIGHT_PURPLE};
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
`

const FcloseIcon = styled.img`
  width: 18px;
  height: auto;
`;

const FmodalFolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FmodalFolderName = styled.div`
  margin-top: 10px;
  height: 10%;
`;

const FmodalIcons = styled.div`
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover path{
    fill: ${LIGHT_PURPLE}
  }
`;

const FmodalFolderIcon = styled(FolderIcon)`
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -60%);
  width: 70%;
  height: 100%;
  min-width: 96px;
  min-height: 81px;
  margin-top: 10px;
`;

const FmodalPlusIcon = styled(PlusIcon)`
  width: 30%;
  height: 30%;
  min-width: 24px;
  min-height: 24px;
  position: absolute;
  top: calc(50% + 10px);
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
  margin-left: auto;
  width: 16px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

interface LoginModalProps {
  onClose: () => void;
}

const ArchiveFolder = ({ onClose }: LoginModalProps) => {

  const [isFolderName, setIsFolderName] = useState("")
  const [isFolderList, setIsFolderList] = useState([{},{},{},{}])

  return (
    <ModalBackDrop>
      <ModalContainer>
        <ModalNav>
          <FmodalLogoDiv>
            <FmodalLogo src={folderModalLogo} alt="Modal Logo" />
            <FmodalLogoText>내 아카이브</FmodalLogoText>
          </FmodalLogoDiv>
          {isFolderName.length > 0 ? <ModalInput /> : <ModalText>{isFolderList.length === 0 ? "저장할 폴더를 생성해주세요." : "저장할 폴더를 선택해주세요."}</ModalText>}
          <FmodalLogoDiv>
            <CloseButton onClick={onClose}>
              <FcloseIcon src={closeIcon} alt="Close" />
            </CloseButton>
          </FmodalLogoDiv>
        </ModalNav>
        <ModalBody>
          {isFolderList.map((item, index) => {
            return (
              <FmodalFolder>
                <FmodalIcons>
                  <FmodalFolderIcon/>
                  <FmodalPlusIcon/>
                </FmodalIcons>
                <FmodalFolderName>{item !== 0 ? "":"s"}</FmodalFolderName>
              </FmodalFolder>
            )
          })}
        </ModalBody>
        <ModalButton>'{isFolderName}' 아카이브에 저장</ModalButton>
      </ModalContainer>
    </ModalBackDrop>
  );
};
export default ArchiveFolder;
