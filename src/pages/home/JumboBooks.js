import React, { useContext, useEffect } from 'react';
import { BooksContext } from '../../contexts/BooksProvider';

const RecentlyAddedBooks = () => {
    const { booksState: { booksData } } = useContext(BooksContext);

    // Función para mezclar el array
    const shuffleArray = (array) => {
        let shuffled = array.slice(); // copia el array original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Utilizar la función shuffle para obtener 12 libros aleatorios
    const recentlyAddedBooks = shuffleArray(booksData).slice(0, 12);

    return (
        <div className="recent-books-section">
            <h2 className="text-xl font-semibold mb-4">Libros Añadidos Recientemente</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recentlyAddedBooks.map(book => (
                    <div key={book.slug} className="h-40 bg-gray-100 rounded shadow overflow-hidden">
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                        <p className="text-center text-sm font-medium">{book.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAddedBooks;
