
import { BrushOutlined, CheckBoxOutlined, ImageOutlined } from '@mui/icons-material';
import { Card, IconButton, Input } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import Icons from '../Icon/Icon';
import './Note.scss';
import NoteService from '../../Service/Noteservices';


const noteService = new NoteService();  

const TakeNote = (props) => {

  const [note, openNote] = useState(true);
  const [changeColor,setColor] = useState('#ffffff')

  const [notes, setNotes] = useState({
    title: '',
    content: ''
  });

  const backgroundColor = (colorCode) => {
    setColor(colorCode)
  }

  const setOpen = () => {
    openNote(!note)
  }

  const saveNote = () => {
    let data = {
      "title": notes.title,
      "description": notes.content,
      "color": changeColor,
      "archive": false,
      "Trash": false
    }
    if (notes.title !== '' || notes.content !== '') {
      setOpen()
      noteService.addNote(data)
      .then(res => {
        props.closeBtn(notes);
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
      setNotes({
        title: '',
        content: ''
      })
    }
    setOpen()
    setColor('#ffffff')
  }

  const onTextChange = (e) => {
    setNotes(() => (
      { ...notes, [e.target.name]: e.target.value }
    ))
  }

  return <div className='note-container'>
    {
      note ?
        <Card style={{ boxShadow: '0 1px 7px rgb(134, 134, 134)'}} className='card-container' onClick={() => setOpen()} >
          <div className='input-container'>
            <div>
              <Input
                className='addnoteinput'
                type='text'
                placeholder='Take a note...'
                disableUnderline
                style={{ fontFamily: 'DM Sans' }}
              />
            </div>
          </div>
          <div className='icon-container'>
            <IconButton><CheckBoxOutlined /></IconButton>
            <IconButton><BrushOutlined /></IconButton>
            <IconButton><ImageOutlined /></IconButton>
          </div>
        </Card>
        :
        <Card style={{ boxShadow: 'inset 0 0 1px 1px rgb(0 0 0 / 10%)', backgroundColor: changeColor }} className='cards-container'>
          <div className='cardOpen'>
            <Input
              className='addnoteinput'
              type='text'
              placeholder='Title'
              style={{ fontFamily: 'DM Sans' }}
              disableUnderline
              onChange={onTextChange}
              name='title'
              value={notes.title} />
          </div>
          <div className='input-container'>
            <Input
              className='addnotetext'
              type='text'
              placeholder='Take a note...'
              style={{ fontFamily: 'DM Sans' }}
              disableUnderline
              multiline
              onChange={onTextChange}
              name='content'
              value={notes.content} />
          </div>
          <div className='footer-container'>
            <div className='icons-container'>
              <Icons mode="create" colorChange={(colorCode) => backgroundColor(colorCode)} />
            </div>
            <div className='footer-button'>
              <button className='btn-close' style={{ backgroundColor: changeColor }} onClick={() => saveNote()}>Close</button>
            </div>
          </div>
        </Card>
    }
  </div >
}

export default TakeNote;