import React from 'react'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import {Home} from "./Home"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { BarLoader } from 'react-spinners'
import { addPost, readPost, updatePost } from '../utility/crudUtility'
import { CategContext } from '../context/Context'
import { CatDropdown } from '../components/Dropdown'
import Alerts from '../components/Alerts'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const AddEditPost = () => {
  const {categories}=useContext(CategContext)
  const {user}=useContext(UserContext)
  const [loading,setLoading]=useState(false)
  const [uploaded,setUploaded]=useState(false)
  const [photo,setPhoto]=useState(null)
  const [story,setStory]=useState(null)
  const [enableBtn,setEnableBtn]=useState(false)
  const [selectedCateg,setSelectedCateg]=useState(null)
  const [post,setPost]=useState(null)
  const {register,handleSubmit,formState: { errors },reset,setValue} = useForm()
  const params=useParams()

  useEffect(()=>{
    if(params?.id)readPost(params.id,setPost)
  },[params.id])  

  useEffect(()=>{
    if(post){
      setValue("title",post.title)
      setSelectedCateg(post.category)
      setStory(post.story)
      setPhoto(post.photo.url)
    }
  },[post])

  const onSubmit=async(data)=>{
    setLoading(true)
    if(params.id){
      try {
        updatePost(params.id,{...data,category:selectedCateg,story}) 
      } catch (error) {
        console.log("update: ",error);
      }finally{
        setLoading(false)
      }
    }else{
      let newPostData={
        ...data,
        story,
        author:user.displayName,
        userId:user.uid,
        category:selectedCateg,
        likes:[]
      }
      try {
        const file=data.file[0]
        const {url,id}=file ? await uploadFile(file) : null
        delete newPostData.file
        newPostData={...newPostData,photo:{url,id}}
        console.log(newPostData,user.uid,user);
        console.log("ujid");
        
        addPost(newPostData)
        setUploaded(true)
        reset()
        setPhoto(null)
        setStory(null)
        //updateUser(data.displayName,url+'/'+id)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
  }

  useEffect(()=>{
    if ( !selectedCateg || !story || !story.lenght>10) setEnableBtn(true)
      else setEnableBtn(false)
  }, [selectedCateg, story])

  if (!user) return <Home />

  return (
    <div className="page">
    <form onSubmit={handleSubmit(onSubmit)} className="post-form">
      <div className="form-group">
        <label htmlFor="title">A bejegyzés</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'A cím megadása kötelező.' })}
          className="form-control"
        />
        <p className="text-danger">{errors?.title?.message}</p>
      </div>

      <CatDropdown categories={categories} setSelectedCateg={setSelectedCateg} selectedCateg={selectedCateg}/>

      <Story setStory={setStory} uploaded={uploaded} story={story}/>

      <div className="form-group">
        <label htmlFor="file">Fájl</label>
        <input disabled={params.id}
          id="file"
          type="file"
          {...register("file",params.id?{}:{
            required:!params.id,
            validate: (value) => {
              if (!value[0]) return true
              const fileExtension = value[0]?.name.split(".").pop().toLowerCase()
              const acceptedFormats = ['jpg', 'png']
              if (!acceptedFormats.includes(fileExtension)) return "Invalid file format!"
              if (value[0].size > 1 * 1000 * 1024) return "Az engedélyezett fájl mérete 1MB"
              return true
            }
          })}
          className="form-control"
          onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
        />
        <p className="text-danger">{errors?.file?.message}</p>
        <p className="text-danger">{errors?.file&&"fotó megadása kötelező"}</p>
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary" disabled={enableBtn}>
          {loading ? 'Töltés...' : 'Bejegyzés hozzáadása'}
        </button>
      </div>
    </form>

    {loading && <BarLoader />}
    {uploaded && <Alerts txt="Sikeres feltőltés"/>}
    {photo && <img src={photo} alt="Preview" className="img-thumbnail mt-3" />}
  </div>
  )
}