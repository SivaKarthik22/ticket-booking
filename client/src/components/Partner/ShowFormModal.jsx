import { Button, Flex, Modal, Form, Input, InputNumber, Select, Spin } from "antd";
import moment from 'moment';
import { useEffect } from "react";

function ShowFormModal({closeModal, submitShowForm, form, modalIsOpen, formIsLoading, formType, curShow, theatreName}){

    const formRulesObj = {required: true, message: <span style={{fontSize:"12px"}}>Required field</span> };

    if(curShow)
        curShow.date = moment(curShow.date).format("YYYY-MM-DD");

    useEffect(() => {
        if(curShow)
            form.setFieldsValue(curShow);
        else
            form.resetFields();
    }, [curShow]);

    return(
        <Modal
            title={`${theatreName} - ${formType == "edit" ? "Edit Show" : "Add New Show"}`}
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
                    onFinish={submitShowForm}
                >
                    <Flex gap="small">
                        <Form.Item label="Show Name" name="name"
                            rules={[formRulesObj]} style={{flex:1}}
                        ><Input className="width-full"/>
                        </Form.Item>
                        <Form.Item label="Show Date" name="date"
                            rules={[formRulesObj]} style={{flex:1}}
                        ><Input type="date" className="width-full"/>
                        </Form.Item>
                        <Form.Item label="Show Timimg" name="time"
                            rules={[formRulesObj]} style={{flex:1}}
                        ><Input type="date" className="width-full"/>
                        </Form.Item>
                    </Flex>
                    <Flex gap="small">
                        <Form.Item label="Select Movie" name="movie"
                            rules={[formRulesObj]} style={{flex:1}}
                        >
                            {/*<Select className="width-full">
                                <Select.Option value="Tamil">Tamil</Select.Option>
                                <Select.Option value="Telugu">Telugu</Select.Option>
                                <Select.Option value="Malayalam">Malayalam</Select.Option>
                                <Select.Option value="Kannada">Kannada</Select.Option>
                                <Select.Option value="Hindi">Hindi</Select.Option>
                                <Select.Option value="English">English</Select.Option>
                            </Select>*/}
                        </Form.Item>
                        <Form.Item label="Ticket price (in Rs.)" name="ticketPrice"
                            rules={[formRulesObj]}  style={{flex:1}}
                        ><InputNumber className="width-full"/>
                        </Form.Item >
                        <Form.Item label="Total Seats" name="totalSeats"
                            rules={[formRulesObj]}  style={{flex:1}}
                        ><InputNumber className="width-full"/>
                        </Form.Item >
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

export default ShowFormModal;