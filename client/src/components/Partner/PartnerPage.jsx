import { Button, Tabs, Flex, Spin, Form, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AccessDeny from "../AccessDeny";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TheatreTable from "./TheatreTable";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";

function PartnerPage(){
    const [messageApi, contextHolder] = message.useMessage();
    const {user, userLoading} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [formType, setFormType] = useState("create");
    const [curTheatre, setCurTheatre] = useState(null);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [deleteModalIsLoading, setDeleteModalIsLoading] = useState(false);

    function closeModal(){
        setModalIsOpen(false);
        setCurTheatre(null);
    }
    function openNewForm(){
        setModalIsOpen(true);
        setFormType("create");
    }
    function openEditingForm(theatreObj){
        setModalIsOpen(true);
        setCurTheatre(theatreObj);
        setFormType("edit");
    }
    function openDeleteModal(theatreObj){
        setCurTheatre(theatreObj);
        setDeleteModalIsOpen(true);
    }
    function closeDeleteModal(){
        setDeleteModalIsOpen(false);
        setCurTheatre(null);
    }
    async function deleteRecord(){
        /*setDeleteModalIsLoading(true);
        const responseData = await deleteMovie(curMovie);
        setDeleteModalIsLoading(false);
        
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            dispatch(getAllMovies());
        }
        else{
            messageApi.open({
                type: 'warning',
                content: `${responseData.message}. Please try again`,
            });
        }
        setDeleteModalIsOpen(false);
        setCurMovie(null);*/
    }
    async function submitTheatreForm(values){
        /*setFormIsLoading(true);
        let responseData;
        if(formType == "edit")
            responseData = await putMovie({...values, _id : curMovie._id});
        else
            responseData = await postMovie(values);
        setFormIsLoading(false);
        
        if(responseData.success){
            setModalIsOpen(false);
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            setCurMovie(null);
            dispatch(getAllMovies());
        }
        else{
            messageApi.open({
                type: 'warning',
                content: `${responseData.message}. Please try again`,
            });
        }*/
    }

    /*useEffect(()=>{
        dispatch(getAllMovies());
    },[]);*/

    const tabItems = [
        {
            key: 1,
            label: 'My Theatres List',
            children: <>
                <TheatreFormModal 
                    closeModal={closeModal}
                    submitTheatreForm={submitTheatreForm}
                    form={form}
                    modalIsOpen={modalIsOpen}
                    formIsLoading={formIsLoading}
                    formType={formType}
                    curTheatre={curTheatre}
                />
                <DeleteTheatreModal 
                    closeDeleteModal={closeDeleteModal}
                    deleteModalIsOpen={deleteModalIsOpen}
                    deleteModalIsLoading={deleteModalIsLoading}
                    curTheatre={curTheatre}
                    deleteRecord={deleteRecord}
                />
                <Flex justify="end" style={{padding:"10px 20px 20px 20px"}}>
                    <Button className="button1" type="primary" icon={<PlusOutlined />} onClick={openNewForm} >
                        Add Theatre
                    </Button>
                </Flex>
                <TheatreTable/>
            </>,
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
    if(!user || user.role != "partner"){
        return <AccessDeny/> ;
    }
    return(
        <>
            {contextHolder}
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default PartnerPage;