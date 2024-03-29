import React from 'react';
import { useState } from "react";
import {  motion } from "framer-motion";
import {MdFastfood, MdCloudUpload,MdDelete,MdFoodBank,MdAttachMoney,} from "react-icons/md";
import {deleteObject,getDownloadURL,ref,uploadBytesResumable,} from "firebase/storage";
import { storage } from "../firebase.config";
import { categories } from '../utils/data';
import Loader from './Loader';
import { getAllFoodItems,saveItem } from "../utils/firebaseFunctions";
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';


const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");// for alert message
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // use load the image animation
  const [imageAsset, setImageAsset] = useState(null);// image downloading url are uploaded here in 
  const [{} ,dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0]; // get image files 0th index becoz we up;od single image only
    console.log(imageFile); // get complete image information through this 
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`); // already added storage refrence in firebase config so use this and where upload in the images folder in firebase storage date now added for upload every image in unique way with name
    const uploadTask = uploadBytesResumable(storageRef, imageFile); //it is fun from firebase storage for uploa i pass storageref and image file

    uploadTask.on(
      "state_changed", (snapshot) =>{
        const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100; // to cal how many bytes its take uplaoad but it is not use here
      },
      (error) => {  // if any error is given for uplaoding
        console.log(error);
        setFields(true);
        setMsg("Error occurred while uploading, please try again");
        setAlertStatus("danger"); // if any erroe say alert
        setTimeout(() => {
          setFields(false); // remove error after 4 sec automatically
          setIsLoading(false);
        }, 4000);
      },
      () => { // if no error 
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL); // then set imagesasset  set field true and image uploded successfully
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded to database successfully.");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };


  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef) // delete obj mthd from the firebase after delete set promise from cloud image are deleted
      .then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Image deletion successful"); /// after that given delete alert 
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setFields(true);
        setMsg("Error occurred while deleting file. Please try again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      });
  };

// inside save detail fun upload entire information and saving to the firebase 
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if ((!title && !calories && !price && !imageAsset, !category)) { // if anyone is not their
        setFields(true);
        setMsg("Required fields (*) can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else { // this is our dataobject for save this item in firebasefunction.js
        const data = { // if very thing is fine create datastructure 
          id: `${Date.now()}`, // for maintain unique id 
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };

        saveItem(data) //Calls the saveItem function from firebaseFunctions.js  This function sends the data to Firestore, where it's stored in the "foodItems" collection with a unique ID generated by Date.now().

        setIsLoading(false);
        setFields(true);
        setMsg("Data uploading completed successfully");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);

       
      }
    } catch (error) {
      console.log(error);
    }

    fetchData();
  };


  
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("Select Category");
  };


  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };  // upload any new data add to context provider

  return (

    <div className="flex flex-col items-center justify-center">
    <div className="w-[80%] flex flex-col items-center justify-center p-2 border gap-4 border-gray-300 rounded-lg">
   
    {fields && (
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`w-full p-2 rounded-lg text-center ${ //for button order if something wrong then show
                alertStatus === "danger"
                  ? "bg-red-400 text-red-800"
                  : "bg-emerald-400 text-emerald-800"
              }`}
            >
            {msg}
            </motion.p>
          )}
      
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFastfood className="text-gray-700 text-xl" />
            <input
              type="text" // create form for text
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give me a title..."
              className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-gray-500"
            />
          </div>

          <div className="w-full">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            >
              <option value="other" className="bg-white">
                Select Category 
              </option> 
              {categories.map((item) => ( // create dropdown and map every item 
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-black"
                  value={item.urlParamName} // filter according to parmater name
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
       {/* accept type is anything thats we use image/* */}
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-300 cursor-pointer">
            {isLoading ? ( 
              <Loader /> // for loading anything we design loader
            ) : (
              <>  
                {!imageAsset ? ( // for uploading image into firebase gives me the url
                                 // for cloud upload icon MdCloudUpload
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <MdCloudUpload className="text-gray-500 group-hover:text-gray-700 text-3xl" /> 
                      <p className="text-gray-500 group-hover:text-gray-700">
                        Click here to upload 
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*" // accept any ctegeory image
                      onChange={uploadImage} 
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-full"> 
                    <img
                      src={imageAsset} // here display the image after uploading 
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl
                  cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        
        {/* for upload calories */}

          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdFoodBank className="text-gray-700 text-2xl" />
              <input
                type="text"
                required
                placeholder="Give me a calories..."
                className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-gray-500"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>


           {/* for upload price */}

            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdAttachMoney className="text-gray-700 text-2xl" />
              <input
                type="text"
                required
                placeholder="Add the price..."
                className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-gray-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

    {/* for saving button */}

    <div className="flex items-center w-full">
            <button
              type="button"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
              onClick={saveDetails}
            >
              Save
            </button>
          </div>


    </div>
    </div>
  )
}

export default CreateContainer;
