
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft,MdChevronRight } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useStateValue } from "../context/StateProvider";
import { useState,useEffect } from 'react';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';
import Footer from './Footer';



const MainContainer = () => {
  const [{ foodItems,cartShow},dispatch] = useStateValue(); // use dynamic data from food items and filter it 
  const [directionChange, setDirectionChange] = useState(false); // for direction left or reft direction use this 
  const [scrollValue, setScrollValue] = useState(0); // for scrolling left and right  for fruit items

  useEffect(() => { }, [scrollValue,cartShow]);
  return (
    
   <div ClassName ="w-full h-auto flex flex-col items-center justify-center">
    <HomeContainer/>
    <section className=" w-full my-6">
    <div className="w-full items-center justify-between">
    <p className="text-2xl font-semibold captalize text-headingColor relative
     before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 ease-in-out duration-100">
      Our Fresh & Healthy fruits
    </p>

   <div className="hidden md:flex items-center justify-end gap-3">
    <motion.div  whileTap={{scale:1}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 
     cursor-pointer  ease-in-out hover:shadow-lg flex items-center justify-center"
     onClick={() => {
                if (directionChange) {
                  setDirectionChange(false);
                  setScrollValue(-300);
                } else {
                  setScrollValue(scrollValue - (300));
                }
              }}
     >
         <MdChevronLeft className="text-lg text-white"/>
    </motion.div>
    
    
    <motion.div whileTap={{scale:1}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500  
    cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
    onClick={() => {
                if (!directionChange) {
                  setDirectionChange(true);
                  setScrollValue(0 + 300);
                } else {
                  setScrollValue(scrollValue + (300));
                }
              }}
    >
    <MdChevronRight className="text-lg text-white"/>
    </motion.div>

   
   </div>
    </div>
    <RowContainer 
        scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")} // use dynamic data from food items and filter it and use it in row container
    />
    </section>

    <MenuContainer/>
    { cartShow &&(
    <CartContainer/>
    )
    }
    <Footer/>
  
   </div>
  )
}

export default MainContainer;

