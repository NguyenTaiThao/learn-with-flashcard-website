import { ADD_CART, REMOVE_CART_ITEM, CLEAR_CART } from "../actions/type";
import Cookie from "js-cookie"

const initialState = {
    data: {},
    isLoading: true,
    error: null
};

export default function (state = initialState, action) {
    let cart = Cookie.get("CART")
    if (!cart) {
        Cookie.set("CART", [])
    }else{
        
    }
    switch (action.type) {
        case ADD_CART: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }
        case REMOVE_CART_ITEM: {
            const newCart = state.data.filter((item) => item != action.payload)
            return {
                ...state,
                data: { ...newCart }
            };
        }
        case CLEAR_CART: {
            return {
                ...state,
                data: [],
            };
        }
        default:
            return state;
    }
}
