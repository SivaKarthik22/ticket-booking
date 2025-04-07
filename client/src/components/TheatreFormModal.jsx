import { Button, Flex, Modal, Form, Input, InputNumber, Select, Spin } from "antd";
import { useEffect } from "react";

function TheatreFormModal({closeModal, submitTheatreForm, form, modalIsOpen, formIsLoading, formType, curTheatre}){

    const formRulesObj = {required: true, message: <span style={{fontSize:"12px"}}>Required field</span> };

    useEffect(()=>{
        form.resetFields();
    });
    useEffect(() => {
        if(curTheatre)
            form.setFieldsValue(curTheatre);
    }, [curTheatre]);

    return(
        <Modal
            title={formType == "edit" ? "Edit Theatre" : "Add New Theatre"}
            open={modalIsOpen}
            onCancel={closeModal}
            footer=""
            style={{minWidth:"600px"}}
            centered
        >
            <Spin size="large" spinning={formIsLoading}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={submitTheatreForm}
                >
                    <Form.Item label="Theatre Name" name="name"
                        rules={[formRulesObj]}
                    ><Input />
                    </Form.Item>
                    <Form.Item label="Theatre Address" name="address"
                        rules={[formRulesObj]}
                    ><Input.TextArea rows={3} />
                    </Form.Item>
                    <Flex gap="small">
                        <Form.Item label="E-mail" name="email"
                            rules={[formRulesObj]}  style={{flex:1}}
                        ><Input className="width-full"/>
                        </Form.Item >
                        <Form.Item label="Phone Number" name="phone"
                            rules={[formRulesObj]} style={{flex:1}}
                        ><Input type="number" className="width-full"/>
                        </Form.Item>
                    </Flex>
                    <Form.Item label={null}>
                        <Flex vertical gap="small" style={{marginTop: "10px"}}>
                            <Button className="button2" type="primary" htmlType="submit">Submit the Data</Button>
                            <Button onClick={closeModal}>Cancel</Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}

export default TheatreFormModal;