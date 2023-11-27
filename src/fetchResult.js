import axios from "axios";
export async function fetchResult(searchImage, page) {

    const URL = "https://pixabay.com/api/"
    const API_KEY = "40817435-1d4e957f2edd0c7328f727191"
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchImage,
        per_page: 40,
        page: page,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    })
     try {
        const response = await axios.get(`${URL}?${params}`);
        return response.data.hits; // "hits" содержит массив изображений
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}