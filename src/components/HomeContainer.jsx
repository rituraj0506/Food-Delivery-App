import React from 'react'
import Delivery from "./img/delivery.png";
import HeroBg from "./img/heroBg.png"
import { heroData } from '../utils/data';


const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full " id="home" >
    <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-6 ">
      <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
        <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
        <div className='w-8 h-8 rounded-full overflow-hidden drop-shadow-xl'>
          <img src={Delivery} className="w-full h-full object-contain bg-white" alt="delivery.png" />
        </div>
      </div>

      <p className="text-[2.5rem] lg:text-[4.5rem] font-bold letter tracking-wide text-headingColor">
        The Fastest Delivery in {""}<span className='text-orange-600 text-[4.5rem] lg:text-[4 rem] '>your city</span>
      </p>
      <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim ad minim veniam, Duis aute irure dolor in reprehenderit
      </p>


      <button type="button" className="bg-gradient-to-br  from-orange-400 to-orange-500 
      md:w-auto w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">Order Now</button>
    </div>

    
       <div className="py-2 flex-1 flex items-center relative flex-wrap ">
        <img
          src={HeroBg}
          className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
          alt="hero-bg"
        />

       <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-37  py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((n) => ( 
              <div
                key={n.id}
                className="  lg:w-190 min-w-[140px] p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg gap-2"
              >
                <img
                  src={n.imageSrc} 
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                  alt="I1"  
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-blue-600">$</span> {n.price}
                </p>
                </div>
            ))}
        </div>
      
     </div>
  </section>
  )
}

export default HomeContainer;
