import { theatreAxiosInstance } from ".";

export async function getAllTheatresOfOwner(ownerId){
    try{
        const response = await theatreAxiosInstance.get(`/theatres-by-owner/${ownerId}`);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
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