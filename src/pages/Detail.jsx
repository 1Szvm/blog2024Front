import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, readPost, toggleLike } from '../utility/crudUtility';
import parse from 'html-react-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useConfirm } from 'material-ui-confirm';
import { deletePhoto } from '../utility/uploadFile';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Alerts from '../components/Alerts';

export default function Detail() {
    const {user} =useContext(UserContext)
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const confirm=useConfirm()
    const param = useParams();
    const [txt,setText]=useState(null)

    useEffect(() => {
        readPost(param.id, setPost);
    }, [param.id]);

    const handleDelete= async ()=>{
      try {
        await confirm({
          description:"Ez egy visszavonhatatlan művelet",
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztos ki szeretnéd törölni a posztot?"
        })
        deletePost(post.id)
        deletePhoto(post.photo.id)
        navigate("/posts")
      } catch (error) {
        console.log("mégsem:",error);
        
      }
    }
    
    const handleLikes=async()=>{
        if(!user) setText("Jelentkezz be a post like-olásához!")
        else await toggleLike(post.id,user.uid)
    }    
    

    return (
        <div className="container my-4 page">
            {post ? (
                <>
                    <h1 className="text-center my-4">{post.title}</h1>
                    <div className="text-center">
                        <img
                            className="img-fluid rounded shadow-sm mb-4"
                            src={post.photo.url}
                            alt={post.title}
                            style={{ maxWidth: '600px' }}
                        />
                    </div>
                    <div className="content mb-4">
                        <div className="border rounded p-3">
                            {parse(post.story)}
                        </div>
                    </div>
                    <div className="actions d-flex justify-content-around align-items-center mt-4 py-3 border-top">
                        <div className="d-flex align-items-center">
                            {post&&post.likes.includes(user?.uid)?<ThumbUpIcon className="me-2 text-primary" style={{ cursor: 'pointer'}}  onClick={handleLikes}/>:<ThumbUpOffAltIcon className="me-2 text-primary" style={{ cursor: 'pointer'}} onClick={handleLikes}/>}
                            {/*post&&user&&<ThumbUpIcon className="me-2 text-primary" style={{ cursor: 'pointer'}} onClick={handleLikes}/>*/}
                            {post&&<span>{post?.likes.length}</span>}
                        </div>
                        {user && post && (user.uid==post.userId)&&<EditIcon className="text-warning" style={{ cursor: 'pointer' }} onClick={()=>navigate("/update/"+post.id)}/>}
                        {user && post && (user.uid==post.userId)&&<DeleteIcon className="text-danger" style={{ cursor: 'pointer' }} onClick={handleDelete}/>}
                    </div>
                      <button
                        className="btn btn-secondary my-2"
                        onClick={() => navigate('/posts')}
                        >
                            Back to Posts
                        </button>
                </>
            ) : (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {txt &&<Alerts txt={txt} err={false}/>}
        </div>
    )
}
