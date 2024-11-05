import { createContext, useReducer, useState, useEffect } from "react";
import books from "./reducers/Books";
import filters from "./reducers/Filters";
import {filtersInitialState} from "./initialStates/FilterInitialState";
import {booksInitialState} from "./initialStates/BooksInitialState";
import {BOOKS_ACTIONS, FILTERS_ACTION} from "../constants/dispatchTypes";

export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [filtersState, filtersDispatch] = useReducer(filters, filtersInitialState);
  const [booksState, booksDispatch] = useReducer(books, booksInitialState);
  const [paging, setPaging] = useState({ next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { booksData, booksSearchData } = booksState;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  useEffect(() => {
    if (searchTerm.length>2) fetchBooksByOpenSearch(searchTerm);
  }, [searchTerm]);

  const fetchCategories = async (url = "http://localhost:3000/v1/categorias") => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_CATEGORY, payload: data});
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
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

  const fetchBooksByAuthor= async (author) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/v1/ebooks?author=${encodeURIComponent(author)}`);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchBooksByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/v1/ebooks?categories=${encodeURIComponent(category)}`);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchBooksByOpenSearch = async (author) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/v1/ebooks?search=${encodeURIComponent(author)}`);
      const { data } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA_SEARCH, payload: data });
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchBooksByAuthorApply = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/v1/ebooks?search=${encodeURIComponent(searchTerm)}`);
      const { data,paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchProductsHandler = () => {
    return searchTerm.length < 4
        ? booksData.filter((books) =>books.title.toLowerCase().includes(searchTerm.toLowerCase()))
        : booksSearchData
  }

  const removeWishlistHandler = () => []
  const handleWishlistToggle = () => []
  const addToCartHandler = () => []
  const removeFromCartHandler = () => []
  const moveToWishlistHandler = () => []
  const cartItemQuantityHandler = () => []
  const changeCategoryHandler = () => []
  const allSortsAndFilters = () => []
  const handleFilterReset = () => {
    filtersDispatch({ type: FILTERS_ACTION.RESET, payload: "" });
    fetchProducts();
  }
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
        setSearchTerm,
        fetchBooksByAuthorApply,
        fetchBooksByCategory,
        fetchBooksByAuthor
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
