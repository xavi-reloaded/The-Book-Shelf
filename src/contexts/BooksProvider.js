import { createContext, useReducer, useState, useEffect } from "react";
import books from "./reducers/Books";
import filters from "./reducers/Filters";
import {filtersInitialState} from "./initialStates/FilterInitialState";
import {booksInitialState} from "./initialStates/BooksInitialState";
import {BOOKS_ACTIONS} from "../constants/dispatchTypes";

export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [filtersState, filtersDispatch] = useReducer(filters, filtersInitialState);
  const [booksState, booksDispatch] = useReducer(books, booksInitialState);
  const [paging, setPaging] = useState({ next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { booksData } = booksState;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (url = "http://localhost:3000/v1/ebooks") => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchProductsHandler = () =>
      searchTerm === ""
          ? booksData
          : booksData.filter((books) =>
              books.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
  const removeWishlistHandler = () => []
  const handleWishlistToggle = () => []
  const addToCartHandler = () => []
  const removeFromCartHandler = () => []
  const moveToWishlistHandler = () => []
  const cartItemQuantityHandler = () => []
  const changeCategoryHandler = () => []
  const allSortsAndFilters = () => []
  const handleFilterReset = () => []
  const changePriceSort = () => []
  const saveOrderHistory = () => []

  return (
    <BooksContext.Provider
      value={{
        filtersState,
        filtersDispatch,
        booksState,
        booksDispatch,
        paging,
        fetchProducts, // Expose function to update products with pagination
          removeWishlistHandler,
          handleWishlistToggle,
          addToCartHandler,
          removeFromCartHandler,
          moveToWishlistHandler,
          cartItemQuantityHandler,
          searchProductsHandler,
          changeCategoryHandler,
          allSortsAndFilters,
          handleFilterReset,
          changePriceSort,
          saveOrderHistory,
        loading,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
