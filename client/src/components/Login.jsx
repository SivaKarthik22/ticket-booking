import { Form, Input, Button, message, Spin, Layout } from "antd";
import '../styles/component-styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loginUser } from "../services/userServices";
import { useState, useEffect } from "react";
import { getUser } from "../redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";

function Login(){
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [spinning, setSpinning] = useState(false);
    const {user} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const {role} = useParams();

    useEffect(()=>{
        if(!["user","partner","admin"].includes(role)){
            navigate('/');
            return;
        }
        if(localStorage.getItem('token'))
            dispatch(getUser());
    },[]);
    useEffect(()=>{
        if(user)
            navigate('/');
    },[user]);

    async function login(values){
        let roleName = (role == "user") ? "customer" : role;
        const credentials = {...values, role: roleName};
        const responseData = await loginUser(credentials);
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            localStorage.setItem("token", responseData.token)
            form.resetFields();
            setSpinning(true);
            setTimeout(()=>{
                setSpinning(false);
                navigate("/");
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
        <Layout>
            {contextHolder}
            <Spin
                spinning={spinning}
                size="large"
                fullscreen
            />
            <NavBar mode="login" />
            <Layout.Content className="white-bg content">
                <div className="page-container">
                    <Form
                        form={form}
                        onFinish={login}
                        layout="vertical"
                        className="form-container grey-bg"
                    >
                        <h2 className="form-heading">
                            {role.charAt(0).toUpperCase() + role.slice(1)} Login
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
                            <Button className="button1 login-btn" type="primary" htmlType="submit" >
                                Login
                            </Button>
                        </Form.Item>

                        <p className="login-text">
                            New {role}? <Link to={`/register/${role}`}>Register Here</Link>
                        </p>
                    </Form>
                </div>
            </Layout.Content>
        </Layout>
    );
}

export default Login;