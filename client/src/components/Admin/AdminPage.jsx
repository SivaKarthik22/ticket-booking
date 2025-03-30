import { Button, Tabs, Flex, Modal, Spin, Form, Input, InputNumber, Select, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AccessDeny from "../AccessDeny";
import MovieTable from "./MovieTable";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../redux/MovieSlice";
import { PlusOutlined } from "@ant-design/icons";


function AdminPage(){
    const {user, userLoading} = useSelector(store=> store.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsLoading, setModalIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(()=>{
        dispatch(getAllMovies());
    },[]);

    function closeModal(){
        setModalIsOpen(false);
        form.resetFields();
    }
    function openModal(){
        setModalIsOpen(true);
    }
    function createMovie(values){
        setModalIsOpen(false);
        form.resetFields();
    }

    const formRulesObj = {required: true, message: <span style={{fontSize:"12px"}}>Required field</span> };

    const tabItems = [
        {
            key: 1,
            label: 'Movies List',
            children: <>
                <Flex justify="end" style={{padding:"10px 20px 20px 20px"}}>
                    <Button className="button1" type="primary" onClick={openModal}>
                    <PlusOutlined style={{fontSize:"16px"}}/> Add Movie
                    </Button>
                </Flex>
                <MovieTable/>
            </>,
        },
        {
            key: 2,
            label: 'Theatres List',
            children: 'Content 2',
        },
    ];

    if(userLoading){
        return (
            <Flex vertical gap="middle" justify="center" align="center">
                <Spin size="large" spinning={true}></Spin>
                <p style={{fontSize:"16px"}}>Page is Loading</p>
            </Flex>
        );
    }
    if(!user || user.role != "admin"){
        return <AccessDeny/> ;
    }
    return(
        <>
            <Modal
                title="Add New Movie"
                open={modalIsOpen}
                onCancel={closeModal}
                confirmLoading={modalIsLoading}
                footer=""
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={createMovie}
                >
                    <Form.Item label="Movie Name" name="title"
                        rules={[formRulesObj]}
                    ><Input placeholder="Eg. Soodhu Kavvum"/>
                    </Form.Item>
                    <Form.Item label="Movie Description" name="description"
                        rules={[formRulesObj]}
                    ><Input.TextArea rows={3} placeholder="Eg. A casual kidnapper tries hard to survive"/>
                    </Form.Item>
                    <Flex gap="middle">
                        <Form.Item label="Duration (in mins)" name="duration"
                            rules={[formRulesObj]}  style={{flex:1}}
                        ><InputNumber className="width-full" placeholder="Eg. 120"/>
                        </Form.Item >
                        <Form.Item label="Movie Language" name="language"
                            rules={[formRulesObj]} style={{flex:1}}
                        >
                            <Select className="width-full" placeholder="Select language">
                                <Select.Option value="tamil">Tamil</Select.Option>
                                <Select.Option value="telugu">Telugu</Select.Option>
                                <Select.Option value="malayalam">Malayalam</Select.Option>
                                <Select.Option value="kannada">Kannada</Select.Option>
                                <Select.Option value="hindi">Hindi</Select.Option>
                                <Select.Option value="english">English</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Release Date" name="releaseDate"
                            rules={[formRulesObj]} style={{flex:1}}
                        ><DatePicker className="width-full"/>
                        </Form.Item>
                    </Flex>
                    <Flex gap="middle">
                        <Form.Item label="Movie Genre" name="genre"
                            rules={[formRulesObj]}  style={{flex:0.33}}
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
            </Modal>
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default AdminPage;