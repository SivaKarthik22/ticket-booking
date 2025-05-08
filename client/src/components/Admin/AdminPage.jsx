import { Tabs, message } from "antd";
import { useSelector } from "react-redux";
import { lazy, Suspense} from 'react';
import AccessDeny from "../AccessDeny";
import LoadingComp from "../LoadingComp";

//import TheatreTable from "../TheatreTable";
//import MovieTable from "./MovieTable";

const MovieTable = lazy(()=> import("./MovieTable"));
const TheatreTable = lazy(()=> import("../TheatreTable"));

function AdminPage(){
    const {user, userLoading} = useSelector(store=> store.user);
    const [messageApi, contextHolder] = message.useMessage();

    const tabItems = [
        {
            key: 1,
            label: 'Movies List',
            children: 
                <Suspense fallback={<LoadingComp/>}>
                    <MovieTable messageApi={messageApi} />    
                </Suspense>,
        },
        {
            key: 2,
            label: 'Theatres List',
            children:
                <Suspense fallback={<LoadingComp/>}>
                    <TheatreTable messageApi={messageApi} />
                </Suspense>,
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