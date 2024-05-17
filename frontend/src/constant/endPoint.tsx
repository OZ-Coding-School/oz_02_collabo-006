export const CREATE_USER_ENDPOINT = 'http://127.0.0.1:8000/api/v1/user/create/';
export const UPDATE_USER_ENDPOINT = (userId: Number) => {
  return `http://127.0.0.1:8000/api/v1/user/${userId}/update/`;
};
export const LOGIN_USER_ENDPOINT = 'http://127.0.0.1:8000/api/v1/user/login/';
export const LOGOUT_USER_ENDPOINT = 'http://127.0.0.1:8000/api/v1/user/logout/';
export const TOKEN_USER_ENDPOINT =
  'http://127.0.0.1:8000/api/v1/user/login/sjwt/';
export const REFRESH_TOKEN_ENDPOINT =
  'http://127.0.0.1:8000/api/v1/user/jwt/refresh/';
export const CREATE_POSTS = 'http://127.0.0.1:8000/api/v1/post/create/';
export const GET_ALL_POSTS = 'http://127.0.0.1:8000/api/v1/post/';
