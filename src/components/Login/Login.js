import { useEffect, useState } from 'react';
import './Login.scss';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../service/userService';

const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState('');

    const handleCreateNewAccount = () => {
        history.push('/register'); 
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);

        if(!valueLogin){
            toast.error('Please enter your email address or phone number')
            setObjValidInput({...defaultObjValidInput, isValidValueLogin: false})
            return;
        }
        if(!password){
            toast.error('Please enter your password')
            setObjValidInput({...defaultObjValidInput, isValidPassword: false})
            return;
        }

        let response = await loginUser(valueLogin, password);

        // success
        if(response && +response.EC === 0){
            
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }

            //save data to sessionStorage
            sessionStorage.setItem('account', JSON.stringify(data))
            history.push('/users')
            // window.location.reload()
        }

        // error
        if(response && +response.EC !== 0){
            toast.error(response.EM)
        }
    }

    const handlePressEnter = (event) => {
        if(event.code === 'Enter' && event.charCode === 13){
            handleLogin();
        }
    }

    useEffect(()=>{
        //get saved data from sessionStorage
        let session = sessionStorage.getItem('account');
        if(session){
            history.push('/');
            window.location.reload();
        } 
    },[])

    return (
        <div className="login-container">
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

                        <input 
                            type='text' 
                            className= {defaultObjValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'} 
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(event)=> {setValueLogin(event.target.value)}}
                        />
                        <input 
                            type='password' 
                            className={defaultObjValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'} 
                            placeholder='Password'
                            value={password}
                            onChange={(event)=> {setPassword(event.target.value)}}
                            onKeyPress={(event)=> handlePressEnter(event)}
                        />
                        <button className='btn btn-primary fw-bold' onClick={() => handleLogin()}>Log in</button>
                        <span className='text-center'>
                            <a className='forgotten-password' href='#'>Forgotten password?</a>
                            </span>
                        <hr/>
                        <div className='text-center'>
                            <button className='create-btn btn fw-bold' onClick={() => handleCreateNewAccount()}>Create new account</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;