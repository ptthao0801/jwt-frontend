import './Login.scss';

const Login = (props) => {
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

                        <input type='text' className='form-control' placeholder='Email address or phone number'/>
                        <input type='password' className='form-control' placeholder='Password'/>
                        <button className='btn btn-primary fw-bold'>Log in</button>
                        <span className='text-center'>
                            <a className='forgotten-password' href='#'>Forgotten password?</a>
                            </span>
                        <hr/>
                        <div className='text-center'>
                            <button className='create-btn btn fw-bold'>Create new account</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;