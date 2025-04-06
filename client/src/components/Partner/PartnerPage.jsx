import { Tabs, message } from "antd";
import { useSelector } from "react-redux";
import AccessDeny from "../AccessDeny";
import TheatreTable from "../TheatreTable";
import LoadingComp from "../LoadingComp";
import ShowsComp from "./ShowsComp";

function PartnerPage(){
    const {user, userLoading} = useSelector(store => store.user);
    const [messageApi, contextHolder] = message.useMessage();

    const tabItems = [
        {
            key: 1,
            label: 'My Theatres',
            children: <TheatreTable messageApi={messageApi} />,
        },
        {
            key: 2,
            label: 'My Shows',
            children: <ShowsComp messageApi={messageApi}/>,
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