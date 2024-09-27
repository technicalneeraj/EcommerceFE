import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";


const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

export const apiRequest = async (method, endpoint, data = null) => {
    try {
        const config = {
            method,
            url: endpoint,
            ...(data && { data }),
        };

        const response = await apiClient(config);
        return response;
    } catch (error) {
        console.error("API call error:", error);
        throw error; 
    }
};


