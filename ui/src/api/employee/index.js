import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const createEmployee = async (payload) => {
    try {
        const response = await axios.post(`/employee/create`, payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

export const getAllEmployees = async () => {
    try {
        const response = await axios.get(`/employee/list`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

