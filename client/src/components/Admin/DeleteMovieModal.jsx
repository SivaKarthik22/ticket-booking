import { Flex, Modal, Spin } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

function DeleteMovieModal({deleteModalIsOpen, closeDeleteModal, deleteModalIsLoading, deleteRecord, curMovie}){

    return(
        <Modal
            title={<Flex align="center" gap="small">
                <ExclamationCircleFilled style={{color:"orange", fontSize:"18px"}} />
                Delete Movie
            </Flex>}
            open={deleteModalIsOpen}
            onCancel={closeDeleteModal}
            onOk={()=>{ deleteRecord(curMovie) }}
            centered
            okText="Delete"
        >
            <Spin size="large" spinning={deleteModalIsLoading}>
                <p>Are you sure you want to delete the movie, {curMovie ? curMovie.title : ""}?</p>
                <p>This task is undoable.</p>
            </Spin>
        </Modal>
    );
}

export default DeleteMovieModal;