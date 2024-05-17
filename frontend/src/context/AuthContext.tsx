import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

// 사용자 인증 정보를 담을 자료형을 정의합니다.
type AuthData = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

// AuthContext의 자료형을 정의
type AuthContextType = {
  isLoggedIn: boolean; // 로그인 상태를 나타냅니다.
  authData: AuthData | null; // 사용자 인증 데이터를 나타냅니다.
  login: (username: string, accessToken: string, refreshToken: string) => void; // 로그인 함수
  logout: () => void; // 로그아웃 함수
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

// 쿠키를 설정하는 함수
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 쿠키의 만료일을 설정
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`; // 쿠키를 설정
};

// 쿠키를 읽는 함수
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null; // 쿠키가 존재하면 값을 반환하고, 없으면 null을 반환
};

// 쿠키를 삭제하는 함수
const deleteCookie = (name: string) => {
  setCookie(name, '', -1); // 쿠키의 만료일을 과거로 설정하여 쿠키를 삭제
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태 관리
  const [authData, setAuthData] = useState<AuthData | null>(null); // 사용자 인증 데이터 관리

  useEffect(() => {
    const username = getCookie('username');
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (username && accessToken && refreshToken) {
      // 모든 쿠키 값이 존재하면
      setAuthData({ username, accessToken, refreshToken }); // 인증 데이터를 설정
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 함수
  const login = (
    username: string,
    accessToken: string,
    refreshToken: string,
  ) => {
    console.log('Setting cookies:', { username, accessToken, refreshToken });
    setCookie('username', username, 7);
    setCookie('accessToken', accessToken, 7);
    setCookie('refreshToken', refreshToken, 7);

    setAuthData({ username, accessToken, refreshToken }); // 인증 데이터를 설정
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const logout = () => {
    deleteCookie('username');
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    setAuthData(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // context가 제공되지 않았다면 에러를 발생
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
