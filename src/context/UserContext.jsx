import React from 'react'
import { auth } from '../utility/firebaseApp'
import {createUserWithEmailAndPassword, deleteUser, onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword,signOut, updateProfile} from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


export const UserContext=createContext()

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [msg,setMsg]=useState({})

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=>unsubscribe()
    },[])

    const updateUser=async (displayName,photoURL)=>{
        try {
            if(displayName&&photoURL) await updateProfile(auth.currentUser,{displayName,photoURL})
            else if(displayName) await updateProfile(auth.currentUser,{displayName})
            else if(photoURL) await updateProfile(auth.currentUser,{photoURL})
            setMsg({})
            setMsg({update:"Sikeres modosítás"})
        } catch (error) {
            setMsg({error})
        }
    }

    const signInUser=async (email,password)=>{
        try {
            await signInWithEmailAndPassword(auth,email,password)
            setMsg({})
            setMsg({signin:"Sikeres Bejelentkezés!"})
        } catch (error) {  
            setMsg({err:error.message})
        }
    }

    const resetPassword=async(email)=>{
        try {
            await sendPasswordResetEmail(auth,email)
            setMsg({})
            setMsg({resetPw:"Email leküldve!"})
        } catch (error) {   
            setMsg({...msg,err:error.message})
        }
    }

    const logoutUser=async ()=>{
        await signOut(auth)
        setMsg({})
    }

    const signUpUser=async (email,password,displayName)=>{
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            await updateProfile(auth.currentUser,{displayName})
            setMsg({})
            setMsg({signup:"Sikeres Regisztráció!"})
        } catch (error) {
            console.log(error);
            
        }
    }

    const deletAccount=async ()=>{
        try {
            await deleteUser(auth.currentUser)
            console.log("Sikeres tőrlés");
            
        } catch (error) {
            console.log(error);
        }
    }
    

    return(
        
        <UserContext.Provider value={{user,signInUser,logoutUser,signUpUser,resetPassword,setMsg,msg,updateUser,deletAccount}}>
            {children}
        </UserContext.Provider>
    
    )
}
