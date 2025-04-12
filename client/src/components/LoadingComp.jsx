import {  } from "@ant-design/icons";
import { Flex, Spin } from "antd";

function LoadingComp({context}){
    return(
        <Flex vertical gap="middle" justify="center" align="center">
            <Spin size="large" spinning={true}></Spin>
            <p style={{fontSize:"16px"}}>{context ? context : "Page"} is Loading</p>
        </Flex>
    );
}

export default LoadingComp;