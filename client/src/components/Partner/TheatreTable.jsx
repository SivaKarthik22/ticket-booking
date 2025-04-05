import { Button, Flex, Table, Spin } from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

function TheatreTable(){

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
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record)=> (
                <Flex gap="small">
                    <Button className="icon-button">
                        <EditTwoTone className="form-button-icon" twoToneColor="#f8447a"/>
                    </Button>
                    <Button className="icon-button">
                        <DeleteTwoTone className="form-button-icon" twoToneColor="#f8447a"/>
                    </Button>
                </Flex>
            ),
        }
    ];
    /*const rows = movies.map((movie) => { 
        return {...movie, key: `movie_${movie._id}`};
    });*/

    /*if(isLoading){
        return <Flex justify="center"><Spin size="large" spinning={isLoading}></Spin></Flex>; 
    }*/
    return(
        <>
            <Table
                columns={columns}
                //dataSource={rows}
                /*expandable={{
                    expandedRowRender: record => <p><span style={{fontWeight:"bold"}}>Description:  </span>{record.description}</p>
                }}*/
                pagination={{
                    pageSize: 5,
                  }}
            ></Table>
        </>
    );
}

export default TheatreTable;