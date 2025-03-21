import { jwtDecode } from 'jwt-decode'

export const getLoginData = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};