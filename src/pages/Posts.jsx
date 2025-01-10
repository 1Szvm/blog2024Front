import React, { useContext, useState, useEffect } from 'react';
import { CategContext } from '../context/Context';
import { readPosts } from '../utility/crudUtility';
import { sanitizerHTML } from '../utility/utils';
import {useNavigate, useSearchParams} from 'react-router-dom'
import { SearchBox } from '../components/SearchBox';

export const Posts = () => {
  const [searchParams]=useSearchParams()
  const { categories } = useContext(CategContext);
  const [posts, setPosts] = useState([]);
  const [selectedCateg, setSelectedCateg] = useState(searchParams.get("ctg")? [searchParams.get("ctg")]:[]);
  const navigate=useNavigate()
  

  useEffect(() => {
    // Fetch posts on component mount
    readPosts(setPosts,selectedCateg);
  }, [selectedCateg]);

  // Handle category selection change
  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCateg((prevSelected) =>
      checked ? [...prevSelected, id] : prevSelected.filter((categ) => categ !== id)
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 page">
      <div className='pt-4'>{posts && <SearchBox items={posts.map(obj=>({id:obj.id,name:obj.title}))}/>}</div>
      <div className="btn-group pb-4" role="group" aria-label="Category selection">
        {categories && categories.map((category) => (
          <div key={category.id} className="p-1">
            <input
              type="checkbox"
              className="btn-check"
              id={category.name}
              autoComplete="off"
              checked={selectedCateg.includes(category.name)}
              onChange={handleCategoryChange}
            />
            <label className="btn btn-outline-primary" htmlFor={category.name}>
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <div className="card-group">
  {posts && posts.length > 0 ? (
    posts.map((post) => (
      <div
        key={post.id}
        className="card bg-secondary text-white border-light mb-4"
        style={{
          maxWidth: "500px",
          minHeight: "400px", // Increased height for the card
          display: "flex",
          flexDirection: "column",
        }}
        onClick={()=>navigate("/detail/"+post.id)}
      >
        <img
          src={post.photo.url}
          className="img-fluid rounded"
          style={{
            objectFit: "cover",
            height: "250px", // Increased height for the image
          }}
          alt={post.title}
        />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{sanitizerHTML(post.story)}</p>
          <p className="card-text">
            <small className="p-2 border border-3 rounded">{post.category}</small>
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-muted">No posts available in this category.</p>
  )}
</div>

    </div>
  );
};
