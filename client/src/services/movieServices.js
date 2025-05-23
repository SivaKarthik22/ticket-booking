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
        const response = await movieAxiosInstance.post("/add-movie", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function putMovie(values){
    try{
        const response = await movieAxiosInstance.put("/update-movie", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function deleteMovie(values){
    try{
        const response = await movieAxiosInstance.delete(`/delete-movie/${values._id}`);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function getMovie(movieId){
    try{
        const response = await movieAxiosInstance.get(`/get-movie/${movieId}`);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}