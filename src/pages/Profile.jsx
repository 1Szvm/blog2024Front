import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Toastify from "../components/Toastify"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BarLoader } from 'react-spinners';
import {deletePhoto, uploadFile} from "../utility/uploadFile"
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';
import { useConfirm } from 'material-ui-confirm';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const {user,updateUser,msg,deletAccount,logoutUser}=useContext(UserContext)
  const [loading,setLoading]=useState(false)
  const [avatar,setAvatar]=useState(null)
  const confirm=useConfirm()
  const navigate=useNavigate()

  useEffect(()=>{
    !user&&navigate('/')
  },[user])

  useEffect(()=>{
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  },[user])

  const {register,handleSubmit,formState: { errors },} = useForm({
    defaultValues:{
      displayName:user?.displayName||''
    }
  });

  const onSubmit=async(data)=>{
    setLoading(true)
    try {
      const file=data?.file ? data.file[0]:null
      const {url,id}=file ? await uploadFile(file) : null
      updateUser(data.displayName,url+'/'+id)
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  const handleDelet=async()=>{
    let avatarurl=user&&user.photoURL.split("/")
    try {
      await confirm({
        description:"Ez egy visszavonhatatlan művelet",
        confirmationText:"Igen",
        cancellationText:"Mégsem",
        title:"Biztos ki szeretnéd törölni a fiókod?"
      })
      await deletAccount()
      deletePhoto(avatarurl&&avatarurl[avatarurl.length-1])
      navigate("/")
    } catch (error) {
      console.log("mégsem:",error);
      
    }
  }

  return (
    <div className='page'>
      <div className='midleStyle'>
        <h3>Felhasználói fiók beaállításai</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Felhasználónév:</label>
            <input {...register('displayName')}  placeholder="Felhasználónév" type='text' />
          </div>
          <input type="file" {...register("file",{
            validate:(value)=>{
              if(!value[0]) return true
              const fileExtension = value[0]?.name.split(".").pop().toLowerCase()
              const accaptedFromats=['jpg',"png"]
              if(!accaptedFromats.includes(fileExtension))return "Invalid file format!"
              if(value[0].size>1*1000*1024) return "Az engedélyezett fájl márete 1MB"
              return true
            }
          })} onChange={(e)=>setAvatar(URL.createObjectURL(e.target.files[0]))}/>
          <p className='text-danger'>{errors?.file?.message}</p>
          <input type="submit"/>
        </form>

        {loading&&<BarLoader />}
        {msg && <Toastify {...msg}/>}
        {avatar&&<img src={avatar} className='img-thumbnail'/>}
      </div>
      <button className="btn btn-danger my-5" onClick={handleDelet}>Felhasználói fiók törlése</button>
    </div>
  )
}


