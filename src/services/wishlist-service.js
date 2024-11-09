import axios from "axios";
import ENDPOINTS from "../constants/endpoints";
import { DEFAULT_HEADERS } from "./auth-service";

export const getWishlist = () => {
    debugger
    //axios.get(ENDPOINTS.WISHLIST, DEFAULT_HEADERS());
}

export const addToWishlist = (product) =>{
    debugger
    // axios.post(ENDPOINTS.WISHLIST, product, DEFAULT_HEADERS());
}


export const addToWishlistInBulk = (product) => {
    debugger
  //axios.post(ENDPOINTS.WISHLIST_BULK, product, DEFAULT_HEADERS());
}

export const removeFromWishlist = (productId) => {
    debugger
  //axios.delete(`${ENDPOINTS.WISHLIST}/${productId}`, DEFAULT_HEADERS());
}
