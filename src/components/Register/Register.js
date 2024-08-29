import './Register.scss';
import { useHistory } from "react-router-dom";

const Register = (props) => {
    let history = useHistory();
    const handleCreateNewAccount = () => {
        history.push('/register'); 
    }

    const handleLogIn= () => {
        history.push('/login');
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
                        
                        <input type='text' className='form-control' placeholder='Email address'/>

                        <input type='text' className='form-control' placeholder='Phone number'/>
                        <input type='text' className='form-control' placeholder='Username'/>
                        <input type='password' className='form-control' placeholder='Password'/>
                        <input type='password' className='form-control' placeholder='Re-enter password'/>
                        <button className='btn btn-primary fw-bold'>Sign Up</button>
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