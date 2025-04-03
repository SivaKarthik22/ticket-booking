import { Button, Flex, Table, Spin } from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import moment from 'moment';

function MovieTable({openEditingForm, openDeleteModal}){
    const {movies, isLoading} = useSelector(store => store.movies);

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

    if(isLoading){
        return <Flex justify="center"><Spin size="large" spinning={isLoading}></Spin></Flex>; 
    }
    return(
        <>
            <Table
                columns={columns}
                dataSource={rows}
                expandable={{
                    expandedRowRender: record => <p><span style={{fontWeight:"bold"}}>Description:  </span>{record.description}</p>
                }}
                pagination={{
                    pageSize: 5,
                  }}
            ></Table>
        </>
    );
}

export default MovieTable;