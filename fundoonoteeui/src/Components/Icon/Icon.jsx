import React from 'react';
import { AddAlertOutlined, ColorLensOutlined, ImageOutlined, MoreVertOutlined, PersonAddAlt1Outlined } from '@mui/icons-material';
import ArchiveOutlined from '@mui/icons-material/ArchiveOutlined';
import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import './Icons.scss'
import NoteService from '../../Service/Noteservices';

const noteService = new NoteService();

function Icons(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const colors = ['#f24b82', '#fbba04', '#ff0475', '#cfff90', '#a7f3eb', '#cbf008', '#afcbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const archiveNote = () => {
    if(props.mode === 'create'){
      props.addArchive();
      props.getAllNotes();
    }else if(props.mode === 'update'){
      props.addArchive();
      // props.getAllNotes();
    }
  }

  const trashNote = () => {
    if(props.mode === 'create'){
      props.noteDelete();
      props.getAllNotes();
    }else if (props.mode === 'update'){
      props.noteDelete();
      // props.getAllNotes();
    }
  }

  const addData = (data) => {
    if(props.mode === 'create') {
      props.colorChange(data);
    } else if(props.mode === 'update') {
      let updateData = {
        "color":data,
        "noteId": props.arrId,
      }
      noteService.AddColor(updateData)
      .then((res) => {
        props.updateMode(updateData);
      }).catch((err) => {
        console.log(err);
      })
    }
  } 

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1)
  const id = open ? 'simple-popover' : undefined;
  const id1 = open1 ? 'simple-popover' : undefined;

  return <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around' }}>
    <div>
      <IconButton>
        <AddAlertOutlined fontSize='small' />
      </IconButton>
    </div>
    <div>
      <IconButton>
        <PersonAddAlt1Outlined fontSize='small' />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={handleClick}>
        <ColorLensOutlined fontSize='small' />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className='pop-icon'>
          {
            colors.map((code,index) => {
              return <div key={index} id={code} className='pop-color' style={{ backgroundColor: code }} onClick={() => addData(code)}></div>
            })
          }
        </div>
      </Popover>
    </div>
    <div>
      <IconButton>
        <ImageOutlined fontSize='small' />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={archiveNote}>
        <ArchiveOutlined fontSize='small' />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={handleClick1}>
        <MoreVertOutlined fontSize='small' />
      </IconButton>
      <Popover
          style={{ fontFamily: 'DM Sans' }}
          id={id1}
          open={open1}
          anchorEl={anchorEl1}
          onClose={handleClose1}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className='pop-more'>
            <div className='pop-option' onClick={trashNote}>Delete Note</div>
            <div className='pop-option'>Add Label</div>
            <div className='pop-option'>Make a copy</div>
            <div className='pop-option'>Add Drawing</div>
          </div>
        </Popover>
    </div>
  </div>;
}

export default Icons;