import { MehOutlined } from "@ant-design/icons";
import { Flex } from "antd";

function ErrorComp({type}){
    return(
        <Flex justify="center" gap="middle">
            <MehOutlined />
            <p>Error Loading {type ? type : "data"}</p>
        </Flex>
    );
}

export default ErrorComp;