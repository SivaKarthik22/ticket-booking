import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "../redux/UserSlice";
import { Layout, Menu, Button, Flex } from "antd";
import { UserOutlined } from '@ant-design/icons';
import '../styles/component-styles.css'
import { getUser } from "../redux/UserSlice";

function ProtectedComp({children}){
    const navigate = useNavigate();
    const {user} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const setUser = UserSlice.actions.setUser;

    useEffect(()=>{
        dispatch(getUser());
    },[]);

    function logout(){
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/login');
    }
    function goToProfile(){
        if(user.role == 'customer')
            navigate('/customer-profile');
        else if(user.role == 'admin')
            navigate('/admin-profile');
        else if(user.role == 'partner')
            navigate('/partner-profile');
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
                {label: <span onClick={goToProfile}>My Profile</span> },
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
                    {user ? 
                        (<Menu 
                            mode="horizontal"
                            theme="light"
                            items={navItems}
                            defaultSelectedKeys={['1']}
                            className="nav-menu white-bg"
                        ></Menu>) :
                        (<Flex gap="small">
                            <Button onClick={()=>{navigate('/login')}}>Login</Button>
                            <Button onClick={()=>{navigate('/register')}} type="primary">Get Started</Button>
                        </Flex>)
                    }
                </Layout.Header>
                <Layout.Content className="white-bg content">
                    <div className="content-container">
                        {children}
                    </div>
                </Layout.Content>
            </Layout>
        </>
    );
}

export default ProtectedComp;