import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../contexts/BooksProvider";

import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/loader/Loader";
import { Transition } from "@headlessui/react";

const ITEMS_PER_PAGE = 20; // Define cuántos productos se deben mostrar por página

const Products = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual

  const { booksState, allSortsAndFilters } = useContext(BooksContext);

  useEffect(() => {
    document.title = "Products | The Book Shelf";
    const loader = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(loader);
  }, []);

  const { booksData } = booksState;

  // Calcular los productos que se deben mostrar en la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const productsToShow = allSortsAndFilters().slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(allSortsAndFilters().length / ITEMS_PER_PAGE);

  // Funciones para cambiar de página
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (showLoader) return <Loader />;
  return (
    <>
      <Transition
        appear={true}
        enter="transition-all ease-in-out duration-500 delay-[100ms]"
        enterFrom="opacity-0 translate-y-6"
        show={true}
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {booksData && booksData.length > 0 && (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {productsToShow.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Transition>
      {booksData && allSortsAndFilters().length === 0 && (
        <div className="flex justify-center my-20 sm:my-32">
          <p className="text-2xl text-center text-gray-100 sm:text-4xl">
            Oops! Looks like our Book Shelf is empty. 😟
          </p>
        </div>
      )}

      {/* Controles de paginación */}
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-lg text-gray-200">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Products;