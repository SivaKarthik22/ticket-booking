import AccessDeny from "../AccessDeny";
import { useSelector } from "react-redux";

function PartnerProfile(){
    const {user} = useSelector(store=> store.user);
    
    if(!user || user.role != "partner"){
        return <AccessDeny/> ;
    }

    return(
        <>
            Partner Profile Page
        </>
    );
}

export default PartnerProfile;