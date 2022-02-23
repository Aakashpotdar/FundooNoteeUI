import React from 'react';
import DisplayNote from '../../Components/DisplayNote/Displaynote';
import NoteService from '../../Service/Noteservices';


const noteService = new NoteService();

const Archive = () => {

  const [notesArr, setNotesArr] = React.useState([])

  React.useEffect(()=>{
    getArchivedNotes();
  },[])

  const getArchivedNotes = () => {
    noteService.getArchive()
    .then((res) => {
      setNotesArr(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  return <div>
    <div className='display-container'>
      {notesArr.length > 0 && notesArr.map((n, index) => (
        <DisplayNote key={index} arrNote={n} getNotes={getArchivedNotes} />
      ))}</div>
  </div>;
}

export default Archive;