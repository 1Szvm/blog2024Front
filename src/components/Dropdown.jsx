import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const CatDropdown=({categories,selectedCateg,setSelectedCateg})=>{
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  
  return (
    <div className="d-flex p-1">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{selectedCateg?selectedCateg:"Kategória"}</DropdownToggle>
        <DropdownMenu>
            {categories?categories.map(obj=>
                <DropdownItem key={obj.name} onClick={()=>setSelectedCateg(obj.name)}>{obj.name}</DropdownItem>
            ):
            <DropdownItem >Nincsnek elérhető kategóriák</DropdownItem>
            }
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
