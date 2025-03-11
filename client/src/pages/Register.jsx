import { Form, Input, Button } from "antd";
import '../styles/component-styles.css';
import {Link} from 'react-router-dom';

function Register(){
    return(
        <div className="page-container">
            <Form
                layout="vertical"
                className="form-container"
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
                    <Button className="button1 highlight login-btn" type="primary" htmlType="submit" >
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