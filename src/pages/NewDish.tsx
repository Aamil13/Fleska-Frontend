import axios from 'axios';
import React, { useState } from 'react'
import {BsImageFill} from "react-icons/bs"
import { createMenu } from '../redux/reducers/menuSlice';
import { useAppDispatch } from '../redux/useTypedSelector';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircularSplit } from 'spinners-react';


type props={
  title: string;
  price: number;
  description: string;
  image: any;
}

const NewDish = () => {
  const [img,setImg]= useState <File>()
  const [newload, setNewLoad] =useState(false)
  const [inputs,setInputs]= useState<props>({
    title:"",
    price:0,
    description:"",
    image:"",
  })

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
  const handleChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{

    
    setInputs((prevstate)=>({
      ...prevstate,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit=async()=>{
    setNewLoad(true)
    let res
      if(img ){
        const formdata:any = new FormData();
        formdata.append("file",img)
        formdata.append("upload_preset",import.meta.env.VITE_REACT_APP_PRESET_KEY)
       res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUD_NAME}/image/upload`,formdata)
      }
    
    

if(res?.data?.secure_url){
  inputs.image = res?.data?.secure_url
}
    if(!inputs.title || inputs.title.trim() === "" || 
    !inputs.description || inputs.description.trim() === ""||
    !inputs.price 
    ){
      return toast.error("All Fields Required")
    }

    
       await dispatch(createMenu(inputs))
       setNewLoad(false)
      navigate("/")
    
  }




  return (
    <div className='mt-20 h-[83.8vh] flex justify-center items-center'>
        <div className='w-96 border-2 border-red-100 max-sm:w-[97%]  h-[600px] shadow-2xl flex justify-center'>
          <div className='relative p-4  w-full flex flex-col'>
          <input style={{display:"none"}} type="file" id='file' onChange={(e)=>setImg(((e.target as HTMLInputElement).files as FileList)[0])} />
          <label htmlFor="file">
            {
              img ? 
            
            <img className='absolute shadow-lg -top-10 left-[28%] w-40 h-40 m-2 rounded-[100%] object-cover' src={URL.createObjectURL(img)} alt="image" />
              : 
              <div className='absolute flex justify-center items-center  -top-10 left-[28%] w-40 h-40 m-2 rounded-[100%] object-cover'>
                <BsImageFill  size={80} />
              </div>
              }
            </label>
            <div className='mt-36 flex flex-col justify-center items-center gap-6'>
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.title} name='title' placeholder='Enter Name Of The Dish' type="text" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.price} name='price' placeholder='Enter Price Of The Dish' type="number" />
            <textarea className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 h-44 resize-none' onChange={handleChange} value={inputs.description} name='description' placeholder='Enter Description Of The Dish' ></textarea>
            <button disabled={newload ? true : false} onClick={()=>handleSubmit()} className='bg-red-200 p-2 border-2 border-red-100 hover:bg-red-300 transition-all duration-300 shadow-lg rounded-2xl '>{newload ? <SpinnerCircularSplit/> :  "Create Dish"}</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NewDish