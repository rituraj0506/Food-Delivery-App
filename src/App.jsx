import React from 'react';
import {CreateContainer, Header, HomeContainer, MainContainer, MenuContainer } from './components';
import { Link, Route,Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { useStateValue } from "./context/StateProvider";
import { useEffect } from 'react';
import { actionType } from "./context/reducer";
import AboutUs from './components/About';

const App = () => {
  const [{} ,dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <AnimatePresence mode="wait">
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header/>
  <main className=" mt-16 px-4  md:mt-20 md:px-16 py-4  w-full">
  <Routes>
 <Route path="/*" element={<MainContainer/>}/>
 <Route path="/createItem" element={<CreateContainer/>}/>
 <Route path="/MenuContainer" element={<MenuContainer/>}/>
 {/* <Route path="/" element={<HomeContainer/>}/> */}
 <Route path="/about" element={<AboutUs/>}/>
  </Routes>
      </main>
    </div>
    </AnimatePresence>
    
  )
};

export default App;


