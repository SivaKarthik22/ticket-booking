import { showAxiosInstance } from ".";

export async function fetchAllShowsByTheatre(theatreId){
    return new Promise((resolve, reject)=>{
        showAxiosInstance.get(`/get-shows-by-theatre/${theatreId}`)
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
}

export async function postShow(values){
    try{
        const response = await showAxiosInstance.post("/add-show", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function putShow(values){
    try{
        const response = await showAxiosInstance.put("/update-show", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function deleteShow(values){
    try{
        const response = await showAxiosInstance.delete(`/delete-show/${values._id}`);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}