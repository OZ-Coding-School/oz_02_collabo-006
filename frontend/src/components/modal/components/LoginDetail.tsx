import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SsubmitButton from 'components/common/FormSubmitButton';
import { useState } from 'react';

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25vw;
  margin: 0 auto;
`;

const InputWrap = styled.div`
  margin-top: 24px;
`;

const SbodyText = styled.label`
  font-size: 16px;
`;

const SInput = styled.input`
  width: 25vw;
  height: 5.5vh;
  min-width: 230px;
  background-color: #f2f2f5;
  border-width: 0;
  border-radius: 12px;
  margin-top: 12px;
  padding: 16px;
  font-size: 16px;
`;

const SforgotPW = styled.span`
  display: block;
  margin-top: 12px;
  font-size: 14px;
  color: #756982;
  white-space: nowrap;
  align-self: flex-start;
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
    color: #b98ce0;
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

const LoginDetail = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const isFormValid = id.length > 0 && password.length > 0;

  return (
    <ModalBody>
      <ModalTitle>Login</ModalTitle>
      <form>
        <InputWrap>
          <SbodyText>ID</SbodyText>
          <SInput
            type="text"
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
          />
        </InputWrap>
        <InputWrap>
          <SbodyText>Password</SbodyText>
          <SInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputWrap>
        <SforgotPW>비밀번호를 잊어버리셨나요?</SforgotPW>
        <SsubmitButton type="submit" $validated={isFormValid}>
          Login
        </SsubmitButton>
      </form>
      <SignUpTitle onClick={() => navigate('/signup')}>회원 가입</SignUpTitle>
    </ModalBody>
  );
};

export default LoginDetail;
