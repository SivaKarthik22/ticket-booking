import { Form, Input, Button, message, Layout, Spin } from "antd";
import { useNavigate, Link } from 'react-router-dom';
import { generateOTP} from "../services/userServices";
import { useState, useEffect } from "react";
import { getUser } from "../redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";

function ForgotPassword(){
    const [messageApi, contextHolder] = message.useMessage();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const {user} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [stage, setStage] = useState(1);
    const [otpTimer, setOtpTimer] = useState(true);

    useEffect(()=>{
        if(user)
            navigate('/');
        else if(localStorage.getItem('token'))
            dispatch(getUser());
    },[user]);

    async function submitForm1(values){
        setProcessing(true);
        const responseData = await generateOTP(values);
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            setStage(2);
            setOtpTimer(true);
            setTimeout(()=>{setOtpTimer(false)}, 60000);
        }
        else{
            messageApi.open({
                type: 'error',
                content: responseData.message,
            });
        }
        setProcessing(false);
    }

    async function submitForm2(values){
        setProcessing(true);
        setOtpTimer(true);
        
    }

    async function resendOTP(){
        setOtpTimer(true);
        setTimeout(()=>{setOtpTimer(false)},60000);
    }
    
    async function submitForm3(values){}

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
                    {stage==1 && <Form1 form={form1} submitForm={submitForm1} processing={processing}/>}
                    {stage==2 && <Form2 form={form2} submitForm={submitForm2} processing={processing} otpTimer={otpTimer} resendOTP={resendOTP}/>}
                    {stage==3 && <Form3 form={form3} submitForm={submitForm3} processing={processing}/>}
                </div>
            </Layout.Content>
        </Layout>
    );
}

export default ForgotPassword;


function Form1({form, submitForm, processing}){
    return(
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
    );
}

function Form2({form, submitForm, processing, otpTimer, resendOTP}){
    return(
        <Form
            form={form}
            onFinish={submitForm}
            layout="vertical"
            className="form-container grey-bg"
        >
            <h2 className="form-heading">OTP Verification</h2>

            <Form.Item
                label="Enter the OTP that you received in mail"
                name="otp"
                rules={[
                    {required: true, message: "Please enter OTP"}
                ]}
            >
                <Input type="number" className="form-input"/>
            </Form.Item>

            <Form.Item label={null}>
                <Button
                    className="button1 login-btn"
                    type="primary"
                    htmlType="submit"
                    disabled={processing}
                >
                    Verify OTP
                </Button>
            </Form.Item>

            <div className="login-text">
                Didn't receive OTP?{" "}
                <Button
                    type="link"
                    style={{padding:0}}
                    disabled={otpTimer}
                    onClick={resendOTP}
                >
                    Resend OTP
                </Button>
            </div>
        </Form>
    );
}

function Form3({form, submitForm, processing}){
    return(
        <Form
            form={form}
            onFinish={submitForm}
            layout="vertical"
            className="form-container grey-bg"
        >
            <h2 className="form-heading">Reset Password</h2>

            <Form.Item
                label="Enter new password"
                name="password"
                rules={[
                    {required: true, message: "Please enter new password"}
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
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
    );
}