import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,   UncontrolledDropdown,  DropdownToggle,  DropdownMenu,
  DropdownItem, } from 'reactstrap';
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';


export const Header=()=> {
  const [isOpen, setIsOpen] = useState(false);
  const {user,logoutUser}=useContext(UserContext)
  const [avatar,setAvatar]=useState(null)

  useEffect(()=>{
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
    !user&&setAvatar(null)
  },[user,user?.photoURL  ])

  const toggle = () => setIsOpen(!isOpen);
  

  return (
    <div>
      <Navbar fixed='top' expand="md" 
      className="menu"
      style={{borderBottom:'1px solid gray',backgroundColor:"var(--color1)"}} >
        <NavbarBrand href="/"><FaBlog style={{color:"var(--color2)"}}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to='/' style={{color:"var(--color3)"}}>Főoldal</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to='/posts' style={{color:"var(--color3)"}}>Posztok</NavLink>
            </NavItem>

            {user &&             
            <NavItem>
              <NavLink className="nav-link" to='/create' style={{color:"var(--color3)"}}>Új bejegyzés</NavLink>
            </NavItem>}

          
          </Nav>
{/* autorizáció*/}
          <Nav navbar>
          { !user ? 
          <>
            <NavItem>
              <NavLink className="nav-link" to='/auth/in' style={{color:"var(--color3)"}}>Belépés</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/auth/up' style={{color:"var(--color3)"}}>Regisztráció</NavLink>
            </NavItem>
          </> 
          :
          <>
            <NavItem>
              <NavLink 
                className="nav-link" 
                to='/'
                onClick={()=>logoutUser()}
                style={{color:"var(--color3)"}}
                >Kijelentkezés</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {avatar ? <img className='myavatar' src={avatar}/>:<RxAvatar style={{color:"var(--color3)"}}/>}
              </DropdownToggle>
              <DropdownMenu end style={{color:"var(--color3)"}}>
                <DropdownItem >
                  <NavLink style={{color:"var(--color3)"}} to="/profile">Személyes adatok</NavLink>
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
          }
          </Nav>  
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

