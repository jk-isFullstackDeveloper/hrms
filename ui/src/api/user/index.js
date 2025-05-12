import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const getAllUsersList = async () => {
    try {
        const response = await axios.get(`/users/list`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};