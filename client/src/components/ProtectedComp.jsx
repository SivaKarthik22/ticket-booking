import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserSlice from "../redux/UserSlice";
import { Layout } from "antd";
import { getUser } from "../redux/UserSlice";
import NavBar from "./NavBar";
import Footer from "./Footer";

function ProtectedComp({children, defaultSelectionKey}){
    const dispatch = useDispatch();
    const setUser = UserSlice.actions.setUser;

    useEffect(()=>{
        if(localStorage.getItem('token'))
            dispatch(getUser());
        else
            dispatch(setUser(null));
    },[]);
    
    return(
        <>
            <Layout className="layout">
                <NavBar mode="page" defaultSelectionKey={defaultSelectionKey} />
                <Layout.Content className="white-bg content">
                    <div className="content-container">
                        {children}
                    </div>
                </Layout.Content>
                <Footer/>
            </Layout>
        </>
    );
}

export default ProtectedComp;