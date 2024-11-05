import { useContext, useEffect } from "react";
import { BooksContext } from "../../contexts/BooksProvider";
import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/loader/Loader";
import { Transition } from "@headlessui/react";

const Products = () => {
  const {
    booksState: { booksData },
    paging,
    fetchProducts,
    loading,
  } = useContext(BooksContext);

  useEffect(() => {
    document.title = "Products | The Book Shelf";
  }, []);


  if (loading) return <Loader />;

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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {booksData.map((product) => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
        )}
      </Transition>
      {booksData && booksData.length === 0 && (
        <div className="flex justify-center my-20 sm:my-32">
          <p className="text-2xl text-center text-gray-100 sm:text-4xl">
            Oops! Más vacio que tu fiesta de cumpleaños 😟
          </p>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={() => paging.previous && fetchProducts(`http://localhost:3000${paging.previous}`)}
          disabled={!paging.previous}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-lg text-gray-200">
          Página actual basada en servidor
        </span>
        <button
          onClick={() => paging.next && fetchProducts(`http://localhost:3000${paging.next}`)}
          disabled={!paging.next}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Products;
