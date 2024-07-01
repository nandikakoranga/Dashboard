// api.js
import axios from 'axios';

const API_BASE_URL = 'https://dashboard-ten-puce.vercel.app/
    /api';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const applyFilters = async (filters) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/filter`, filters);
        return response.data;
    } catch (error) {
        console.error('Error applying filters:', error);
        throw error;
    }
};
