import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const createLeaveType = async (payload) => {
    try {
        const response = await axios.post(`/leave/create`, payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

export const getLeaveTypeList = async () => {
    try {
        const response = await axios.get(`/leave/list`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

export const allocateLeave = async (payload) => {
    try {
        const response = await axios.post(`/leave/allocate`, payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

export const allocateedLeaveList = async () => {
    try {
        const response = await axios.get(`/leave/allocate-list`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};


export const createLeaveRequest = async (payload) => {
    try {
        const response = await axios.post(`/leave/request`, payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};


export const getLeaveRequest = async () => {
    try {
        const response = await axios.get(`/leave/request-list`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An error occurred during registration.' };
    }
};

