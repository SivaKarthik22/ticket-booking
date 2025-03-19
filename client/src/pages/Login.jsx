import { Form, Input, Button, message, Spin } from "antd";
import '../styles/component-styles.css';
import {Link} from 'react-router-dom';
import { loginUser } from "../user service/users";

function Login(){
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    async function login(values){
        const responseData = await loginUser(values);
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            form.resetFields();
        }
        else{
            messageApi.open({
                type: 'warning',
                content: responseData.message,
            });
            form.resetFields();
        }
    }

    return(
        <div className="page-container">
            
            {contextHolder}

            <Form
                form={form}
                onFinish={login}
                layout="vertical"
                className="form-container"
            >
                <h2 className="form-heading">
                    User Login
                </h2>

                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {required: true, message: "Please enter your e-mail"}
                    ]}
                >
                    <Input className="form-input"/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: "Please enter your password"}
                    ]}
                >
                    <Input.Password className="form-input"/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button className="button1 highlight login-btn" type="primary" htmlType="submit" >
                        Login
                    </Button>
                </Form.Item>

                <p className="login-text">
                    New user? <Link to="/register">Register Here</Link>
                </p>

            </Form>
        </div>
    );
}

export default Login;