import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';


export const generateBlog = async (title) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/generate`, { title });
        return data;
    } catch (error) {
        return error
    }
};

export const retrieveBlog = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/api/retrieve`);
        console.log(data)
        return data;
    } catch (error) {
        return error
    }
}

