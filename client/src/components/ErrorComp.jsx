import { MehOutlined } from "@ant-design/icons";
import { Flex } from "antd";

function ErrorComp({type}){
    return(
        <Flex justify="center" gap="small" align="center">
            <MehOutlined style={{fontSize:"20px", color:"#f8447a"}} />
            <p style={{fontSize:"18px"}}>Error Loading {type ? type : "data"}. Please try again</p>
        </Flex>
    );
}

export default ErrorComp;