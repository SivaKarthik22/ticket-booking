import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorizeUser } from "../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "../redux/UserSlice";
import { Layout, Menu } from "antd";
import { UserOutlined } from '@ant-design/icons';
import '../styles/component-styles.css'

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

    const navItems = [
        {
            label: <Link to="/">Home</Link>,
            key: 1,
        },
        {label: "Menu2", key: 2},
        {
            label: `Hi, ${user ? user.name : "guest"}`,
            icon: <UserOutlined style={{fontSize:"16px", color:"#f84464"}} />,
            key: 3,
            children: [
                {label: "My Profile"},
                {label: <span onClick={logout}>Sign out</span> },
            ],
        },
    ];
    
    return(
        <>
            <Layout>
                <Layout.Header className="header white-bg" >
                    <img 
                        width="140"
                        src="/MyDayMyShow_logo.png"
                        onClick={ ()=>{navigate('/')} }
                        className="cursor-pointer"
                    />
                    <Menu 
                        mode="horizontal"
                        theme="light"
                        items={navItems}
                        defaultSelectedKeys={['1']}
                        className="nav-menu white-bg"
                        color="danger"
                    ></Menu>
                </Layout.Header>
                <Layout.Content className="white-bg content">
                    {children}
                </Layout.Content>
            </Layout>
        </>
    );
}

export default ProtectedComp;