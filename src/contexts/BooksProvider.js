import { createContext, useReducer, useState, useEffect } from "react";
import { books, filters } from "./reducers"; // Assuming you have reducers to manage states
import { getProducts } from "./api"; // Assumes a getProducts function that can fetch data

export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [filtersState, filtersDispatch] = useReducer(filters, filtersInitialState);
  const [booksState, booksDispatch] = useReducer(books, booksInitialState);
  const [paging, setPaging] = useState({ next: null, previous: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (url = "http://localhost:3000/v1/ebooks") => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, paging } = await response.json();
      booksDispatch({ type: "SAVE_BOOKS_DATA", payload: data });
      setPaging(paging);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        filtersState,
        filtersDispatch,
        booksState,
        booksDispatch,
        paging,
        fetchProducts, // Expose function to update products with pagination
        loading,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;