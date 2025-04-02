import { Button, Flex, Table, Spin } from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

function MovieTable(){
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
            render: text => text.slice(0,10),
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
            render: text => `${text} mins`,
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
            render: ()=> (<Flex gap="small">
                <Button className="icon-button"><EditTwoTone className="form-button-icon" twoToneColor="#f8447a"/></Button>
                <Button className="icon-button"><DeleteTwoTone className="form-button-icon" twoToneColor="#f8447a"/></Button>
            </Flex>),
        }
    ];
    const rows = movies.map((movie) => { 
        return {...movie, key: `movie_${movie._Id}`};
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