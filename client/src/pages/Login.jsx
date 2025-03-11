import { Form, Input, Button } from "antd";
import {Link} from 'react-router-dom';

function Login(){
    return(
        <>
            <Form
                layout="vertical"
                style={{ maxWidth: 300 }}
            >
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {required: true, message: "Please enter your e-mail"}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: "Please enter your password"}
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button className="button highlight login-btn" type="primary" htmlType="submit" style={{width:"100%"}}>
                        login
                    </Button>
                </Form.Item>

                <p className="login-text">
                    New user? <Link to="/register">Register Here</Link>
                </p>
                
            </Form>
        </>
    );
}

export default Login;