import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const apiRequest = async (method, endpoint, data = null, customConfig = {}) => {
    try {
        const config = {
            method,
            url: endpoint,
            ...(data && { data }),
            ...customConfig, 
        };

        const response = await apiClient(config);
        return response;
    } catch (error) {
        console.error("API call error:", error);
        throw error; 
    }
};


