import './Register.scss';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../service/userService';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    let history = useHistory();
    const handleCreateNewAccount = () => {
        history.push('/register'); 
    }

    const handleLogIn= () => {
        history.push('/login');
    }

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput)
        if(!email ) {
            toast.error('Email is required!');
            setObjCheckInput({...defaultValidInput, isValidEmail: false})
            return false
        } 

        let regx = /\S+@\S+\.\S+/;
        if(!regx.test(email)) {
            //copy obj va ghi de phan isValidEmail
            setObjCheckInput({...defaultValidInput, isValidEmail: false})
            toast.error('Please enter a valid email address!')
            return false
        }

        if(!phone ) {
            setObjCheckInput({...defaultValidInput, isValidPhone: false})
            toast.error('Phone is required!')
            return false
        } 
        if(!password ) {
            setObjCheckInput({...defaultValidInput, isValidPassword: false})
            toast.error('Password is required!')
            return false
        } 
        if(confirmPassword !== password) {
            setObjCheckInput({...defaultValidInput, isValidConfirmPassword: false})
            toast.error('Passwords do not match!')
            return false
        }

        return true;
    }

    useEffect(() => {
        // axios.get('http://localhost:8082/api/test-api').then(data => {
        //     console.log('>>> check data axios: ', data)
        // })


    },[])

    const handleSignUp = async () => {
        let check = isValidInputs();
        if(check === true){
            let response = await registerNewUser(email, phone, username, password);
            let serverData = response;
            if(+serverData.EC === 0){
                toast.success(serverData.EM);
                history.push('/login');
            } else {
                toast.error(serverData.EM)
            }
        }
    }

    return (
        <div className="register-container">
            <div className="container">
                <div className="row">
                    <div className="content-left content-left col-12 d-none col-md-7 d-md-block">
                        <div className='logo'>
                            <img className='fb-logo img-fluid' src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg'/>
                        </div>
                        <div className='detail fs-3'>
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className='logo-mobile d-md-none'>
                            <img className='fb-logo-mobile img-fluid' src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg'/>
                        </div>
                    <div className="content-right col-12 col-md-4 d-flex flex-column gap-3 py-3">

                        <div className='signup fs-3 fw-bolder'>Sign Up</div>
                        
                        <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address' value={email} onChange={(event) => setEmail(event.target.value)}/>
                        <input type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number' value={phone} onChange={(event) => setPhone(event.target.value)}/>
                        <input type='text' className='form-control' placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                        <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                        <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Re-enter password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/>
                        <button className='btn btn-primary fw-bold' onClick={() => handleSignUp()}>Sign Up</button>
                        <span className='text-center'>
                            <a className='forgotten-password' href='/login'>Already have an account?</a>
                            </span>
                        <hr/>
                        <div className='text-center'>
                            <button className='login-btn btn fw-bold' onClick={() => handleLogIn()}>Log In</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register;