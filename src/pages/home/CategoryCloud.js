import React, { useContext } from "react";
import { BooksContext } from "../../contexts/BooksProvider";
import { useNavigate } from "react-router-dom";
const CategoryCloud = () => {
    const { booksState: { categories },fetchBooksByCategory } = useContext(BooksContext);
    const navigate = useNavigate();
    const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];
    const colors = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-500", "text-purple-500", "text-pink-500"];

    const handleCategoryClick = (categoryName) => {
        fetchBooksByCategory(categoryName);
        navigate(`/products/${categoryName}`);
    };

    return (
        <div className="flex flex-wrap justify-center m-4 space-x-2">
            {categories.map((category) => {
                const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                return (
                    <span
                        key={category.name}
                        className={`${randomSize} ${randomColor} cursor-pointer transition duration-300 ease-in-out transform hover:scale-125 hover:text-white`}
                        onClick={() => handleCategoryClick(category.name)}
                        style={{
                            margin: "0.25rem",
                            padding: "0.5rem",
                        }}
                    >
            {category.name}
          </span>
                );
            })}
        </div>
    );
};

export default CategoryCloud;
