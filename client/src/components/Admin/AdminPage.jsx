import { Tabs, message } from "antd";
import { useSelector } from "react-redux";
import AccessDeny from "../AccessDeny";
import MovieTable from "./MovieTable";
import LoadingComp from "../LoadingComp";
import TheatreTable from "../Partner/TheatreTable";

function AdminPage(){
    const {user, userLoading} = useSelector(store=> store.user);
    const [messageApi, contextHolder] = message.useMessage();

    const tabItems = [
        {
            key: 1,
            label: 'Movies List',
            children: <MovieTable messageApi={messageApi} />,
        },
        {
            key: 2,
            label: 'Theatres List',
            children: <TheatreTable messageApi={messageApi} />,
        },
    ];

    if(userLoading){
        return <LoadingComp/>;
    }
    if(!user || user.role != "admin"){
        return <AccessDeny/> ;
    }
    return(
        <>
            {contextHolder}
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default AdminPage;