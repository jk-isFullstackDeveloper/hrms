import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const signupApi = async (userData) => {
  try {
    const response = await axios.post(`/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during registration.' };
  }
};

export const loginApi = async (credentials) => {
  try {
    const response = await axios.post(`/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Invalid login credentials.' };
  }
};

export const logoutApi = async () => {
  try {
    await axios.post(`/auth/logout`);
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred during logout.' };
  }
};

export const getProfileApi = async (token) => {
  try {
    const response = await axios.get(`/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile.' };
  }
};