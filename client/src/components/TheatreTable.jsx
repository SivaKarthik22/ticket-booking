import { Button, Flex, Table, Spin, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import ErrorComp from "./ErrorComp";
import { getAllTheatresOfOwner, getAllTheatres } from "../redux/TheatreSlice";
import { useEffect, useState } from "react";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { putTheatre, postTheatre, deleteTheatre, toggleTheatreApproval } from "../services/theatreServices";
import TheatreSlice from "../redux/TheatreSlice";

function TheatreTable({messageApi}){
    const {theatres, theatresAreLoading, theatresErrorMsg} = useSelector(store => store.theatres);
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [formType, setFormType] = useState("create");
    const [curTheatre, setCurTheatre] = useState(null);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [deleteModalIsLoading, setDeleteModalIsLoading] = useState(false);
    const setTheatres = TheatreSlice.actions.setTheatres;

    useEffect(()=>{
        if(user){
            if(user.role == "partner")
                dispatch( getAllTheatresOfOwner(user._id) );
            else if(user.role =="admin")
                dispatch(getAllTheatres());
        }
    },[user]);
    useEffect(()=>{
        return ()=>{
            dispatch( setTheatres([]) );
        }
    }, []);

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
        if(!values.email.includes('@')){
            messageApi.open({
                type: 'warning',
                content: "Enter a valid e-mail",
            });
            return;
        }
        if(values.phone.toString().length != 10){
            messageApi.open({
                type: 'warning',
                content: "Enter a valid phone number",
            });
            return;
        }
        
        setFormIsLoading(true);
        let responseData;
        if(formType == "edit"){
            values.isActive = false;
            responseData = await putTheatre({...values, _id : curTheatre._id});
        }
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
    async function approveOrBlockTheatre(theatreObj){
        const responseData = await toggleTheatreApproval(theatreObj);
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            dispatch(getAllTheatres());
        }
        else{
            messageApi.open({
                type: 'warning',
                content: `${responseData.message}. Please try again`,
            });
        }
    }

    const ownerColumn = {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
        render: owner => owner.name,
    };
    const columns = [
        {
            title: "Theatre name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: "24%",
        },
        {
            title: "Phone No.",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            render: value => (value ? <span className="red bold">Approved</span> : "Pending"),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record)=> {
                return (<>
                    {user.role == "partner" && (
                        <Flex gap="small">
                            <Button className="icon-button" onClick={()=>{ openEditingForm(record) }}>
                                <EditTwoTone className="form-button-icon" twoToneColor="#f8447a"/>
                            </Button>
                            <Button className="icon-button" onClick={()=>{ openDeleteModal(record) }}>
                                <DeleteTwoTone className="form-button-icon" twoToneColor="#f8447a"/>
                            </Button>
                            {record.isActive && 
                                <Button className="icon-button red bold" icon={<PlusOutlined/>} >
                                    Add Shows
                                </Button>
                            }
                        </Flex>
                    )}
                    {user.role == "admin" && <>
                        {record.isActive ? 
                        <Button
                            className="button2"
                            onClick={async ()=>{approveOrBlockTheatre(record)}}
                        >Block</Button> :
                        <Button
                            className="button2"
                            type="primary"
                            onClick={async ()=>{approveOrBlockTheatre(record)}}
                        >Approve</Button>}
                    </>}
                </>);
            },
        },
    ];
    const rows = theatres.map((theatre) => { 
        return {...theatre, key: `theatre_${theatre._id}`};
    });

    /*if(theatresAreLoading){
        return <Flex justify="center"><Spin size="large" spinning={theatresAreLoading}></Spin></Flex>; 
    }*/
    if(theatresErrorMsg){
        return <ErrorComp/>
    }
    return(
        <>
            {user.role == "partner" && (<>
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
                <Flex justify="end" style={{padding:"3px 20px 20px 20px"}}>
                    <Button className="button1" type="primary" icon={<PlusOutlined />} onClick={openNewForm} >
                        Add Theatre
                    </Button>
                </Flex>
            </>)}

            <Table
                columns={user.role == "admin" ? [ownerColumn, ...columns] : columns}
                dataSource={rows}
                pagination={{pageSize: 5}}
            ></Table>
        </>
    );
}

export default TheatreTable;