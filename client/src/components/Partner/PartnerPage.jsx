import { Button, Tabs, Flex, Form, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AccessDeny from "../AccessDeny";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TheatreTable from "./TheatreTable";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { getAllTheatresOfOwner } from "../../redux/TheatreSlice";
import { putTheatre, postTheatre, deleteTheatre } from "../../services/theatreServices";
import LoadingComp from "../LoadingComp";

function PartnerPage(){
    const {user, userLoading} = useSelector(store => store.user);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [formType, setFormType] = useState("create");
    const [curTheatre, setCurTheatre] = useState(null);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [deleteModalIsLoading, setDeleteModalIsLoading] = useState(false);

    useEffect(()=>{
        if(user){
            dispatch( getAllTheatresOfOwner(user._id) );
        } 
    },[user]);

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
        setDeleteModalIsLoading(true);
        const responseData = await deleteTheatre(curTheatre);
        setDeleteModalIsLoading(false);
        
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            dispatch(getAllTheatresOfOwner(user._id));
        }
        else{
            messageApi.open({
                type: 'warning',
                content: `${responseData.message}. Please try again`,
            });
        }
        setDeleteModalIsOpen(false);
        setCurTheatre(null);
    }
    async function submitTheatreForm(values){
        setFormIsLoading(true);
        let responseData;
        if(formType == "edit")
            responseData = await putTheatre({...values, _id : curTheatre._id});
        else
            responseData = await postTheatre({...values, owner: user._id});
        setFormIsLoading(false);
        
        if(responseData.success){
            setModalIsOpen(false);
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            setCurTheatre(null);
            dispatch(getAllTheatresOfOwner(user._id));
        }
        else{
            messageApi.open({
                type: 'warning',
                content: `${responseData.message}. Please try again`,
            });
        }
    }

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
                <TheatreTable openEditingForm={openEditingForm} openDeleteModal={openDeleteModal} />
            </>,
        },
    ];

    if(userLoading){
        return <LoadingComp/>;
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