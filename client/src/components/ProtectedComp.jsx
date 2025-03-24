import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorizeUser } from "../user service/users";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "../redux/UserSlice";
import { Layout, Menu } from "antd";

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
                //dispatch(setUser(null));
                navigate('/login');
            }
        }
        validateToken();
    },[]);

    function logout(){
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/login');
    }
    
    return(
        <>
            <Layout>
                <Layout.Header style={{display:'flex', alignItems:'center'}}>
                    <h3>My Day My Show</h3>
                    <Menu mode="horizontal"></Menu>
                    <button onClick={logout} > Logout </button>
                </Layout.Header>
                <Layout.Content>
                    {children}
                    {user && user.name}
                </Layout.Content>
            </Layout>
        </>
    );
}

export default ProtectedComp;