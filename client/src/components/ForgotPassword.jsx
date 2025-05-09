import { Form, Flex, Input, Button, message, Layout} from "antd";
import { useNavigate, Link } from 'react-router-dom';
import { generateOTP, resetPassword} from "../services/userServices";
import { useState, useEffect } from "react";
import { getUser } from "../redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { CheckCircleTwoTone } from "@ant-design/icons";

function ForgotPassword(){
    const [messageApi, contextHolder] = message.useMessage();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const {user} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [stage, setStage] = useState(1);
    const [otpTimer, setOtpTimer] = useState(true);
    const [email, setEmail] = useState(null);

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
            setEmail(values.email);
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
        const responseData = await resetPassword({...values, email});
        if(responseData.success){
            setStage(3);
            setTimeout(()=>{navigate('/')}, 1000);
        }
        else{
            messageApi.open({
                type: 'error',
                content: responseData.message,
            });
            setProcessing(false);
            setOtpTimer(false);
        }
        
    }

    async function resendOTP(){
        setOtpTimer(true);
        const responseData = await generateOTP({email});
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            setTimeout(()=>{setOtpTimer(false)}, 60000);
        }
        else{
            messageApi.open({
                type: 'error',
                content: responseData.message,
            });
            setOtpTimer(false);
        }
    }

    function checkEmail(){
        if(!email)
            setStage(1);
    }

    return(
        <Layout>
            {contextHolder}
            <NavBar mode="login" />
            <Layout.Content className="white-bg content">
                <div className="page-container">
                    {stage==1 && <Form1 form={form1} submitForm={submitForm1} processing={processing}/>}
                    {stage==2 && <Form2 form={form2} submitForm={submitForm2} processing={processing} otpTimer={otpTimer} resendOTP={resendOTP} checkEmail={checkEmail}/>}
                    {stage==3 && <Confirmation/>}
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
                label="Enter E-mail"
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

function Form2({form, submitForm, processing, otpTimer, resendOTP, checkEmail}){
    useEffect(checkEmail, []);

    return(
        <Form
            form={form}
            onFinish={submitForm}
            layout="vertical"
            className="form-container grey-bg"
        >
            <h2 className="form-heading">Reset Password</h2>

            <Form.Item
                label="Enter OTP received in mail"
                name="otp"
                rules={[
                    {required: true, message: "Please enter OTP"}
                ]}
            >
                <Input type="number" className="form-input"/>
            </Form.Item>

            <Form.Item
                label="Enter new password"
                name="newPassword"
                rules={[
                    {required: true, message: "Please enter new password"}
                ]}
            >
                <Input.Password className="form-input"/>
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

function Confirmation(){
    return(
        <Flex vertical gap="middle" align="center" justify="center" style={{height:"50vh"}}>
            <CheckCircleTwoTone twoToneColor="#f8447a" style={{fontSize:"60px"}}/>
            <p className="bold red" style={{fontSize:"20px"}}>Password Reset Successfully</p>
        </Flex>
    );
}