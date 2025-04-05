import { theatreAxiosInstance } from ".";

export async function fetchAllTheatresOfOwner(ownerId){
    return new Promise((resolve, reject)=>{
        theatreAxiosInstance.get(`/get-theatres-by-owner/${ownerId}`)
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
}

export async function fetchAllTheatres(){
    return new Promise((resolve, reject)=>{
        theatreAxiosInstance.get("/get-all-theatres")
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
}

export async function postTheatre(values){
    try{
        const response = await theatreAxiosInstance.post("/add-theatre", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function putTheatre(values){
    try{
        const response = await theatreAxiosInstance.put("/update-theatre", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function deleteTheatre(values){
    try{
        const response = await theatreAxiosInstance.delete(`/delete-theatre/${values._id}`);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}