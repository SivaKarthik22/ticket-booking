import { userAxiosInstance } from ".";

export async function registerUser(values){
    try{
        const response = await userAxiosInstance.post("/register", values)
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function loginUser(values){
    try{
        const response = await userAxiosInstance.post("/login", values)
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function authorizeUser(){
    try{
        const response = await userAxiosInstance.get("/get-valid-user", {
            headers: {'authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}