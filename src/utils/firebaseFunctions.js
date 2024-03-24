// saving new items in firebase 

import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
  } from "firebase/firestore";
  import { firestore } from "../firebase.config";
  
  // Saving new Item reveice data as parameter
  export const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, { // set doc function comes from firestore to set a newval
      merge: true, // if val is nothere then it create it if it is already there then update it doc method cretae new document firestore it comes from firebase config
    }); // insert new collection in fooditems // merging is optional if it true if i want add new item in featue we can add that
  };

  // for fetching uplaod from cloud and display on the screen getall food items
  export const getAllFoodItems = async () => { // creating asynchronous fun 
    const items = await getDocs(  //and getting all the details  from foodItems collection and getting all the details from get doc method
      query(collection(firestore, "foodItems"), orderBy("id", "desc")) // and ordering by it descending order beacause latest product add on the top
    );
  
    return items.docs.map((doc) => doc.data()); // returning each and every document one by one 
  }; 
  