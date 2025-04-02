import { movieAxiosInstance } from ".";

/*export async function fetchAllMovies(){
    try{
        const response = await movieAxiosInstance.get('/get-all-movies');
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
    
}*/

export function fetchAllMovies(){
    return new Promise((resolve, reject)=>{
        movieAxiosInstance.get('/get-all-movies')
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
}

export async function postMovie(values){
    try{
        const response = await movieAxiosInstance.post("/add-movie", values)
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}