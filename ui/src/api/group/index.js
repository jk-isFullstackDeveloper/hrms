import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const createGroup = async (payload) => {
    try {
        const response = await axios.post(`/group/create`, payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

export const groupList = async () => {
    try {
        const response = await axios.post(`/group/list`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

