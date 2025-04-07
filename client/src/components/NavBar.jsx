import { Layout, Menu, Button, Flex } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserSlice from "../redux/UserSlice";
import { UserOutlined } from '@ant-design/icons';
import '../styles/component-styles.css'

function NavBar({mode, defaultSelectionKey}){
    const {user} = useSelector(store=> store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setUser = UserSlice.actions.setUser;

    const userNavItem = {
        label: `Hi, ${user ? user.name.split(" ")[0] : "guest"}`,
        icon: <UserOutlined style={{fontSize:"16px", color:"#f84464"}} />,
        key: 3,
        children: [
            {label: <span onClick={goToProfile}>My Profile</span> },
            {label: <span onClick={logout}>Sign out</span> },
        ],
    };
    const homeNavItem = {
        label: <Link to="/">Home</Link>,
        key: 1,
    };
    const adminNavItem = {
        label: <Link to="/admin-page">Admin Page</Link>,
        key: 2,
    };
    const partnerNavItem = {
        label: <Link to="/partner-page">Partner Page</Link>,
        key: 2,
    };

    const navItems = ()=>{
        if(!user)
            return [];
        if(user.role == "customer")
            return [homeNavItem, userNavItem];
        if(user.role == "partner")
            return [homeNavItem, partnerNavItem, userNavItem];
        if(user.role == "admin")
            return [homeNavItem, adminNavItem, userNavItem];
        return [];
    }

    function logout(){
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/');
    }
    function goToProfile(){
        if(user.role == 'customer')
            navigate('/customer-profile');
        else if(user.role == 'admin')
            navigate('/admin-profile');
        else if(user.role == 'partner')
            navigate('/partner-profile');
    }

    return(
        <Layout.Header className="header white-bg" >
            <img 
                width="130"
                src="/MyDayMyShow_logo.png"
                onClick={()=>{navigate('/')}}
                className="cursor-pointer"
            />
            {(mode == "page") && (user ? 
                (<Menu 
                    mode="horizontal"
                    theme="light"
                    items={navItems()}
                    defaultSelectedKeys={[defaultSelectionKey]}
                    className="nav-menu white-bg"
                ></Menu>) :
                (<Flex gap="small">
                    <Button onClick={()=>{navigate('/login/user')}}>Login</Button>
                    <Button onClick={()=>{navigate('/register/user')}} type="primary">Get Started</Button>
                </Flex>)
            )}
        </Layout.Header>
    );
}

export default NavBar;