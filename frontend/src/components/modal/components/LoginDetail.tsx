import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SsubmitButton from 'components/common/FormSubmitButton';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import { LOGIN_USER_ENDPOINT, TOKEN_USER_ENDPOINT } from 'constant/endPoint';
import { LIGHT_GRAY, LIGHT_PURPLE } from 'constant/colors';

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
  background-color: ${LIGHT_GRAY};
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
    color: ${LIGHT_PURPLE};
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
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 로그인 처리 함수
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // 로그인 API 호출
      const response = await axios.post(
        LOGIN_USER_ENDPOINT,
        {
          username,
          password,
        },
        { withCredentials: true },
      );
      console.log(response.data);
      const { accessToken, refreshToken } = response.data; // 응답에서 토큰 추출
      login(username, accessToken, refreshToken); // 로그인 상태 업데이트
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error); // 에러 로깅
      alert('로그인 실패.');
    }
  };
  // 입력 필드 변경 핸들러
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value); // 사용자명 상태 업데이트
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // 비밀번호 상태 업데이트
  };

  // 폼 유효성 검사
  const isFormValid = username.length > 0 && password.length > 0;
  return (
    <ModalBody>
      <ModalTitle>Login</ModalTitle>
      <form onSubmit={handleLogin}>
        <InputWrap>
          <SbodyText>ID</SbodyText>
          <SInput
            type="text"
            placeholder="아이디"
            value={username}
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
