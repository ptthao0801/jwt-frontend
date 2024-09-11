import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Users = (props) => {
    let history = useHistory();
    useEffect(()=> {
        //get saved data from sessionStorage
        let session = sessionStorage.getItem('account');
        if(session){
            // console.log(session)
            console.log('found session from Users')
        } else {
            console.log('NOT found session from USERS')
            history.push('/login')
        }
    }, [])
    return (
        <div>
            users 
        </div>
    )
}

export default Users;