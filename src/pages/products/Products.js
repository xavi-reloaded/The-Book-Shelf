import { useContext, useEffect } from "react";
import { BooksContext } from "../../contexts/BooksProvider";
import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/loader/Loader";
import { Transition } from "@headlessui/react";
import ProductsPagination from "./ProductsPagination";
import {isProductInWishlist} from "../../services/wishlist-service";

const Products = () => {
  const {
    booksState: { booksData },
    paging,
    fetchProducts,
    loading,
  } = useContext(BooksContext);

  useEffect(() => {
    document.title = "Products | The Book Flipante";
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
            {booksData.map((product) => {
                const fromWishlist = isProductInWishlist(product.uid);
                return <ProductCard key={product.slug} product={product} fromWishlist={fromWishlist}/>
            })}
          </div>
        )}
      </Transition>
      {booksData && booksData.length === 0 && (
        <div className="flex justify-center my-20 sm:my-32">
          <p className="text-2xl text-center text-gray-100 sm:text-4xl">
            Oops! Burro quien lo lea 😟
          </p>
        </div>
      )}

      {/* Pagination controls */}
      <ProductsPagination fetchProducts={fetchProducts} paging={paging} />
    </>
  );
};

export default Products;
