import axios from 'axios';
import { LOGOUT_USER_ENDPOINT } from 'constant/endPoint';
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

// 사용자 인증 정보를 담을 자료형을 정의합니다.
type AuthData = {
  username_data: string;
};

// AuthContext의 자료형을 정의
type AuthContextType = {
  isLoggedIn: boolean; // 로그인 상태를 나타냅니다.
  authData: AuthData | null; // 사용자 인증 데이터를 나타냅니다.
  login: (username_data: string, accessToken: string, refreshToken: string) => void; // 로그인 함수
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
  const storageUserName = localStorage.getItem('username');

  // 로그인 함수
  const login = (username_data: string) => {
    setAuthData({ username_data }); // 인증 데이터를 설정
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (storageUserName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [storageUserName]);

  // 로그아웃 함수
  const logout = () => {
    axios
      .post(
        LOGOUT_USER_ENDPOINT,
        {},
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        if (response.data.success) {
          setAuthData(null);
          setIsLoggedIn(false);
          localStorage.clear(); // 로컬 스토리지의 모든 데이터를 삭제
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
