import { Button, Tabs, Flex, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AccessDeny from "../AccessDeny";
import MovieTable from "./MovieTable";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../redux/MovieSlice";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";


function AdminPage(){
    const {user, userLoading} = useSelector(store=> store.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsLoading, setModalIsLoading] = useState(false);

    useEffect(()=>{
        dispatch(getAllMovies());
    },[]);

    function closeModal(){
        setModalIsOpen(false);
    }
    function openModal(){
        setModalIsOpen(true);
    }

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
            <Flex gap="middle" justify="center" align="center" style={{fontSize:"18px"}}>
                <LoadingOutlined /> Page Loading
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
                onOk={closeModal}
                onClose={closeModal}
                onCancel={closeModal}
                confirmLoading={modalIsLoading}
            >
                <p>Vanakam di mapla!</p>
            </Modal>
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default AdminPage;