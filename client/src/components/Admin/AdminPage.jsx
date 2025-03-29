import { Tabs } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AdminPage(){
    const {user} = useSelector(store=> store.user);
    const navigate = useNavigate();

    const tabItems = [
        {
            key: 1,
            label: 'Movies',
            children: 'Content 1',
        },
        {
            key: 2,
            label: 'Theatres',
            children: 'Content 2',
        },
        {
            key: 3,
            label: 'Third Tab',
            children: 'Content 3',
        },
    ];

    useEffect(()=>{
        if(!user)
            navigate('/');
    },[user]);

    return(
        <>
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default AdminPage;