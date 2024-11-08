import { createContext, useReducer, useState, useEffect } from "react";
import books from "./reducers/Books";
import filters from "./reducers/Filters";
import {filtersInitialState} from "./initialStates/FilterInitialState";
import {booksInitialState} from "./initialStates/BooksInitialState";
import {BOOKS_ACTIONS, FILTERS_ACTION} from "../constants/dispatchTypes";
export const BooksContext = createContext();


export const urlserver = "https://api.andorworld.com:3030";

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
    fetchAuthorList();
    fetchSeries();
    fetchStats();
  }, []);

  useEffect(() => {
    //if (searchTerm.length>2) fetchBooksByOpenSearch(searchTerm);
  }, [searchTerm]);

  const fetchStats = async (url = urlserver + "/v1/stats") => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_STATS, payload: data});
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  const fetchSeries = async (url = urlserver + "/v1/series") => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_SERIES, payload: data});
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }; const fetchCategories = async (url = urlserver + "/v1/categorias") => {
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
  const fetchProducts = async (url = urlserver + "/v1/ebooks") => {
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
      const response = await fetch(`${urlserver}/v1/ebooks?author=${encodeURIComponent(author)}`);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      filtersDispatch({ type: FILTERS_ACTION.UPDATE_BOOK_QUERY, payload: `author=${author}` });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchBooksBySeries= async (author) => {
    setLoading(true);
    try {
      const response = await fetch(`${urlserver}/v1/ebooks?series=${encodeURIComponent(author)}`);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      filtersDispatch({ type: FILTERS_ACTION.UPDATE_BOOK_QUERY, payload: `series=${author}` });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchAuthorList= async () => {
    setLoading(true);
    try {
      const response = await fetch(`${urlserver}/v1/authors`);
      const { data } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_AUTHORS, payload: data });
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchBooksByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`${urlserver}/v1/ebooks?categories=${encodeURIComponent(category)}`);
      const { data, paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      filtersDispatch({ type: FILTERS_ACTION.UPDATE_BOOK_QUERY, payload: `categories=${category}` });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchBooksByOpenSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`${urlserver}/v1/ebooks?search=${encodeURIComponent(searchTerm)}`);
      const { data } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA_SEARCH, payload: data });
      filtersDispatch({ type: FILTERS_ACTION.UPDATE_BOOK_QUERY, payload: `search=${searchTerm}` });
    } catch (error) {
      console.error("Error fetching data by author:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchBooksByAuthorApply = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${urlserver}/v1/ebooks?search=${encodeURIComponent(searchTerm)}`);
      const { data,paging } = await response.json();
      booksDispatch({ type: BOOKS_ACTIONS.SAVE_BOOKS_DATA, payload: data });
      filtersDispatch({ type: FILTERS_ACTION.UPDATE_BOOK_QUERY, payload: `search=${searchTerm}` });
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
  const handleBookQueryFilter = (query) => {
    filtersDispatch({ type: FILTERS_ACTION.UPDATE_BOOK_QUERY, payload: query });
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
        fetchBooksByAuthor,
        fetchAuthorList,
        fetchBooksBySeries,
        fetchStats
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
