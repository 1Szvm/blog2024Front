import React from 'react'
import {midleStyle} from "../utils"
import { Form } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import Toastify from '../components/Toastify'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const PwReset = () => {
  const {msg,resetPassword}=useContext(UserContext)
  const handleSubmit=(event)=>{
    event.preventDefault()
    const data=new FormData(event.currentTarget) 
    resetPassword(data.get("email"))
    console.log(data.get("email"));
    
  }
  return (
    <div className='page'>
     <div style={midleStyle}>
      <h3>Jelszó modositas</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label > Email  </Label>
          <Input   name="email"    placeholder="email"    type="email"    />
        </FormGroup>
        <Button>Új jelszó</Button>
      </Form>
      {msg &&<Toastify {...msg}/>}
     </div>
    </div>
  )
}


