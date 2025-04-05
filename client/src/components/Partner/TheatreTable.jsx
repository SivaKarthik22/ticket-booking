import { Button, Flex, Table, Spin } from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import ErrorComp from "../ErrorComp";

function TheatreTable({openEditingForm, openDeleteModal}){
    const {theatres, theatresAreLoading, theatresErrorMsg} = useSelector(store => store.theatres);

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
            render: value => (value ? "Approved" : "Pending"),
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
    const rows = theatres.map((theatre) => { 
        return {...theatre, key: `theatre_${theatre._id}`};
    });

    if(theatresAreLoading){
        return <Flex justify="center"><Spin size="large" spinning={theatresAreLoading}></Spin></Flex>; 
    }
    if(theatresErrorMsg){
        return <ErrorComp/>
    }
    return(
        <>
            <Table
                columns={columns}
                dataSource={rows}
                pagination={{pageSize: 5}}
            ></Table>
        </>
    );
}

export default TheatreTable;