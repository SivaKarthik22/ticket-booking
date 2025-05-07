import { Form, Input, Button, message, Layout, Spin } from "antd";
import { useNavigate, Link } from 'react-router-dom';
import { generateOTP} from "../services/userServices";
import { useState, useEffect } from "react";
import { getUser } from "../redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";

function ForgotPassword(){
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const {user} = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.getItem('token'))
            dispatch(getUser());
    },[]);
    useEffect(()=>{
        if(user)
            navigate('/');
    },[user]);

    async function submitForm(values){
        setProcessing(true);
        const responseData = await generateOTP(values);
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            navigate("/reset-password");
        }
        else{
            setProcessing(false);
            messageApi.open({
                type: 'error',
                content: responseData.message,
            });
        }
    }

    return(
        <Layout>
            {contextHolder}
            {/* <Spin
                spinning={processing}
                size="large"
                fullscreen
            /> */}
            <NavBar mode="login" />
            <Layout.Content className="white-bg content">
                <div className="page-container">
                    <Form
                        form={form}
                        onFinish={submitForm}
                        layout="vertical"
                        className="form-container grey-bg"
                    >
                        <h2 className="form-heading">Forgot Password</h2>

                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[
                                {required: true, message: "Please enter your e-mail"}
                            ]}
                        >
                            <Input className="form-input"/>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button
                                className="button1 login-btn"
                                type="primary"
                                htmlType="submit"
                                disabled={processing}
                            >
                                Send OTP
                            </Button>
                        </Form.Item>

                        <p className="login-text">
                            <Link to={`/login/user`}>{"<- "}Go Back</Link>
                        </p>
                    </Form>
                </div>
            </Layout.Content>
        </Layout>
    );
}

export default ForgotPassword;