import  axios  from 'axios';
import ENDPOINTS from '../constants/endpoints';


export const getProducts=()=>axios.get(ENDPOINTS.PRODUCTS)