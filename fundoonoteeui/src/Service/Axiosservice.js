import axios from 'axios';

class AxiosService{
    
    get(url, data="", header=false){
        return axios.get(url, data, header)
    }

    post(url, data="", header=false){
        return axios.post(url, data, header)
    }

    put(url, data="", header=false){
        return axios.put(url, data, header)
    }

    delete(url, data="", header=false){
        return axios.delete(url, data, header)
    }
}

export default AxiosService;