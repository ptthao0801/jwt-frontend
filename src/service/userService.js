import axios from "axios";

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8082/api/register', {
        email, phone, username, password
    })
}

export {registerNewUser};