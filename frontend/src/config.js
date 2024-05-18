// src/config.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://web:8000';
console.log(process.env.REACT_APP_API_BASE_URL);

export default API_BASE_URL;
