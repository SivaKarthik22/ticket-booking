import { Form, Input, Button, message, Spin } from "antd";
import '../styles/component-styles.css';
import {Link, useNavigate} from 'react-router-dom';
import { registerUser } from "../user service/users";
import { useState, useEffect} from "react";
import { authorizeUser } from "../user service/users";

function Register(){
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [spinning, setSpinning] = useState(false);

    useEffect(()=>{
        async function validateToken(){
            const responseData = await authorizeUser();
            if(responseData.success){
                navigate('/');
            }
        }
        if(localStorage.getItem('token'))
            validateToken();
    },[]);

    async function registerData(values){
        const responseData = await registerUser(values);
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            form.resetFields();
            setSpinning(true);
            setTimeout(()=>{
                setSpinning(false);
                navigate("/login");
            },1000);
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

            <Spin
                spinning={spinning}
                size="large"
                fullscreen
            />
            
            <Form
                form={form}
                layout="vertical"
                className="form-container white-bg"
                onFinish={registerData}
            >
                <h2 className="form-heading">
                    Register User
                </h2>
                
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {required: true, message: "Please enter your name"}
                    ]}
                >
                    <Input className="form-input"/>
                </Form.Item>

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
                    <Button className="button1 login-btn" type="primary" htmlType="submit" >
                        Register
                    </Button>
                </Form.Item>

                <p className="login-text">
                    Already a user? <Link to="/login">Login Here</Link>
                </p>

            </Form>
        </div>
    );
}

export default Register;