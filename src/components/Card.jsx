import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Card({name,url}) {
  return (
    <div className="position-relative m-3" style={{ width: "18rem", height: "15rem" }}>
          <img
             src={url} 
             className="img-fluid rounded"
             style={{ width: "100%", height: "100%", objectFit: "cover" }}
           />
           <div 
             className="position-absolute top-50 start-50 translate-middle text-white text-center"
             style={{ background: "rgba(0, 0, 0, 0.5)", padding: "0.5rem",  width:"100%"}}
           >
            <NavLink to={"/posts?ctg="+name} className={"text-decoration-none"}>
             <h5 className='text-white'>{name}</h5>
            </NavLink>  
           </div>
    </div>
  )
}
