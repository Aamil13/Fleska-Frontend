import { motion } from 'framer-motion'
import foodplatehero from "../../assets/photo-1514326640560-7d063ef2aed5.jpeg"
import style from "./hero.module.css"



const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };
  const childVariant = {
    hidden: { opacity: 0, scale: 0.1,y:90 },
    visible: { opacity: 1, scale: 1,y:0 },
  };

const Hero = () => {
  return (
    <div className='max-sm:w-full overflow-hidden my-20 max-sm:my-5 text-red-400  h-[82vh] flex justify-between items-start pt-32'>
        <motion.div className=' flex flex-col gap-6 justify-start  text-6xl max-sm:w-full   font-bold p-6'
        initial="hidden"

        whileInView="visible"
        viewport={{once:true,amount:0.5}}
        variants={container}
        >
            <motion.p  variants={childVariant} className='text-black max-sm:text-5xl'>Dine With US</motion.p>
            <motion.p variants={childVariant} className='max-sm:text-center'>Your Destination to Food</motion.p>
            <motion.p variants={childVariant} className='max-sm:text-center'>Of Quality</motion.p>
        </motion.div>
        <motion.div className='w-1/2 relative over'
          initial="hidden"
          whileInView="visible"
          viewport={{once:true,amount:0.5}}
          transition={{duration:1}}
          variants={{
            hidden: {opacity:0, x:500},
            visible: {opacity:1,x:0}
          }}
        >
          <img className={`absolute -top-52 -right-80 rounded-full p-20  ${style.spin}`} src={foodplatehero} alt="" />
        </motion.div>
    </div>
  )
}

export default Hero