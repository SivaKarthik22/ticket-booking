import { Button, Tabs } from "antd";
import { useSelector } from "react-redux";
import AccessDeny from "../AccessDeny";


function AdminPage(){
    const {user} = useSelector(store=> store.user);

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

    if(!user || user.role != "admin"){
        return <AccessDeny/> ;
    }

    return(
        <>
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default AdminPage;