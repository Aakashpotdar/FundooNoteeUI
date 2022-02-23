import AxiosService from "./Axiosservice";

const axios = new AxiosService();

let baseURL = 'https://localhost:44366/api/User';
let NoteURL= 'https://localhost:44366/api/Note';

const header = {
    header : {
        token : localStorage.getItem("token")
    }
}

class UserService {
    Signup(data){
        
        return axios.post(`${baseURL}/register`,data);
    }

    Signin(data){
        return axios.post(`${baseURL}/Login`,data)
    }

    forgotPass(data){
        return axios.post(`${baseURL}/forgetpassword`,data)
    }

    ResetPassword(data){
        return axios.put(`${baseURL}/resetpassword`,data, header)
    }

    TakeNote(data){
        return axios.post(`${NoteURL}/AddNote`, data)
    }
}

export default UserService;