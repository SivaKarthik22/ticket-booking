import { Tabs, message } from "antd";
import { useSelector } from "react-redux";
import AccessDeny from "../AccessDeny";
import LoadingComp from "../LoadingComp";
import { lazy, Suspense } from "react";

//import ShowsComp from "./ShowsComp";
//import TheatreTable from "../TheatreTable";

const ShowsComp = lazy(()=> import("./ShowsComp"));
const TheatreTable = lazy(()=> import("../TheatreTable"));

function PartnerPage(){
    const {user, userLoading} = useSelector(store => store.user);
    const [messageApi, contextHolder] = message.useMessage();

    const tabItems = [
        {
            key: 1,
            label: 'My Theatres',
            children: 
                <Suspense fallback={<LoadingComp/>}>
                    <TheatreTable messageApi={messageApi} />
                </Suspense>,
        },
        {
            key: 2,
            label: 'My Shows',
            children: 
                <Suspense fallback={<LoadingComp/>}>
                    <ShowsComp messageApi={messageApi}/>
                </Suspense>,
        },
    ];

    if(userLoading){
        return <LoadingComp/>;
    }
    if(!user || user.role != "partner"){
        return <AccessDeny/> ;
    }
    return(
        <>
            {contextHolder}
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default PartnerPage;