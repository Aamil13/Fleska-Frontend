
import {motion} from "framer-motion"
import {useNavigate} from "react-router-dom"
import {AiFillDelete} from "react-icons/ai"
import { useAppDispatch } from '../../redux/useTypedSelector'
import { DeleteSingleMenu, getmenu } from '../../redux/reducers/menuSlice'

const childVariant = {
    hidden: { opacity: 0, scale: 0.9, },
    visible: { opacity: 1, scale: 1, },
  };

  type itemtype={
    title: string;
    description: string;
    price: Number;
    image: string;
    _id:string
  }
type Props = {

  item:itemtype;
  key?:number
}

const MenuItem = ({item}: Props) => {
// console.log(typeof(item._id));

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const deleteMenu=async()=>{
    await dispatch(DeleteSingleMenu({id:item?._id}))
    await dispatch(getmenu())
  }

  return (
    <motion.div  className='flex w-[400px] justify-between items-center gap-10 border-2 border-red-100 shadow-md p-2 hover:scale-110  transition-all duration-300 group cursor-pointer'
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={childVariant}>
        <div  onClick={()=>navigate(`/update/${item?._id}`)}  className='flex flex-col gap-1 justify-start items-start'> 
            <p className='text-3xl font-semibold'>{item?.title}</p>
            <p className='text-sm font-medium text-red-500 ms-2'>${item?.price.toString()}</p>
            <p className='max-w-[170px] text-xs ms-2'>{item?.description}</p>
        </div>
        {/* style={{backgroundImage:`url(${"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kkrGlR7YmdY__UKZryZp2QHaFp%26pid%3DApi&f=1&ipt=b06275f235ed266562db9b3552e39202b811b9fcdd1043efcd531e1a98ddd474&ipo=images"})`}} */}
        <div className='relative group-hover:scale-110 transition-all duration-500 w-36 h-36  rounded-[100%] '>
          <div onClick={()=>deleteMenu()} className='absolute right-0 '>
            <AiFillDelete color="#FF9999" size={30}/>
          </div>
          <img  onClick={()=>navigate(`/update/${item?._id}`)} className='w-36 h-36 rounded-[100%] object-cover' src={`${item?.image ? item?.image : "https://cdn.pixabay.com/photo/2017/06/02/19/12/broken-link-2367103_1280.png"}`} alt="" />
        </div>
    </motion.div>
  )
}

export default MenuItem