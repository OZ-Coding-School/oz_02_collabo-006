// import { useEffect, useRef } from 'react';
import closeIcon from '../../asset/close.svg';
import loginLogo from '../../asset/modalLogo.png';
import modalBigLogo from '../../asset/modalBigLogo.svg';
import styled from 'styled-components';
import LoginDetail from './components/LoginDetail';
import { LIGHT_PURPLE } from 'constant/colors';

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
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32%;
  min-height: 62vh;
  min-width: 350px;
  border: 1px solid ${LIGHT_PURPLE};
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 3px 2px rgba(20, 18, 23, 0.3);
  z-index: 1000;
`;
const ModalHeader = styled.div`
  text-align: center;
`;
const SmodalBigLogo = styled.img`
  padding-top: 3px;
  padding-right: 40px;
`;
const ModalNav = styled.div`
  padding: 16px 17px;
  height: 55px;
  border-bottom: 1px solid #e5e8eb;
  display: flex;
  justify-content: space-between;
`;
const SmodalLogo = styled.img`
  width: 87px;
  height: 24px;
`;
const ScloseIcon = styled.img`
  width: 18px;
  height: auto;
`;
const CloseButton = styled.button`
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

// 명시적인 함수 선언 방식을 사용하여 컴포넌트를 정의합니다.
const LoginModal = ({ onClose }: LoginModalProps) => {
  // const modalRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       onClose(); // 모달 외부 클릭 시 onClose 함수 실행
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [onClose]);

  return (
    <ModalBackDrop>
      <ModalContainer>
        <ModalNav>
          <SmodalLogo src={loginLogo} alt="Modal Logo" />
          <CloseButton onClick={onClose}>
            <ScloseIcon src={closeIcon} alt="Close" />
          </CloseButton>
        </ModalNav>
        <ModalHeader>
          <SmodalBigLogo src={modalBigLogo} alt="Big Modal Logo" />
        </ModalHeader>
        <LoginDetail onClose={onClose} />
      </ModalContainer>
    </ModalBackDrop>
  );
};
export default LoginModal;
