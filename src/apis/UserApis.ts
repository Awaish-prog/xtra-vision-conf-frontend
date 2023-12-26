import axios from "axios";
import apiUrl from "./Apiurl";

async function signUpUserApi(name: string, password: string, email: string){
    const response = axios.post(`${apiUrl}signup`, {
        name,
        email,
        password
    })
    return response;
}

async function loginUserApi(password: string, email: string){
    const response = axios.post(`${apiUrl}login`, {
        email,
        password
    })
    return response;
}

export { signUpUserApi, loginUserApi };