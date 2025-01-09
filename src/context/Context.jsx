import React from 'react'
import { readCategories } from '../utility/crudUtility'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const CategContext=createContext()

export const CategProvider=({children})=>{
    const [categories,setCategories]=useState(null)
    useEffect(()=>{
        readCategories(setCategories)
    },[])

    return(
        <CategContext.Provider value={{categories}}>
            {children}
        </CategContext.Provider>
    )
}