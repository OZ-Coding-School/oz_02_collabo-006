import styled from 'styled-components';
import loginLogo from '../../asset/modalLogo.png';
import { useNavigate } from 'react-router-dom';
import SsubmitButton from 'components/common/FormSubmitButton';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { CREATE_USER_ENDPOINT } from 'constant/endPoint';
import { TEXT_BLACK } from 'constant/colors';

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
  color: ${TEXT_BLACK};
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

type InputName = 'username' | 'password' | 'phone' | 'email';
type InputRegexes = {
  [key in InputName]: RegExp;
};

const SignUpPage = () => {
  const navigate = useNavigate();

  // 입력값과 유효성 상태를 관리하기 위한 상태
  const [inputValue, setInputValue] = useState({
    username: '', // 입력된 아이디 데이터
    phone: '',
    password: '',
    email: '',
    profile_image: '',
    // validPhone: true, // 전화번호 인증 여부 (미구현이라 true가 초기값, 추후 리팩토링 예정)
  });

  const [inputValid, setInputValid] = useState({
    usernameValid: false, // 아이디 정규식 충족 여부
    nonUsernameDuplication: false,
    phoneValid: false,
    passwordValid: false,
    emailValid: false,
  });

  // 조건에 부합할 경우 경고 문구
  const [passMessage, setPassMessage] = useState({
    username: '사용가능한 아이디입니다.',
    password: '사용가능한 비밀번호입니다.',
    phone: '',
    email: '',
  });
  // 조건에 부합하지 않는 경우 경고 문구
  const [alertMessage, setAlertMessage] = useState({
    username: '4자리 이상 영문, 숫자와 특수기호(_),(-) 사용 가능합니다.',
    password: '8자리 이상 영문 대/소문자, 숫자, 특수문자를 사용해주세요.',
    phone: '휴대폰 번호를 다시 확인해주세요.',
    email: '이메일을 다시 확인해주세요.',
  });

  // 폼 제출 요구 사항 충족 여부
  const submitRequirements = // 아래 조건을 모두 충족할 시 제출 버튼 활성화.
    inputValue.username && // 아이디가 입력되었는가?
    // inputValue.nonUsernameDuplication && // 아이디가 중복되지 않았는가? (추후 리팩토링 예정)
    inputValue.password && // 비밀번호가 입력되었는가?
    // inputValue.validPhone && // 전화번호가 인증되었는가? (추후 리팩토링 예정)
    inputValue.phone && // 전화번호가 입력하였는가?
    inputValue.email && // 이메일을 입력하였는가?
    inputValid.usernameValid && // 아이디가 정규식에 부합하는가?
    inputValid.passwordValid && // 비밀번호가 정규식에 부합하는가?
    inputValid.phoneValid && // 전화번호가 정규식에 부합하는가?
    inputValid.emailValid; // 이메일이 정규식에 부합하는가?

  console.log(`유효성조건 모두 ${submitRequirements ? '충족' : '불충족'}`);

  // 정규식 모음 객체
  const inputRegexes: InputRegexes = {
    // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 4~20자 이내
    username: /^[a-zA-Z][a-zA-Z0-9_-]{3,19}$/,
    // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    // 전화번호 : 01|0,1,6,7,8,9 , 하이픈(-)이 올 수도 있고, 없을 수 있음, 0~9 숫자 중 4개가 올 수 있음
    phone: /^(01[016789]{1})-?[0-9]{4}-?[0-9]{4}$/,
    // 이메일 :  영문자 또는 숫자로 시작, (-), (_), (.) 문자가 올 수 있음(단, 연속으로 오지 않아야 함), @ 기호 다음에는 도메인 이름
    email:
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
  };

  // 입력값 변경 처리 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // name : 입력 필드 이름, value : 사용자가 입력한 값
    const { name, value } = event.target as { name: InputName; value: string };

    // isValid: 입력 값이 정규식에 의해 유효한지의 결과를 나타내는 불리언 값
    const isValid = inputRegexes[name].test(value);

    console.log(`유효성 검사 ${name}: ${isValid ? '통과' : '실패'}`);

    setInputValue((prev) => ({
      ...prev, // 이전 상태의 모든 값 복사
      [name]: value, // 현재 필드의 값을 업데이트, ex) {username: "admin"} => 'username' 프로퍼티를 새로운 값으로 업데이트
    }));
    setInputValid((prev) => ({
      ...prev, // 이전 상태의 모든 값 복사
      [`${name}Valid`]: isValid, // 입력 필드의 유효성 결과를 저장, ex) {usernameValid: true} => 'usernameValid' 프로퍼티를 유효성 검사 결과로 업데이트
    }));
  };
  // 폼 제출 처리 함수
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (submitRequirements) {
      axios
        .post(CREATE_USER_ENDPOINT, {
          username: inputValue.username,
          phone: inputValue.phone,
          password: inputValue.password,
          email: inputValue.email,
          profile_image: 's3url',
        })
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
            navigate('/');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('회원가입 실패');
    }
  };
  const handleTermsClick = () => {
    alert('네디플의 이용약관');
  };
  const handlePrivacyClick = () => {
    alert('개인정보 수집 안내');
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
            <SInput
              type="text"
              name="username"
              placeholder="아이디"
              value={inputValue.username}
              onChange={handleInputChange}
            />
            <SinformText
              style={{
                color: inputValue.username
                  ? inputValid.usernameValid
                    ? '#B98CE0'
                    : '#FF007A'
                  : '#756982',
              }}
            >
              {inputValue.username
                ? inputValid.usernameValid
                  ? passMessage.username
                  : alertMessage.username
                : '아이디를 입력해주세요.'}
            </SinformText>
          </InputWrap>
          <InputWrap>
            <SbodyText>Password</SbodyText>
            <SInput
              type="password"
              name="password"
              placeholder="비밀번호"
              value={inputValue.password}
              onChange={handleInputChange}
            />
            <SinformText
              style={{
                color: inputValue.password
                  ? inputValid.passwordValid
                    ? '#B98CE0'
                    : '#FF007A'
                  : '#756982',
              }}
            >
              {inputValue.password
                ? inputValid.passwordValid
                  ? passMessage.password
                  : alertMessage.password
                : '비밀번호를 입력해주세요.'}
            </SinformText>
          </InputWrap>
          <InputWrap>
            <SbodyText>휴대폰 번호</SbodyText>
            <SInput
              type="tel"
              name="phone"
              placeholder="+82"
              value={inputValue.phone}
              onChange={handleInputChange}
            />
            <SinformText
              style={{
                color: inputValue.phone
                  ? inputValid.phoneValid
                    ? '#B98CE0'
                    : '#FF007A'
                  : '#756982',
              }}
            >
              {inputValue.phone
                ? inputValid.phoneValid
                  ? passMessage.phone
                  : alertMessage.phone
                : ''}
            </SinformText>
          </InputWrap>
          <InputWrap>
            <SbodyText>Email</SbodyText>
            <SInput
              type="email"
              name="email"
              placeholder="이메일"
              value={inputValue.email}
              onChange={handleInputChange}
            />
            <SinformText
              style={{
                color: inputValue.email
                  ? inputValid.emailValid
                    ? '#B98CE0'
                    : '#FF007A'
                  : '#756982',
              }}
            >
              {inputValue.email
                ? inputValid.emailValid
                  ? passMessage.email
                  : alertMessage.email
                : ''}
            </SinformText>
          </InputWrap>
          <SsubmitButton
            type="submit"
            $validated={!!submitRequirements}
            disabled={!submitRequirements}
          >
            동의하고 가입하기
          </SsubmitButton>
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
