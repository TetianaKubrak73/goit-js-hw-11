import axios from "axios";
export async function fetchResult(pictureName, page) {
    
    const BASE_URL = "https://pixabay.com/api/"
    const API_KEY = "40817435-1d4e957f2edd0c7328f727191"
    const params = new URLSearchParams({
        key: API_KEY,
        q: pictureName,
        per_page: 40,
        page: page,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        
    })
    try {
        const response = await axios.get(`${BASE_URL}?${params}`);
         return {
            hits: response.data.hits,// "hits" содержит массив изображений
            totalHits: response.data.totalHits,
        }; 
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}