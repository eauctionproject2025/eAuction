import axios from 'axios';
 
const API_URL = `${process.env.NEXT_BACKEND_URL}/api/auth`;

//Register user
export const registerUser = async (userData) => {
    try {
        // send the data to the backend
        const response = await axios.post(`${API_URL}/register`, userData,{
            method: 'POST',
            headers:{ 'Content-Type': 'multipart/form-data'},
    });
    return response.data; // response from backend
    } catch (error) {
        return error.response.data || {error : 'Registration failed'};
    }
};

//Login user
export const loginUser = async (Credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, Credentials, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 204) {
        throw new Error('Login failed');
      }
      return response.data || { message: 'Welcome here' };
    } catch (error) {
      if (error.response) {
        throw error.response;
      } else {
        throw new Error("Network error or server is unreachable.");
      }
    }
  };