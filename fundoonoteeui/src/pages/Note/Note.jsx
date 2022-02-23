
import React from 'react';
import TakeNote from '../../Components/TakeNote/Takenote';
import DisplayNote from '../../Components/DisplayNote/Displaynote';
import NoteService from '../../Service/Noteservices';
import './Note.scss'

const noteService = new NoteService();

function Notes(){

  const [notesArr, setNotesArr] = React.useState([]);

  React.useEffect(() => {
    getNotes();
  },[])

  const getNotes = () => {
    noteService.getAllNotes()
    .then((res) => {
      setNotesArr(res.data.data)
    }).catch((err) => {
      console.log(err);
    })  
  }

  return <div>
    <TakeNote closeBtn={getNotes} />
    <div className='display-container'>
      {notesArr.length > 0 && notesArr.map((n, index) => (
        <DisplayNote key={index} arrNote={n} getNotes={getNotes} />
      ))}</div>
  </div>;
}

export default Notes;