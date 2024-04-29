import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin: 0 auto;
`;
const SloginButton = styled.button`
  width: 25vw;
  height: 40px;
  min-width: 150px;
  margin-top: 36px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: #b9b9b9;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;
const ModalTitle = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  font-size: 22px;
  font-weight: bold;
`;

const TermsModal = () => {
  const navigate = useNavigate();

  return (
    <ModalBody>
      <ModalTitle>이용 약관</ModalTitle>

      <SloginButton onClick={() => navigate('/signup')}>
        위 약관에 동의합니다.
      </SloginButton>
    </ModalBody>
  );
};

export default TermsModal;
