import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Nav/Navbar'
import Footer from './components/Footer/Footer'
import NewDish from './pages/NewDish'

import {BrowserRouter ,Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import UpdateDish from './pages/UpdateDish'
import  { Toaster } from 'react-hot-toast';



function App() {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll=()=>{
      if(window.scrollY === 0){
        setIsTopOfPage(true)
      }
      else{
        setIsTopOfPage(false)
      }
    }
    

    window.addEventListener("scroll",handleScroll)
    return()=> window.removeEventListener("scroll",handleScroll)
    
  }, [])

  return (
    <>
    <BrowserRouter>
    <Navbar isTopOfPage={isTopOfPage}/>
    <div><Toaster/></div>
    <Routes>
      
      <Route index path='/' element={<Home/>}/>
      <Route index path='/new' element={<NewDish/>}/>
      <Route index path='/update/:id' element={<UpdateDish/>}/>
    </Routes>
      
      
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
