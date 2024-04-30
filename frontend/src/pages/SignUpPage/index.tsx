import styled from 'styled-components';
import loginLogo from '../../asset/modalLogo.png';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const SignUpHeader = styled.div`
  height: 65px;
  border-bottom: 1px solid #e5e8eb;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const SmodalLogo = styled.img`
  width: 87px;
  height: 24px;
  margin: 19.5px 0 19.5px 40px;
  cursor: pointer;
`;

const SsignUpTitle = styled.h2`
  text-align: center;
  height: 76px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 32px;
  color: #141217;
`;

const SignUpBody = styled.div`
  width: 512px;
`;

const InputWrap = styled.div`
  height: 100px;
  margin-top: 24px;
`;

const SbodyText = styled.label`
  font-size: 16px;
  display: block;
  text-align: left;
`;

const SInput = styled.input`
  width: 100%;
  height: 5.5vh;
  background-color: #ffffff;
  border: 1px solid #e0dee3;
  border-radius: 12px;
  margin-top: 12px;
  padding: 16px;
  font-size: 16px;

  &:focus {
    border-color: #b98ce0;
    outline: none;
  }
  &::placeholder {
    color: #756982;
    font-size: 16px;
  }
`;

const SinformText = styled.span`
  font-size: 16px;
  display: block;
  text-align: left;
  font-size: 14px;
  color: #756982;
  margin-top: 6px;
`;

const SsignupButton = styled.button`
  width: 512px;
  height: 40px;
  min-width: 230px;
  margin-top: 36px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: #b9b9b9;
  border-radius: 20px;
  border: none;
`;
const StermsText = styled.span`
  display: block;
  margin-top: 20px;
  font-size: 14px;
  color: #756982;
  text-align: center;
  width: 100%;
`;
const LinkText = styled.a`
  font-weight: bold;
  color: #756982;
  text-decoration: underline;
`;
const Bold = styled.strong`
  font-weight: bold;
`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleTermsClick = () => {
    alert('네디플의 이용약관');
  };

  const handlePrivacyClick = () => {
    alert('개인정보 수집 안내');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    alert('회원가입 완료');
  };

  return (
    <Container>
      <SignUpHeader>
        <SmodalLogo
          src={loginLogo}
          alt="Modal Logo"
          onClick={() => navigate('/')}
        />
      </SignUpHeader>
      <form onSubmit={handleSubmit}>
        <SsignUpTitle>Create an account</SsignUpTitle>
        <SignUpBody>
          <InputWrap>
            <SbodyText>ID</SbodyText>
            <SInput type="text" placeholder="아이디" />
            <SinformText>4자리 이상 입력해주세요.</SinformText>
          </InputWrap>
          <InputWrap>
            <SbodyText>Password</SbodyText>
            <SInput type="password" placeholder="비밀번호" />
            <SinformText>8자리 이상입력해주세요.</SinformText>
          </InputWrap>
          <InputWrap>
            <SbodyText>휴대폰 번호</SbodyText>
            <SInput type="tel" placeholder="+82" />
          </InputWrap>
          <InputWrap>
            <SbodyText>Email</SbodyText>
            <SInput type="email" placeholder="이메일" />
          </InputWrap>
          <SinformText>추천인 아이디 입력</SinformText>
          <SsignupButton type="submit">동의하고 가입하기</SsignupButton>
          <StermsText>
            <Bold>만 14세 이상</Bold>이며,{' '}
            <LinkText href="#" onClick={handleTermsClick}>
              네디플의 이용약관
            </LinkText>
            ,{' '}
            <LinkText href="#" onClick={handlePrivacyClick}>
              개인정보 수집 안내
            </LinkText>
            를 확인하고 <Bold>동의합니다</Bold>.
          </StermsText>
        </SignUpBody>
      </form>
    </Container>
  );
};

export default SignUpPage;
