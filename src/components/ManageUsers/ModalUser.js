import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup } from '../../service/userService';
import { toast } from 'react-toastify';
import { values } from 'lodash';

const ModalUser = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userGroups, setUserGroups] = useState([]);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');
    const [group, setGroup] = useState('');

    useEffect(()=>{
        getGroups();
    }, [])

    const getGroups = async () => {
        let res = await fetchGroup();
        if(res){
            setUserGroups(res.data.DT);
        } else {
            toast.error(res.data.EM);
        }
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button>

        <Modal size='lg' show={true} onHide={handleClose} animation={false} className='modal-user'>
            <Modal.Header className='modal-header' closeButton>
            <Modal.Title>
                <span>{props.title}</span>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                <Form>

                <Row>
                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Email address<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            type="email"
                            autoFocus
                        />
                        </Form.Group>
                        </Col>

                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label >Phone number<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            type="phone"
                            autoFocus
                        />
                        </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label >Username<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            type="username"
                            autoFocus
                        />
                        </Form.Group>
                        </Col>

                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label >Password<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            type="password"
                            autoFocus
                        />
                        </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="content mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label >Address<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            type="address"
                            autoFocus
                        />
                    </Form.Group>               

                    <Row>
                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label >Sex<span className='mark-important' >*</span></Form.Label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </Form.Group>
                        </Col>

                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput7">
                        <Form.Label >Group<span className='mark-important' >*</span></Form.Label>
                            <select class="form-select" aria-label="Default select example">
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                                {/* <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option> */}
                            </select>
                        </Form.Group>
                        </Col>
                    </Row>

                    {/* <Form.Group
                    className="content mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Example textarea<span className='mark-important'>*</span></Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group> */}

                </Form>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalUser;