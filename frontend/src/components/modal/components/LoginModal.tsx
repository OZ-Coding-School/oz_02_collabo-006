import React from 'react';
import styled from 'styled-components';

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin: 0 auto;
`;
const InputWrap = styled.div`
  margin-top: 24px;
`;
const SbodyText = styled.span`
  font-size: 16px;
`;
const SInput = styled.input`
  width: 25vw;
  height: 5.5vh;
  min-width: 150px;
  background-color: #f2f2f5;
  border-width: 0;
  border-radius: 12px;
  margin-top: 12px;
  padding: 16px;
  font-size: 16px;
`;
const SforgotPW = styled.span`
  margin-top: 12px;
  font-size: 14px;
  color: #756982;
  white-space: nowrap;
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
  background-color: #b88cde;
  border-radius: 20px;
  border: none;
`;
const SignUpTitle = styled.button`
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
  color: #756982;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  &:hover {
    color: #b88cde;
    font-weight: bold;
  }
  &:active {
    color: #756982;
    font-weight: bold;
  }
`;
const ModalTitle = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  font-size: 22px;
  font-weight: bold;
`;
interface LoginModalProps {
  onSignUpClick: () => void;
}
const LoginModal = ({ onSignUpClick }: LoginModalProps) => (
  <ModalBody>
    <ModalTitle>Login</ModalTitle>
    <InputWrap>
      <SbodyText>ID</SbodyText>
      <SInput placeholder="아이디" />
    </InputWrap>
    <InputWrap>
      <SbodyText>Password</SbodyText>
      <SInput placeholder="비밀번호" />
    </InputWrap>
    <SforgotPW>비밀번호를 잊어버리셨나요?</SforgotPW>
    <SloginButton>Login</SloginButton>
    <SignUpTitle onClick={onSignUpClick}>회원 가입</SignUpTitle>
  </ModalBody>
);

export default LoginModal;
