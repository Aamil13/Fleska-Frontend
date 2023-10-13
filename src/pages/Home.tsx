import {useEffect} from 'react'
import Hero from '../components/Hero/Hero'
import Menu from '../components/Menu/Menu'
import { useAppDispatch, useAppSelector } from '../redux/useTypedSelector'
import {getmenu} from "../redux/reducers/menuSlice"
import { SpinnerCircular } from 'spinners-react';


const Home = () => {
  const dispatch = useAppDispatch()
  const menu = useAppSelector((state)=> state.menu)
  // console.log(menu);
  
  useEffect(() => {
    dispatch(getmenu())
  
    
  }, [])
  
  

  return (
    <>
    <Hero/>
    {
      menu.loading ?
      <div className='flex justify-center items-center'>
        <SpinnerCircular/>
      </div>
      :
    
    <Menu/>
}
    </>
  )
}

export default Home