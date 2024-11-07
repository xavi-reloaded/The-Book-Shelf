import React, { useContext, useEffect } from 'react';
import { BooksContext } from '../../contexts/BooksProvider';
import { useNavigate } from 'react-router-dom';
const RecentlyAddedBooks = () => {
    const { booksState: { booksData } } = useContext(BooksContext);
    const navigate = useNavigate();
    const shuffleArray = (array) => {
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const recentlyAddedBooks = shuffleArray(booksData).slice(0, 12);
    const handleCardClick = (bookSlug) => {
        navigate(`/product-overview/${bookSlug}`);
    };
    return (
        <div className="recent-books-section">
            <h2 className="text-xl font-semibold mb-4 text-white text-center">Libros Añadidos Recientemente</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recentlyAddedBooks.map(book => (
                    <div key={book.slug} className="bg-gray-100 p-0 shadow overflow-hidden h-64" onClick={() => handleCardClick(book.slug)}>
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-32 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                        <div className="p-2">
                            <p className="text-center text-sm font-medium">{book.title}</p>
                            <p className="text-center text-xs  text-gray-600 text-ellipsis">{book.author}</p>
                            <p className="text-center text-xs  text-gray-600">{book.genre}</p>
                            <p className="text-center text-xs text-gray-500 mt-1 text-ellipsis">{book.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAddedBooks;
