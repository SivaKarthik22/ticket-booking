import { Button, Flex, Table, Spin, Form, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from 'moment';
import ErrorComp from "../ErrorComp";
import { getAllTheatresOfOwner } from "../../redux/TheatreSlice.js";
import { getAllShowsOfTheatre } from "../../redux/ShowSlice.js";
import { deleteShow, postShow, putShow } from "../../services/showServices.js";
import ShowFormModal from "./ShowFormModal.jsx";
import DeleteShowModal from "./DeleteShowModal.jsx";
import { getAllMovies } from "../../redux/MovieSlice.js";

function ShowsComp({messageApi}){
    const {user} = useSelector(store => store.user);
    const {theatres, theatresAreLoading, theatresErrorMsg} = useSelector(store => store.theatres);
    const dispatch = useDispatch();
    const [curTheatreId, setCurTheatreId] = useState(null);

    useEffect(()=>{
        if(user)
            dispatch( getAllTheatresOfOwner(user._id) );
    },[user]);
    useEffect(()=>{
        dispatch( getAllMovies() );
    },[]);
    useEffect(()=>{
        if(theatres)
            setCurTheatreId(theatres[0]._id);
    },[theatres]);

    const tabItems = theatres.map(theatreObj => {
        return {
            key: theatreObj._id,
            label: theatreObj.name,
            children: 
                <ShowTable
                    messageApi={messageApi}
                    curTheatreId={curTheatreId}
                    curTheatreName={theatreObj.name}
                />,
        }
    });

    if(theatresAreLoading){
        return <Flex justify="center"><Spin size="large"></Spin></Flex>; 
    }
    if(theatresErrorMsg){
        return <ErrorComp/>
    }
    return(
        <>
            <Tabs
                items={tabItems}
                tabPosition="left"
                style={{marginTop:"20px"}}
                onChange={ (key) => {
                    setCurTheatreId(key);
                }}
                tabBarStyle={{maxWidth: "200px"}}
            />
        </>
    );
}

export default ShowsComp;




function ShowTable({messageApi, curTheatreId, curTheatreName}){
    const {shows, showsErrorMsg} = useSelector(store => store.shows);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [formType, setFormType] = useState("create");
    const [curShow, setCurShow] = useState(null);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [deleteModalIsLoading, setDeleteModalIsLoading] = useState(false);

    useEffect(()=>{
        if(curTheatreId)
            dispatch( getAllShowsOfTheatre(curTheatreId) );
    },[curTheatreId]);

    function closeModal(){
        setModalIsOpen(false);
        setCurShow(null);
    }
    function openNewForm(){
        setModalIsOpen(true);
        setFormType("create");
    }
    function openEditingForm(showObj){
        setModalIsOpen(true);
        setCurShow( {
            ...showObj,
            date: moment(showObj.date).format("YYYY-MM-DD"),
            movie: showObj.movie._id,
        } );
        setFormType("edit");
    }
    function openDeleteModal(showObj){
        setCurShow(showObj);
        setDeleteModalIsOpen(true);
    }
    function closeDeleteModal(){
        setDeleteModalIsOpen(false);
        setCurShow(null);
    }
    async function deleteRecord(){
        setDeleteModalIsLoading(true);
        const responseData = await deleteShow(curShow);
        setDeleteModalIsLoading(false);
        
        if(responseData.success){
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            dispatch( getAllShowsOfTheatre(curTheatreId) );
        }
        else{
            messageApi.open({
                type: 'warning',
                content: `${responseData.message}. Please try again`,
            });
        }
        setDeleteModalIsOpen(false);
        setCurShow(null);
    }
    async function submitShowForm(values){
        setFormIsLoading(true);
        let responseData;
        if(formType == "edit")
            responseData = await putShow({...values, _id: curShow._id});
        else
            responseData = await postShow({...values, theatre: curTheatreId});
        setFormIsLoading(false);
        
        if(responseData.success){
            setModalIsOpen(false);
            messageApi.open({
                type: 'success',
                content: responseData.message,
            });
            setCurShow(null);
            dispatch( getAllShowsOfTheatre(curTheatreId) );
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
            title: "Show Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Show Date",
            dataIndex: "date",
            key: "date",
            render: date => moment(date).format("DD-MMM-YYYY"),
        },
        {
            title: "Show Time",
            dataIndex: "time",
            key: "time",
            render: text => moment(text, "HH:mm").format("hh:mm A"),
        },
        {
            title: "Movie",
            dataIndex: "movie",
            key: "movie",
            render: movieObj => movieObj.title,
        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice",
            key: "ticketPrice",
            render: text => `Rs. ${text}`,
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats",
            key: "totalSeats",
        },
        {
            title: "Available Seats",
            dataIndex: "bookedSeats",
            key: "availableSeats",
            render: (bookedSeats,record) => record.totalSeats-bookedSeats.length,
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
    const rows = shows.map((show) => { 
        return {...show, key: `show_${show._id}`};
    });

    if(showsErrorMsg){
        return <ErrorComp/>
    }
    return (<>
        <ShowFormModal
            closeModal={closeModal}
            submitShowForm={submitShowForm}
            form={form}
            modalIsOpen={modalIsOpen}
            formIsLoading={formIsLoading}
            formType={formType}
            curShow={curShow}
            theatreName={curTheatreName}
        />
        <DeleteShowModal
            closeDeleteModal={closeDeleteModal}
            deleteModalIsOpen={deleteModalIsOpen}
            deleteModalIsLoading={deleteModalIsLoading}
            curShow={curShow}
            deleteRecord={deleteRecord}
        />
        <Flex justify="end" style={{padding:"0px 20px 20px 20px"}}>
            <Button className="button1" type="primary" icon={<PlusOutlined />} onClick={openNewForm}>
                Add Show
            </Button>
        </Flex>
        <Table
            columns={columns}
            dataSource={rows}
            pagination={{pageSize: 5}}
        />
    </>);
}

