import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const  SearchBox=({items})=> {
    const navigate=useNavigate()

  const handleOnSelect = (item) => {
    // the item selected
    navigate("/detail/"+item.id)
  }


  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div>
      <header>
        <div style={{ width: 400 ,color:"black"}}>
          <ReactSearchAutocomplete
            items={items}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            styling={{zIndex:100}}
          />
        </div>
      </header>
    </div>
  )
}
