import { useContext, useEffect, useState } from "react";
import AddToCartButton from "../../components/AddToCartButton";
import { useParams } from "react-router";
import { BooksContext } from "../../contexts/BooksProvider";
import WishlistButton from "../../components/WishlistButton";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

// Componente solamente para mostrar la imagen del libro
const BookThumbnail = ({ imageSrc }) => (
    <img
        src={imageSrc}
        alt="Libro"
        className="w-full h-full object-cover"
    />
);

const ProductOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    document.title = "Product Overview | The Book Flipante";
    setTimeout(() => {
      setShowLoader(false);
    }, 100);
  }, []);
  const {
    booksState: { booksData },fetchBooksByCategory,fetchBooksByAuthor
  } = useContext(BooksContext);
  const product = booksData.find((ele) => ele.slug === id) ?? {};

  if (showLoader) return <Loader />;


  const handleCategoryClick = (categoryName) => {
    fetchBooksByCategory(categoryName);
    navigate(`/products/${categoryName}`);
  };
  const handleAuthorClick = (categoryName) => {
    fetchBooksByAuthor(categoryName);
    navigate(`/products/${categoryName}`);
  };

  const relatedBooks = booksData.filter(book => book.slug !== product.slug);

  return (
    <section className="overflow-hidden text-gray-100">
      {product && (
        <div className="container px-5 pt-32 pb-4 mx-auto sm:py-24">
          <div className="flex flex-wrap items-center mx-auto lg:max-w-5xl">
            <img
              alt={product.title}
              className="object-cover object-center w-full rounded h-1/2 lg:w-1/4"
              src={product.coverImage}
            />

            <div className="w-full mt-6 lg:w-2/3 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="relative text-sm tracking-widest text-gray-500 title-font">
                {product.creator}
                <div className="absolute right-0 sm:bottom-4 sm:relative bottom-24">
                  <WishlistButton product={product} />
                </div>
              </h2>
              <h1 className="mb-1 text-3xl font-medium text-gray-100 title-font">
                {product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <span className="text-xs mr-3 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100" onClick={()=>handleCategoryClick(product.categories)}>
                    {product.categories}
                  </span>
                  |
                  <span className="ml-3 text-gray-300" onClick={()=>handleAuthorClick(product.author)}>
                    {product.author}
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>

              <div className="flex items-baseline my-4">
                <div className="flex ml-auto">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Libros Relacionados */}
          <div className="related-books-grid mt-8">
            <h2 className="my-2 text-sm tracking-widest text-gray-500 title-font">Libros Relacionados</h2>
            <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {relatedBooks.map(book => (
                  <div key={book.slug} className="flex items-center justify-center h-60 overflow-hidden bg-gray-200"
                       onClick={()=>navigate(`/product-overview/${book.slug}`)}
                  >
                    <BookThumbnail imageSrc={book.coverImage} />
                  </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap mx-auto border-t border-gray-700 lg:max-w-5xl">
            <h2 className="my-2 text-sm tracking-widest text-gray-500 title-font">
              Recent Reviews
            </h2>
            {product.reviews &&
              product.reviews.length > 0 &&
              product.reviews.map(
                ({ username, date, rating, comment }, index) => (
                  <div
                    key={index}
                    className="flex content-center py-4 border-b border-gray-700"
                  >
                    <div className="grid grid-cols-4 grid-rows-1 gap-4">
                      <div className="flex flex-wrap items-center col-span-2">
                        <p className="w-40 truncate sm:w-60">{username}</p>
                        <div className="flex flex-col items-start justify-between w-full space-y-2 sm:flex-row">
                          <p className="text-xs text-gray-500">{date} </p>
                          <span className="text-xs mr-3 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100">
                            {rating}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-md">{comment}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductOverview;
