import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const ProfileImage = styled.img``;

const LoginTextWrap = styled.div`
  margin-left: 12px;
`;

const LoginText = styled.div`
  font-size: 16px;
  color: #141217;
`;

const AdditionalText = styled.div`
  font-size: 14px;
  color: #756982;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    ${LoginText}, ${AdditionalText} {
      color: #b98ce0; /* Change text color on hover */
    }
  }
`;

const LoginWrap = () => {
  return (
    <LoginContainer>
      <ProfileImage src="/profile.png" alt="프로필" />
      <LoginTextWrap>
        <StyledLink to="/login" className="login">
          <LoginText>로그인하기</LoginText>
          <AdditionalText>로그인하기를 눌러 회원가입 및 로그인</AdditionalText>
        </StyledLink>
      </LoginTextWrap>
    </LoginContainer>
  );
};

export default LoginWrap;
