import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MehOutlined } from "@ant-design/icons";

function PageNotFound(){
    const navigate = useNavigate();

    return(
        <div style={{width:"100%", textAlign:"center"}}>
            <MehOutlined style={{fontSize:"20px", color:"#f8447a"}} />
            <p style={{margin:"15px 0", fontSize:"16px"}}>Sorry, The page you are looking for doesn't exist</p>
            <Button type="primary" onClick={()=>{navigate('/')}}>Go to Home</Button>
        </div>
    );
}

export default PageNotFound;