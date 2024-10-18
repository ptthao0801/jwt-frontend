import { Route } from "react-router-dom";
import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {

    let history = useHistory();
    const {user} = useContext(UserContext)

    useEffect(()=> {
        console.log('>>> check content user: ', user)
        //get saved data from sessionStorage
        let session = sessionStorage.getItem('account');
        if(session){
            console.log('found session from Users')
            //check role

        } else {
            console.log('NOT found session from USERS')
            history.push('/login')
            window.location.reload();
        }
    }, [])

    return (
        <>
            <Route path={props.path} component={props.component}/>
        </>
    )
}

export default PrivateRoutes;