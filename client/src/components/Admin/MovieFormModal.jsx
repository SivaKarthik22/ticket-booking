import { Button, Flex, Modal, Form, Input, InputNumber, Select, Spin } from "antd";
import moment from 'moment';
import { useEffect } from "react";

function MovieFormModal({closeModal, submitMovieForm, form, modalIsOpen, formIsLoading, formType, curMovie}){

    const formRulesObj = {required: true, message: <span style={{fontSize:"12px"}}>Required field</span> };

    if(curMovie)
        curMovie.releaseDate = moment(curMovie.releaseDate).format("YYYY-MM-DD");

    useEffect(() => {
        if(curMovie)
            form.setFieldsValue(curMovie);
        else
            form.resetFields();
    }, [curMovie]);

    return(
        <Modal
            title={formType == "edit" ? "Edit Movie" : "Add New Movie"}
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
                    onFinish={submitMovieForm}
                >
                    <Form.Item label="Movie Name" name="title"
                        rules={[formRulesObj]}
                    ><Input placeholder="Eg. Soodhu Kavvum"/>
                    </Form.Item>
                    <Form.Item label="Movie Description" name="description"
                        rules={[formRulesObj]}
                    ><Input.TextArea rows={3} placeholder="Eg. A casual kidnapper tries hard to survive"/>
                    </Form.Item>
                    <Flex gap="small">
                        <Form.Item label="Duration (in mins)" name="duration"
                            rules={[formRulesObj]}  style={{flex:1}}
                        ><InputNumber className="width-full" placeholder="Eg. 120"/>
                        </Form.Item >
                        <Form.Item label="Movie Language" name="language"
                            rules={[formRulesObj]} style={{flex:1}}
                        >
                            <Select className="width-full" placeholder="Select language">
                                <Select.Option value="Tamil">Tamil</Select.Option>
                                <Select.Option value="Telugu">Telugu</Select.Option>
                                <Select.Option value="Malayalam">Malayalam</Select.Option>
                                <Select.Option value="Kannada">Kannada</Select.Option>
                                <Select.Option value="Hindi">Hindi</Select.Option>
                                <Select.Option value="English">English</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Release Date" name="releaseDate"
                            rules={[formRulesObj]} style={{flex:1}}
                        ><Input type="date" className="width-full"/>
                        </Form.Item>
                    </Flex>
                    <Flex gap="small">
                        <Form.Item label="Movie Genre" name="genre"
                            rules={[formRulesObj]}  style={{flex:0.34}}
                        ><Input placeholder="Eg. Comedy"/>
                        </Form.Item>
                        <Form.Item label="Movie Poster URL" name="poster"
                            rules={[formRulesObj]}  style={{flex:0.7}}
                        ><Input placeholder="Eg. http://google.com/jdbd"/>
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

export default MovieFormModal;