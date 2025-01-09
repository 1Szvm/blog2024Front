import React from 'react';
import { useContext } from 'react';
import { CategContext } from '../context/Context';
import Card from '../components/Card';

export const Home = () => {
  const {categories}=useContext(CategContext)
  console.log(categories);
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 pt-5 mt-5">
      {/* Title Section */}
      <h1 className="mb-4">Fő oldal</h1>
      <p>Témák:</p>

      {/* Image Group Section */}
      <div className="d-flex justify-content-center flex-wrap">
        {categories&&categories.map(obj=>(
          <Card name={obj.name} url={obj.photoUrl} key={obj.id}/>
        ))}
      </div>
      <footer className="bg-dark text-light py-4">
      <div className="container d-flex flex-column align-items-center text-center">
        {/* Profile Picture */}
        <img
          src="https://via.placeholder.com/100" // Replace with your profile image URL
          alt="Profile"
          className="rounded-circle mb-3"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />

        {/* Name and Description */}
        <h5 className="mb-2">Szilaj Márk</h5>
        <p className="mb-3" style={{ maxWidth: "400px" }}>
          Hi, I'm a passionate software developer who loves crafting intuitive applications. 
          When I'm not coding, you can find me reading sci-fi novels, exploring coffee shops, 
          or experimenting with new tech gadgets.
        </p>
      </div>
    </footer>
    </div>
  );
};
