import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorizeUser } from "../user service/users";

function ProtectedComp({children}){
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(()=>{
        async function validateToken(){
            const responseData = await authorizeUser();
            if(responseData.success){
                setUserDetails(responseData.data);
            }
            else{
                navigate('/login');
            }
        }
        validateToken();
    },[]);
    
    return(
        <>
            {children}
        </>
    );
}

export default ProtectedComp;