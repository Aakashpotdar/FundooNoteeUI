import AxiosService from "./Axiosservice";

const axiosService = new AxiosService();
const baseURL ="https://localhost:44366/api/Note";

const headerConfig = {
  
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    
}
class NoteServices{
     
    addNote(data) {
        return axiosService.post(`${baseURL}/AddNote`, data, headerConfig);
    }

    getAllNotes() {
        return axiosService.get(`${baseURL}/GetNote`, headerConfig);
    }

    updateNote(data) {
        return axiosService.put(`${baseURL}/Edit`, data, headerConfig);
      }
   
    getArchive(data){
        return axiosService.get(`${baseURL}/Getarchive`,data,headerConfig)
    }

    Archive(data){
        return axiosService.put(`${baseURL}/ArchiveUnarchive`,data,headerConfig)
    }

    AddColor(data){
        return axiosService.put(`${baseURL}/AddColor`,data,headerConfig)
    }

    Trash(data){
        return axiosService.put(`${baseURL}/Trash`,data,headerConfig)
    }

    getTrash(){
        return axiosService.get(`${baseURL}/GetTrash`,headerConfig)
    }
}

export default NoteServices