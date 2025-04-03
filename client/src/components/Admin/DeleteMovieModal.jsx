import { Modal, Spin } from "antd";

function DeleteMovieModal({deleteModalIsOpen, closeDeleteModal, deleteModalIsLoading, deleteRecord, curMovie}){

    return(
        <Modal
            title="Delete Movie"
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