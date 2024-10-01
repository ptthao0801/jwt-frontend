import Nav from "./components/Navigation/Nav";
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from "./components/ManageUsers/Users";
import { useEffect, useState } from "react";
import _ from "lodash";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [account, setAccount] = useState({});

  useEffect(()=> {
    //get saved data from sessionStorage
    let session = sessionStorage.getItem('account');
    if(session){
        // console.log(session)
        setAccount(JSON.parse(session));
        console.log('found session from APP hihi')
    } else {
        console.log('NOT found session from APP hihi')
        // history.push('/login');
    }
}, [])

  return (
    <>
    <Router>
    <div className="app-header">
      <Nav/>
    </div>
    <div className="app-container">
      <AppRoutes/>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </Router>
    </>
  );
}

export default App;
