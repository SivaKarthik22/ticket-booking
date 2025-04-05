import { Flex, Modal, Spin } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

function DeleteTheatreModal({deleteModalIsOpen, closeDeleteModal, deleteModalIsLoading, deleteRecord, curTheatre}){

    return(
        <Modal
            title={<Flex align="center" gap="small">
                <ExclamationCircleFilled style={{color:"orange", fontSize:"18px"}} />
                Delete Theatre
            </Flex>}
            open={deleteModalIsOpen}
            onCancel={closeDeleteModal}
            onOk={deleteRecord}
            okText="Delete"
            centered
        >
            <Spin size="large" spinning={deleteModalIsLoading}>
                <p>Are you sure you want to delete the theatre, {curTheatre ? curTheatre.name : ""}?</p>
                <p>This task is undoable.</p>
            </Spin>
        </Modal>
    );
}

export default DeleteTheatreModal;