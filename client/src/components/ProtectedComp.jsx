import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorizeUser } from "../user service/users";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "../redux/userSlice";

function ProtectedComp({children}){
    const navigate = useNavigate();
    const {user} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const setUser = UserSlice.actions.setUser;

    useEffect(()=>{
        async function validateToken(){
            const responseData = await authorizeUser();
            if(responseData.success){
                dispatch(setUser(responseData.data));
            }
            else{
                navigate('/login');
            }
        }
        validateToken();
    },[user]);

    function logout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    
    return(
        <>
            {children}
            {user && user.name}
            <br/>
            <button onClick={logout} > Logout </button>
        </>
    );
}

export default ProtectedComp;