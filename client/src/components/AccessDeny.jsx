import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { WarningFilled } from "@ant-design/icons";

function AccessDeny(){
    const navigate = useNavigate();

    return(
        <div style={{width:"100%", textAlign:"center"}}>
            <WarningFilled style={{fontSize:"40px", color:"gray"}}/>
            <p style={{margin:"15px 0", fontSize:"16px"}}>Sorry, you do not have access to this page!</p>
            <Button type="primary" onClick={()=>{navigate('/')}}>Go to Home</Button>
        </div>
    );
}

export default AccessDeny;