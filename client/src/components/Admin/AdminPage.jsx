import { Button, Tabs, Flex, Spin, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AccessDeny from "../AccessDeny";
import MovieTable from "./MovieTable";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../redux/MovieSlice";
import { PlusOutlined } from "@ant-design/icons";
import MovieFormModal from "./MovieFormModal";


function AdminPage(){
    const {user, userLoading} = useSelector(store=> store.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
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

    const tabItems = [
        {
            key: 1,
            label: 'Movies List',
            children: <>
                <MovieFormModal
                    closeModal={closeModal}
                    createMovie={createMovie}
                    form={form}
                    modalIsOpen={modalIsOpen}
                />
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
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default AdminPage;