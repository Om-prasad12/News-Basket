import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Total from './Admin/Total';
const Protected = ({api}) => {
    const navigate =useNavigate();

    useEffect(()=>{
       const list =localStorage.getItem('role');
       console.log(list)
       if (list !=="admin"){
        navigate("/")
       }      
    },[])
  return (
    <div>
       <Total api={api}/>
    </div>
  )
}

export default Protected
