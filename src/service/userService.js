import axios from "axios";

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8082/api/register', {
        email, phone, username, password
    })
}

const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8082/api/login', {
        valueLogin, password
    })
}

export {registerNewUser, loginUser};