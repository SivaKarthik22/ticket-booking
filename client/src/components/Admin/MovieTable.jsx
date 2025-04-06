import { Button, Flex, Table, Spin, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../redux/MovieSlice";
import moment from 'moment';
import ErrorComp from "../ErrorComp";
import MovieFormModal from "./MovieFormModal";
import { deleteMovie, postMovie, putMovie } from "../../services/movieServices";
import DeleteMovieModal from "./DeleteMovieModal";

function MovieTable({messageApi}){
    const {movies, isLoading, errorMsg} = useSelector(store => store.movies);
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


    const columns = [
        {
            title: "Poster",
            dataIndex: "poster",
            key: "poster",
            render: text => <img src={text} width="60px"/>,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Language",
            dataIndex: "language",
            key: "language",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            key: "releaseDate",
            render: text => moment(text).format("DD-MMM-YYYY"),
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
            render: text => `${text} Mins`,
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key: "genre",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record)=> (
                <Flex gap="small">
                    <Button className="icon-button" onClick={()=>{ openEditingForm(record) }}>
                        <EditTwoTone className="form-button-icon" twoToneColor="#f8447a"/>
                    </Button>
                    <Button className="icon-button" onClick={()=>{ openDeleteModal(record) }}>
                        <DeleteTwoTone className="form-button-icon" twoToneColor="#f8447a"/>
                    </Button>
                </Flex>
            ),
        }
    ];
    const rows = movies.map((movie) => { 
        return {...movie, key: `movie_${movie._id}`};
    });

    /*if(isLoading){
        return <Flex justify="center"><Spin size="large" spinning={isLoading}></Spin></Flex>; 
    }*/
    if(errorMsg){
        return <ErrorComp/>
    }
    return(
        <>
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
            <Flex justify="end" style={{padding:"3px 20px 20px 20px"}}>
                <Button className="button1" type="primary" icon={<PlusOutlined />} onClick={openNewForm}>
                    Add Movie
                </Button>
            </Flex>

            <Table
                columns={columns}
                dataSource={rows}
                expandable={{
                    expandedRowRender: record => <p><span style={{fontWeight:"bold"}}>Description:  </span>{record.description}</p>
                }}
                pagination={{pageSize: 5}}
            ></Table>
        </>
    );
}

export default MovieTable;