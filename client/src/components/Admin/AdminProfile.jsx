import AccessDeny from "../AccessDeny";
import { useSelector } from "react-redux";

function AdminProfile(){
    const {user} = useSelector(store=> store.user);
    
    if(!user || user.role != "admin"){
        return <AccessDeny/> ;
    }

    return(
        <>
            Admin Profile Page
        </>
    );
}

export default AdminProfile;