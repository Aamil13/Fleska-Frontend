import useMediaQuery from "../../hooks/useMediaQuery"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {FaBars} from "react-icons/fa"


type Props = {
    isTopOfPage: boolean;
}

const Navbar = ({isTopOfPage}: Props) => {
    
    const flexbetween = "flex items-center justify-between"
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)")
    const [isMenuToggled, setIsMenuToggled] = useState<Boolean>(false)
    const navbarBackground = isTopOfPage ? "" : "bg-red-100 drop-shadow";

    const navigate = useNavigate()
  return <nav >
    <div className={`${navbarBackground} ${flexbetween} fixed top-0 px-0 py-6 z-30 w-full`}>

    <div className={`${flexbetween} mx-auto w-5/6 `}>
        <div className={`${flexbetween} gap-16 w-full `}>
            {/* <img src={logo} alt="" /> */}
            <h1 onClick={()=>navigate("/")} className="text-2xl font-bold cursor-pointer">D.W.U</h1>

            {/* Right Side */}
            {
                isAboveMediumScreens ?
            
            
                <div className={`${flexbetween} gap-8 text-sm font-semibold `}>
            
                    <p onClick={()=>navigate("/new")} className="cursor-pointer">Create New Dish</p>
                </div>
             
           
            :
            (
                <button
                    className="bg-secondary-500 p-2 rounded-full"
                    onClick={()=> setIsMenuToggled(!isMenuToggled)}
                >
                    
                    <FaBars/>
                </button>
            )
            }
        </div>
    </div>
    </div>

            {/* Mobile menu//// */}
           {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-white drop-shadow-xl ">

                <div className="flex justify-end p-12 transition-all duration-500">
                    <button onClick={()=> setIsMenuToggled(!isMenuToggled)}>
                    
                    <FaBars/>
                    </button>
                    </div>
                    {/* Menu items //// */}
                    <div className="ml-[10%]  flex flex-col justify-center items-center text-2xl gap-10">
                    <p onClick={()=>navigate("/new")} className="cursor-pointer">Create New Dish</p>
                </div>
                
            </div>
           )}


  </nav>
    
  
}

export default Navbar