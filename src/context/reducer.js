export const actionType={
    SET_USER :"SET_USER",// if i want to update user information then i call action type and then i will dispatch updated value to action type
    SET_FOOD_ITEMS:"SET_FOOD_ITEMS",
    SET_CART_SHOW:"SET_CART_SHOW",
    SET_CARTITEMS: "SET_CARTITEMS",
};

// we actually creating datalayer top of component as we reuire for child or other we use it

 const reducer=(state,action) =>{
    switch(action.type)
    {
        case actionType.SET_USER:
            return{
                ...state,
                user:action.user,// update user information through user action
            };

            case actionType.SET_FOOD_ITEMS:
                return{
                    ...state,
                    foodItems:action.foodItems,
                };
             

                case actionType.SET_CART_SHOW:
                    return{
                        ...state,// spread operator
                        cartShow:action.cartShow,
                    };
     
            
                    case actionType.SET_CARTITEMS:
                        return {
                          ...state,
                          cartItems: action.cartItems,
                        };
                  
            default:
            return state;
    }
 };

 export default reducer;
