import AccessDeny from "../AccessDeny";
import { useSelector } from "react-redux";

function CustomerProfile(){
    const {user} = useSelector(store=> store.user);
    
    if(!user || user.role != "customer"){
        return <AccessDeny/> ;
    }

    return(
        <>
            Customer Profile Page
        </>
    );
}

export default CustomerProfile;