import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom/cjs/react-router-dom';

const Nav = (props) => {
  const [isShow, setIsShow] = useState(false);
  let location = useLocation();

  useEffect(()=>{
    if(location.pathname === '/login' || location.pathname === '/Login'){
        setIsShow(false)
    } else {
      setIsShow(true)
    }
  },[])
  return (
    <>
    {isShow === true && 
      <div className="topnav">
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
          {/* <NavLink to="/signout">Sign out</NavLink> */}
      </div>
    }
    </>
  )
}

export default Nav;
