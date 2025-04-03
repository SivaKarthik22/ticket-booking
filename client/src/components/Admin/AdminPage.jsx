import { Button, Tabs, Flex, Spin, Form, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AccessDeny from "../AccessDeny";
import MovieTable from "./MovieTable";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../redux/MovieSlice";
import { PlusOutlined } from "@ant-design/icons";
import MovieFormModal from "./MovieFormModal";
import { postMovie, putMovie } from "../../services/movieServices";


function AdminPage(){
    const [messageApi, contextHolder] = message.useMessage();
    const {user, userLoading} = useSelector(store=> store.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [formType, setFormType] = useState("create");
    const [curMovie, setCurMovie] = useState(null);

    useEffect(()=>{
        dispatch(getAllMovies());
    },[]);

    function closeModal(){
        setCurMovie(null);
        setModalIsOpen(false);
        form.resetFields();
        setFormType("create");
    }
    function openNewForm(){
        setCurMovie(null);
        setFormType("create");
        setModalIsOpen(true);
    }
    function openEditingForm(movieObj){
        setCurMovie(movieObj);
        setFormType("edit");
        setModalIsOpen(true);
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
            form.resetFields();
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            setCurMovie(null);
            setFormType("create");
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
                <Flex justify="end" style={{padding:"10px 20px 20px 20px"}}>
                    <Button className="button1" type="primary" icon={<PlusOutlined />} onClick={openNewForm}>
                        Add Movie
                    </Button>
                </Flex>
                <MovieTable openEditingForm={openEditingForm} />
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