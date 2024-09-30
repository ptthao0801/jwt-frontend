import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser } from '../../service/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        sex: '',
        address: '',
        password: '',
        group: ''
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        sex: true,
        address: true,
        password: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData)
    const [userGroups, setUserGroups] = useState([]);
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    useEffect(()=>{
        getGroups();
    }, [])

    const getGroups = async () => {
        let res = await fetchGroup();
        if(res){
            setUserGroups(res.data.DT);
            if(res.data.DT && res.data.DT.length > 0){
                let groups = res.data.DT
                setUserData({...userData, group: groups[0].id})
            }
        } else {
            toast.error(res.data.EM);
        }
    }

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value
        setUserData(_userData)
    }

    const checkValidateInputs = () => {
        //create user
        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'username', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++){
            if(!userData[arr[i]]){
                toast.error(`${arr[i]} is empty`)
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[arr[i]] = false
                setValidInputs(_validInputs)
                check = false;
                break;
            }
        }

        return check;
    }

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if(check === true){
            let res = await createNewUser({...userData, groupId: userData['group']})
            if(res.data && res.data.EC === 0){
                props.onHide()
                toast.success('Created a new user successfully!')
                setUserData({...defaultUserData, group: userGroups[0].id})
            } else {
                toast.error('Failed to create user')
            }
        }
    }

    return (
        <>

        <Modal size='lg' show={props.show} onHide={props.onHide} animation={false} className='modal-user'>
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
                            className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                            type="email"
                            autoFocus
                            value={userData.email}
                            onChange={(event)=> handleOnChangeInput(event.target.value, 'email')}
                        />
                        </Form.Group>
                        </Col>

                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label >Phone number<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                            type="phone"
                            autoFocus
                            value={userData.phone}
                            onChange={(event)=> handleOnChangeInput(event.target.value, 'phone')}
                        />
                        </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label >Username<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
                            type="username"
                            autoFocus
                            value={userData.username}
                            onChange={(event)=> handleOnChangeInput(event.target.value, 'username')}
                        />
                        </Form.Group>
                        </Col>

                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label >Password<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                            type="password"
                            autoFocus
                            value={userData.password}
                            onChange={(event)=> handleOnChangeInput(event.target.value, 'password')}
                        />
                        </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="content mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label >Address<span className='mark-important' >*</span></Form.Label>
                        <Form.Control
                            className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                            type="address"
                            autoFocus
                            value={userData.address}
                            onChange={(event)=> handleOnChangeInput(event.target.value, 'address')}
                        />
                    </Form.Group>               

                    <Row>
                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label >Sex</Form.Label>
                            <select 
                                className={validInputs.sex ? 'form-select' : 'form-select is-invalid'}
                                class="form-select" 
                                aria-label="Default select example" 
                                onChange={(event)=> handleOnChangeInput(event.target.value, 'sex')}
                            >
                                <option defaultValue='Male'>Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </Form.Group>
                        </Col>

                        <Col xs={6} md={6}>
                        <Form.Group className="content mb-3" controlId="exampleForm.ControlInput7">
                        <Form.Label >Group<span className='mark-important' >*</span></Form.Label>
                            <select 
                                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                class="form-select" 
                                aria-label="Default select example"
                                onChange={(event)=> handleOnChangeInput(event.target.value, 'group')}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }

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
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={()=> handleConfirmUser()}>
                Create
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalUser;