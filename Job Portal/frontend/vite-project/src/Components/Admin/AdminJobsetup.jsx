import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const AdminJobsetup = () => {
  const [input,setInput] = useState({
      title:"",
      JobType:"",
      Role:"",
      Description:"",
      Requirements:"",
      salary:"",
      location:"",
      experience:"",
      position:0,
      companyId:""
    });
    const handleOnChange=(e)=>{
      setInput({...values,[e.target.name]:e.target.value});
    };
    useEffect(()=>{
         setInput({
           title: "",
      JobType:"",
      Role:"",
      Description:"",
      Requirements:"",
      salary:"",
      location:"",
      experience:"",
      position:0,
      companyId:""
         })
    },[])
  return (
    <div>AdminJobsetup</div>
  )
}

export default AdminJobsetup