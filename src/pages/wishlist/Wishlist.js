import { useContext, useEffect } from "react";
import { BooksContext } from "../../contexts/BooksProvider";
import ProductCard from "../../components/products/ProductCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const {
    booksState: { wishlist },} = useContext(BooksContext);
  const wishListedItems = wishlist;

  useEffect(()=>{
    document.title="Wishlist | The Book Flipante"
  },[])
  return (
    <section>
      <h1
        className={`${
          wishListedItems.length > 0 ? "mb-10" : ""
        } mt-40 sm:mt-32 font-bold tracking-tight text-center text-gray-100 md:text-xl lg:text-4xl`}
      >
        Wishlist
      </h1>
      {wishListedItems && wishListedItems.length > 0 && (
        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {wishListedItems.map((product) => (
              <ProductCard key={product.uid} product={product} fromWishlist={true}/>
            ))}
          </div>
        </section>
      )}

      {wishListedItems && wishListedItems.length === 0 && (
        <div className="grid h-60 place-items-center">
          <div>
            <p className="my-4 text-2xl font-semibold tracking-wide text-gray-100">
              La Wishlist está vacia.
            </p>
            <Link
              to="/products"
              className="w-full px-5 block py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
            >
              ENCUENTRA TU LIBRO
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
