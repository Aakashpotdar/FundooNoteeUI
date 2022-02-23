
import React from 'react';
import DisplayNote from '../../Components/DisplayNote/Displaynote';
import NoteService from '../../Service/Noteservices';


const noteService = new NoteService();

const Trash = () => {

  const [notesArr, setNotesArr] = React.useState([])

  React.useEffect(()=>{
    getTrashedNotes();
  },[])

  const getTrashedNotes = () => {
    noteService.getTrash()
    .then((res) => {
      setNotesArr(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  return <div>
    <div className='display-container'>
      {notesArr.length > 0 && notesArr.map((n, index) => (
        <DisplayNote key={index} arrNote={n} getNotes={getTrashedNotes} />
      ))}</div>
  </div>;
}

export default Trash;