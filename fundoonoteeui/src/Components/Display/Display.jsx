import { Card } from '@mui/material';
import React from 'react';
import Icons from '../Icon/Icon';
import './Display.scss'

const DisplayNote = (props) => {
    
        return (
            <div className='notes'>
                <div className='note-container'>
                    <Card style={{boxShadow: 'inset 0 0 1px 1px rgb(0 0 0 / 10%)'}}>
                    <div style={{padding:'10px 10px 0px 15px'}}>
                        <div>
                        {props.title}
                        </div>
                    </div>
                    <div style={{padding:'10px 10px 0px 15px'}}>
                        <p>
                        {props.content}
                        </p>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-around', width:'100%'}}>
                        <Icons />
                    </div>
                    </Card>
                </div>
            </div>
        )
}
export default DisplayNote;