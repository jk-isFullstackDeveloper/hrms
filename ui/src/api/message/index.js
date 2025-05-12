import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const getPrivateMessages = async (user1,user2) => {
    try {
        const response = await axios.get(`/message/private/${user1}/${user2}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

export const getGroupMessages = async (groupId) => {
    try {
        const response = await axios.get(`message/group/${groupId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

