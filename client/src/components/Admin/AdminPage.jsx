import { Button, Tabs, Flex, Spin, Form, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AccessDeny from "../AccessDeny";
import MovieTable from "./MovieTable";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../redux/MovieSlice";
import { PlusOutlined } from "@ant-design/icons";
import MovieFormModal from "./MovieFormModal";
import { deleteMovie, postMovie, putMovie } from "../../services/movieServices";
import DeleteMovieModal from "./DeleteMovieModal";

function AdminPage(){
    const [messageApi, contextHolder] = message.useMessage();
    const {user, userLoading} = useSelector(store=> store.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [formType, setFormType] = useState("create");
    const [curMovie, setCurMovie] = useState(null);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [deleteModalIsLoading, setDeleteModalIsLoading] = useState(false);

    useEffect(()=>{
        dispatch(getAllMovies());
    },[]);

    function closeModal(){
        setModalIsOpen(false);
        setCurMovie(null);
    }
    function openNewForm(){
        setModalIsOpen(true);
        setFormType("create");
    }
    function openEditingForm(movieObj){
        setModalIsOpen(true);
        setCurMovie(movieObj);
        setFormType("edit");
    }
    function openDeleteModal(movieObj){
        setCurMovie(movieObj);
        setDeleteModalIsOpen(true);
    }
    function closeDeleteModal(){
        setDeleteModalIsOpen(false);
        setCurMovie(null);
    }
    async function deleteRecord(){
        setDeleteModalIsLoading(true);
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
        setCurMovie(null);
    }
    async function submitMovieForm(values){
        setFormIsLoading(true);
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
        }
    }

    const tabItems = [
        {
            key: 1,
            label: 'Movies List',
            children: <>
                <MovieFormModal
                    closeModal={closeModal}
                    submitMovieForm={submitMovieForm}
                    form={form}
                    modalIsOpen={modalIsOpen}
                    formIsLoading={formIsLoading}
                    formType={formType}
                    curMovie={curMovie}
                />
                <DeleteMovieModal 
                    closeDeleteModal={closeDeleteModal}
                    deleteModalIsOpen={deleteModalIsOpen}
                    deleteModalIsLoading={deleteModalIsLoading}
                    curMovie={curMovie}
                    deleteRecord={deleteRecord}
                />
                <Flex justify="end" style={{padding:"10px 20px 20px 20px"}}>
                    <Button className="button1" type="primary" icon={<PlusOutlined />} onClick={openNewForm}>
                        Add Movie
                    </Button>
                </Flex>
                <MovieTable openEditingForm={openEditingForm} openDeleteModal={openDeleteModal}/>
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
            {contextHolder}
            <Tabs defaultActiveKey="1" items={tabItems} />
        </>
    );
}

export default AdminPage;