import {
  GET_USER,
  GET_FOLDER,
  ADD_CART,
  REMOVE_CART_ITEM,
  CLEAR_CART,
} from "./type";

export const getUserInfo = (payload) => ({
  type: GET_USER,
  payload: payload,
});

export const getFolders = (payload) => ({
  type: GET_FOLDER,
  payload: payload,
});

export const addCart = (payload) => ({
  type: ADD_CART,
  payload: payload,
});

export const removeCartItem = (payload) => ({
  type: REMOVE_CART_ITEM,
  payload: payload,
});

export const clearCart = (payload) => ({
  type: CLEAR_CART,
  payload: payload,
});