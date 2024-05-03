import React, {
  createContext,
  useState,
  useContext,
  ChangeEvent,
  FormEvent,
} from 'react';


interface InputValue {
  username: string;
  phone: string;
  password: string;
  email: string;
  profile_image: string;
}

interface InputValidity {
  usernameValid: boolean; // 사용자 이름의 유효성
  passwordValid: boolean; // 비밀번호의 유효성
  nonUsernameDuplication: boolean; // 사용자 이름 중복 여부
  phoneValid: boolean; // 전화번호의 유효성
  emailValid: boolean; // 이메일의 유효성
}

// Form 타입 정의
interface FormContextType {
  inputValue: InputValue; // 사용자가 입력한 값
  setInputValue: React.Dispatch<React.SetStateAction<InputValue>>; // 입력 값 업데이트 함수
  inputValidity: InputValidity; // 입력 값의 유효성 상태
  setInputValidity: React.Dispatch<React.SetStateAction<InputValidity>>; // 입력 값의 유효성 업데이트 함수
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void; // 입력 값 변경 이벤트 핸들러
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void; // 폼 제출 이벤트 핸들러
  submitRequirements: boolean; // 폼 제출 요구 사항 충족 여부
}

// createContext 함수를 사용하여 FormContext 생성
const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [inputValue, setInputValue] = useState<InputValue>({
    username: '',
    phone: '',
    password: '',
    email: '',
    profile_image: '',
  });
  // 입력 값과 유효성 상태
  const [inputValidity, setInputValidity] = useState<InputValidity>({
    usernameValid: false,
    passwordValid: false,
    nonUsernameDuplication: false,
    phoneValid: false,
    emailValid: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));

    setInputValidity((prevInputValidity) => ({
      ...prevInputValidity,
      [`${name}Valid`]: validateInput(name, value),
    }));
  };

  const validateInput = (name: string, value: string): boolean => {
    // 정규식 모음 객체
    const inputRegexs: { [key: string]: RegExp } = {
      // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내
      usernameRegex: /^[a-zA-Z][a-zA-Z0-9_-]{3,19}$/,
      // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
      passwordRegex:
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
      // 전화번호: 01|6,7,8,9 , 하이픈(-)이 올 수도 있고, 없을 수 있음,0~9 숫자 중 4개가 올 수 있음
      phoneRegex: /^(01[016789]{1})-?[0-9]{4}-?[0-9]{4}$/,
      emailRegex:
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
    };

    // 해당 필드의 정규식을 key를 사용하여 찾음.
    const regexKey = `${name}Regex`;
    // 정규식 패턴이 가져와짐
    const regex = inputRegexs[regexKey];
    // regex가 존재하면 test 함수를 사용하여 유효성 검사를 수행.
    const isValid = regex ? regex.test(value) : false;
    // 로그에 출력
    console.log(`Field: ${name}, Value: ${value}, IsValid: ${isValid}`);

    return isValid;
  };

  // 폼 제출 시 필요한 조건
  const submitRequirements =
    inputValidity.usernameValid &&
    inputValidity.nonUsernameDuplication &&
    inputValidity.passwordValid &&
    inputValidity.emailValid &&
    inputValidity.phoneValid;

  // 폼 제출 핸들러
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitRequirements) {
      console.log('Form data:', inputValue);
      // 폼 제출 로직 수행, 예를 들어 API 호출 등
    } else {
      alert('모든 필드가 올바르게 채워지고 유효성 검사를 통과해야 합니다.');
    }
  };

  return (
    <FormContext.Provider
      value={{
        inputValue,
        setInputValue,
        inputValidity,
        setInputValidity,
        handleInputChange,
        handleSubmit,
        submitRequirements,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// useForm 커스텀 훅을 정의
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(' FormProvider 안에서만 useForm을 호출할 수 있습니다.');
  }
  return context;
};
