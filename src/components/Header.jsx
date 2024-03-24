import Logo from './img/logo.png';
import Avatar from './img/avatar.png'
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
//for  google authentication sign in with pop up we import below line 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import  { useState } from "react";



const Header = () => {
  const firebaseAuth = getAuth(app);// gets authrentication detail  app from firebase config
  const provider = new GoogleAuthProvider(); // for  authenticate user 
  const [ {user,cartShow,cartItems} , dispatch] = useStateValue();
  const [isMenu, setIsMenu] =useState(false); // if it is admin email then only show menu add item

  const login = async () => {
    if (!user) { // its all activity done is there is no user 
            // from user obj we need provider data from console destructure user obj
      const { user: {providerData }, } = await signInWithPopup(firebaseAuth, provider);// for get promise wait until receving (await use) for singn in with pop up provid frovide firebaseauth and provider
      // dispatch provide data from data layer for this use custom hook dispatch usestateval() that i export from state provider
      dispatch({
        type: actionType.SET_USER,// type is set usr in reducer check then update the val
        user: providerData[0], // provide data to user state from provider data
      });
      localStorage.setItem("user", JSON.stringify(providerData[0])); // if refresh page user data is set null becoz intial state is null for this save it in loacal storage
    }else {
      setIsMenu(!isMenu); // if not so menu for add item and logout
    }
  };

  const logout =()=>{ 
    setIsMenu(false)
    localStorage.clear() // when user click log out clear all state

    dispatch({
      type:actionType.SET_USER, 
      user:null, // and set user to null
    });
  }


  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop and tabl*/}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 ml-auto"
          >
            <Link
              to="/Home"
              className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/MenuContainer"
              className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out"
            >
              Menu
            </Link>
            <Link
              to="/About"
              className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out"
            >
              About us
            </Link>
            {/* <li className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out" >Services</li> */}
          </motion.ul>

          <div
            ClassName="relative justify-center flex items-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-text-color text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar} // if that is user display the photo url here other wise avatar
              className="w-10 min-w-[40px] h-10  min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="user-profile "
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
              >
                {user && user.email === "riturajkumar7256@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      NewItem <MdAdd />{" "}
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex tems-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*Mob*/}
      <div className="flex md:hidden w-full h-full p-4 items-center justify-between">
        <div
          ClassName="relative justify-center flex items-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-text-color text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10  min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="user-profile "
            onClick={login}
          />

          {/* only admin add the items */}
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
            >
              {user &&
                user.email === "riturajkumar7256@gmail.com" && ( // if user and user email is my email then i add new item on this so add item comes only it is my email
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      NewItem <MdAdd />{" "}
                    </p>
                  </Link>
                )}
              <ul className="flex flex-col ">
                <li
                  className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="text-base text-text-color cursor-pointer hover:text-headingColor Transition-all duration-100 ease-in-out px-4 py-2 hover:bg-slate-100"
                  onClick={() => setIsMenu(false)}
                >
                  Services
                </li>
              </ul>{" "}
              onClick={() => setIsMenu(false)}
              <p
                className="px-1 py-1 rounded-md shadow-md flex items-center gap-3 cursor-pointer hover:bg-slate-400  m-2 p-2 transition-all duration-100 ease-in-out text-textColor
    text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;



