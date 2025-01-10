import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

export default function Toastify({err,signin,signUp,resetPw,update}) {
    const {setMsg}=useContext(UserContext)
    const navigate=useNavigate()
    useEffect(()=>{
        if(err){
            toast.error(err,{position:"bottom-right"})
        }else if(signin||signUp){
            toast.success(signin,{position:"bottom-right"})
            setTimeout(()=>navigate("/"),2000)
        }else if(resetPw){
            toast.success(resetPw,{position:"top-left"})
            setTimeout(()=>navigate("/auth/in"),2000)
        }else if(update){
            toast.success(update,{position:"top-left"})
        }
        setMsg({})
    },[err,signin,signUp, resetPw,update])
  return (
    <div>
        <ToastContainer />
    </div>
  )
}
