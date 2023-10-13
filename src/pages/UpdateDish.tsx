import React, { useEffect, useState } from 'react'
import {BsImageFill} from "react-icons/bs"
import { useAppDispatch } from '../redux/useTypedSelector';
import axios from 'axios';
import { getsingleMenu, updateMenu } from '../redux/reducers/menuSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SpinnerCircular } from 'spinners-react';




type props={
  title: string;
  price: number;
  description: string;
  image: string;
  id:string;
}

type idtype={
  id:string | any
}

const UpdateDish = () => {
  
  const {id}= useParams<idtype>();
  // console.log(id);

  
  const [img,setImg]= useState <File>()
  console.log();
  
  const [inputs,setInputs]= useState<props>({
    title:"",
    price:0,
    description:"",
    image:"",
    id:""
  })
  const [loading, setLoading] = useState(true)
  const [updateload, setUpdateLoad] = useState(false)

  const callsingle =async()=>{
      setLoading(true)
   let call = await dispatch(getsingleMenu(id))
   const data = call?.payload?.menu
   setInputs({
    title:data?.title,
    price:data?.price,
    description:data?.description,
    image:data?.image,
    id:id
   })
   setLoading(false)
  }
  

    const dispatch = useAppDispatch()
    useEffect(()=>{
    callsingle()
    
    },[])
    
    // console.log(inputs)
  const handleChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{
    // console.log(e.target.name,e.target.value);
    
    setInputs((prevstate)=>({
      ...prevstate,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit=async()=>{
    setUpdateLoad(true)
    let res
      if(img ){
        const formdata:any = new FormData();
        formdata.append("file",img)
        formdata.append("upload_preset",import.meta.env.VITE_REACT_APP_PRESET_KEY)
       res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUD_NAME}/image/upload`,formdata)
      }
    
      // .then(res=> (setCloudImg(res.data.secure_url),console.log(res)))
      // .catch(err=> console.log(err))
// console.log('reee',res)

if(res?.data?.secure_url){
  inputs.image = res?.data?.secure_url
}
    if(!inputs.title || inputs.title.trim() === "" || 
    !inputs.description || inputs.description.trim() === ""||
    !inputs.price 
    ){
      return toast("All Fields Required")
    }

      inputs.id = id;
       await dispatch(updateMenu(inputs))
      
       setUpdateLoad(false)
    
    
   
    // setTimeout(upp,3000)
  }




  return (
    <div className='mt-20 h-[83.8vh] flex justify-center items-center'>
        <div className='w-96 border-2 border-red-100 max-sm:w-[97%] bord h-[600px] shadow-2xl flex justify-center'>
          {loading ?  
          <div className='flex justify-center items-center'>
        <SpinnerCircular/>
      </div>  :
          <div className='relative p-4  w-full flex flex-col'>
          <input style={{display:"none"}} type="file" id='file' onChange={(e)=>setImg(((e.target as HTMLInputElement).files as FileList)[0])} />
          <label htmlFor="file">
            {
              img ? 
            
            <img className='absolute shadow-lg -top-10 left-[28%] w-40 h-40 m-2 rounded-[100%] object-cover' src={URL.createObjectURL(img)} alt="" />
              : 
              inputs.image ?
              <img className='absolute shadow-lg -top-10 left-[28%] w-40 h-40 m-2 rounded-[100%] object-cover' src={inputs.image} alt="" />
              :
              <div className='absolute flex justify-center items-center  -top-10 left-[28%] w-40 h-40 m-2 rounded-[100%] object-cover'>
                <BsImageFill   size={80} />
              </div>
              }
            </label>
            <div className='mt-36 flex flex-col justify-center items-center gap-6'>
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.title} name='title' placeholder='Enter Name Of The Dish' type="text" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.price} name='price' placeholder='Enter Price Of The Dish' type="number" />
            <textarea className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 h-44 resize-none' onChange={handleChange} value={inputs.description} name='description' placeholder='Enter Description Of The Dish' ></textarea>
            <button disabled={updateload ? true : false} onClick={()=>handleSubmit()} className='bg-red-200 p-2 border-2 border-red-100 hover:bg-red-300 transition-all duration-300 shadow-lg rounded-2xl '>{updateload ? <SpinnerCircular/> : "Update Dish" }</button>
            </div>
          </div>
            
           
        }
        </div>
    </div>
  )
}

export default UpdateDish