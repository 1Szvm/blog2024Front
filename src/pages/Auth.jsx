import React from 'react'
import { useContext } from 'react'
import { Form, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import Toastify from '../components/Toastify'
import { midleStyle } from '../utils'

export const Auth = () => {
  const {user,signInUser,signUpUser,msg,setMsg}=useContext(UserContext)
  const navigate=useNavigate()

  const location=useLocation()
  const isignIn=location.pathname=="/auth/in"

  console.log(msg);
  
  const handleSubmit=(event)=>{
    event.preventDefault()
    const data=new FormData(event.currentTarget)
    if(isignIn){
      signInUser(data.get('email'),data.get('password'))
    }else{
      signUpUser(data.get('email'),data.get('password'),data.get('displayName'))
      
    }
  }
  
  return (
    <div className='page'>
     <div style={midleStyle}>
      <h3>{isignIn ? "Bejelntekzés":"Regisztráció"}</h3>
      <Form onSubmit={handleSubmit}>
        {!isignIn && 
            <FormGroup>
              <Label > Felhasználónév</Label>
              <Input   name="displayName"    type="text"  />
            </FormGroup>
          }
        <FormGroup>
          <Label > Email  </Label>
          <Input   name="email"    placeholder="email"    type="email"    />
        </FormGroup>
        <FormGroup>
          <Label > Password</Label>
          <Input   name="password"    type="password"  />
        </FormGroup>
        <Button> Submit  </Button>
      </Form>
      <a href="#" onClick={()=>{navigate("/pwreset")}}>Elfelejtett jelszó...</a>
     </div>
      {msg &&<Toastify {...msg}/>}
    </div>
  )
}


