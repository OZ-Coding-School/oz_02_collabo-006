import React, { createContext, useState, ReactNode, useContext } from 'react';

// 사용자 인증 정보를 담을 자료형을 정의합니다.
type AuthData = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

type AuthContextType = {
  isLoggedIn: boolean; // 로그인 상태
  authData: AuthData | null; // 사용자 인증 데이터
  login: (username: string, accessToken: string, refreshToken: string) => void; // 로그인 함수
  logout: () => void; // 로그아웃 함수
};
// React Context API를 사용하여 AuthContext를 생성. 초기값은 undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // 로그인 상태를 확인하고 세션 스토리지의 토큰 유무로 초기 값을 설정
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!sessionStorage.getItem('accessToken'),
  );
  // 사용자 데이터 상태를 관리
  const [authData, setAuthData] = useState<AuthData | null>(null);

  // 로그인 함수
  const login = (
    username: string,
    accessToken: string,
    refreshToken: string,
  ) => {
    // 세션 스토리지에 사용자 정보를 저장
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('username', username);

    // 사용자 정보를 상태에 저장합니다.
    const data = { username, accessToken, refreshToken };
    setAuthData(data);
    setIsLoggedIn(true);
    console.log('로그인 성공');
  };

  // 로그아웃 함수
  const logout = () => {
    // 세션 스토리지에서 사용자 정보를 제거
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('username');

    // 상태를 초기화
    setAuthData(null);
    setIsLoggedIn(false);
    console.log('로그인 실패');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// AuthContext를 사용하기 쉽게 하는 커스텀 훅을 정의
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // context가 제공되지 않았다면 에러를 발생
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
