import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from 'components/modal/LoginModal';
import { LIGHT_PURPLE, TEXT_BLACK } from 'constant/colors';
import { useAuth } from 'context/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: 275px;
  height: 40px;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const ProfileImage = styled.img`
  max-width: 40px;
  max-height: 40px;
  @media (max-width: 768px) {
    margin-left: 5px;
  }
`;

const LoginTextWrap = styled.div`
  margin-left: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginText = styled.div<{ $isLink?: boolean }>`
  font-size: 16px;
  color: ${TEXT_BLACK};
  text-decoration: ${(props) => (props.$isLink ? 'underline' : 'none')};
`;

const AdditionalText = styled.div`
  font-size: 14px;
  color: #756982;
  margin-top: 3px;
`;

const ProfileWrap = styled.div`
  color: inherit;
  white-space: nowrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
  &:hover {
    ${LoginText} {
      color: ${LIGHT_PURPLE};
    }
    ${AdditionalText} {
      color: ${LIGHT_PURPLE};
    }
  }
`;

const LoginWrap = () => {
  const { isLoggedIn, authData } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 모달을 열기
  const openModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsModalVisible(true);
  };

  // 모달을 닫기
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <LoginContainer>
      <ProfileImage src="/profile.png" alt="프로필" />
      <LoginTextWrap>
        {isLoggedIn && authData ? (
          <ProfileWrap>
            <LoginText>{authData.username}</LoginText>
            <AdditionalText>게시물 0 저장됨 0 팔로워 0</AdditionalText>
          </ProfileWrap>
        ) : (
          <StyledLink to="" className="login" onClick={openModal}>
            <LoginText $isLink={true}>로그인하기</LoginText>
            <AdditionalText>
              로그인하기를 눌러 회원가입 및 로그인
            </AdditionalText>
          </StyledLink>
        )}
      </LoginTextWrap>
      {isModalVisible && <LoginModal onClose={closeModal} />}
    </LoginContainer>
  );
};

export default LoginWrap;
