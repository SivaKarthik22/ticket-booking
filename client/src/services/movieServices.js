import { movieAxiosInstance } from ".";

export async function fetchAllMovies(){
    try{
        const response = await movieAxiosInstance.get('/get-all-movies');
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
    
}