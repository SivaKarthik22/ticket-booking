import { userAxiosInstance } from ".";

export async function registerUser(values){
    try{
        const response = await userAxiosInstance.post("/register", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function loginUser(values){
    try{
        const response = await userAxiosInstance.post("/login", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

/*export async function authorizeUser(){
    try{
        const response = await userAxiosInstance.get("/get-valid-user", {
            headers: {'authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}*/

export function authorizeUser(){
    return new Promise((resolve, reject)=>{
        userAxiosInstance.get("/get-valid-user", {
            headers: {'authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
}

export async function generateOTP(values){
    try{
        const response = await userAxiosInstance.post("/mail-otp", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function resetPassword(values){
    try{
        const response = await userAxiosInstance.post("/verify-otp", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}
