import React, { createContext, useState, useEffect } from "react";
import {getUserAccount} from '../service/userService';

const UserContext = createContext(null);

const UserProvider = ({children}) => {

  // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(
      { 
        isAuthenticated: false, 
        token: '',
        account: {}
      });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: '',
      auth: false,
    }));
  };

  const fetchUsers = async () => {
    let response = await getUserAccount();
    if(response && response.EC === 0){
      let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username
            let token = response.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                account: {groupWithRoles, email, username}
            }
      setUser(data);
    }
  }

  useEffect(()=> {
    fetchUsers()
  },[])

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export {UserContext, UserProvider};