import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    // const [isShow, setIsShow] = useState(props.show)
    // const [show, setShow] = useState(false);
    // const handleClose = () => {
    //     setIsShow(false) 
    //     console.log(isShow)
    // };

    return (
        <>

      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete the user {props.dataModal.email} permanently?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={props.confirmDeleteUser}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default ModalDelete;