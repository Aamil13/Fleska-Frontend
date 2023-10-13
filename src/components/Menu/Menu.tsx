
import MenuItem from './MenuItem'
import {motion} from "framer-motion"
import { useAppSelector } from '../../redux/useTypedSelector';
import { useNavigate } from 'react-router-dom';

const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };




const Menu = () => {
  const {menu} = useAppSelector((state)=> state.menu)
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center '>
      <div className='w-11/12 px-10 flex justify-between items-center'>
      <p className='text-2xl font-semibold'>Menu</p>
      <button onClick={()=>navigate("/new")} className='bg-red-100 p-2 rounded-2xl shadow-xl hover:bg-red-300 transition-all duration-200'>Create New</button>
      </div>
       
        <motion.div className='h-full w-full p-10 flex justify-center items-start flex-wrap gap-5'
        initial="hidden"
        whileInView="visible"
        viewport={{once:true,amount:0.5}}
        variants={container}
        > 
        {
         menu?.menu?.length ?
          menu?.menu?.map((item,index)=>(
            <MenuItem key={index} item={item} />
          ))
            
          :
          <p>No Data</p>
        }
          
        </motion.div>
    </div>
  )
}

export default Menu