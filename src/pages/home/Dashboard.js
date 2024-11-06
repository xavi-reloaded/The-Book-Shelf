import { useContext, useEffect, useState } from 'react';
import { BooksContext } from '../../contexts/BooksProvider';

const Dashboard = () => {
  const { booksState: { authors } } = useContext(BooksContext);
  const [authorInitials, setAuthorInitials] = useState(authors);
  const [selectedInitial, setSelectedInitial] = useState(Object.keys(authors)[0]);

  useEffect(() => {
    document.title = "Home | The Book Shelf";
  }, []);

  const handleInitialClick = (initial) => {
    setSelectedInitial(initial);
  };

  return (
    <div className='relative flex flex-col'>
      {/* Índice de letras */}
      <div className="flex justify-center space-x-2 pt-4">
        {Object.keys(authorInitials).sort().map((initial) => (
          <button
            key={initial}
            onClick={() => handleInitialClick(initial)}
            className={`px-2 py-1 text-lg font-semibold ${
              selectedInitial === initial ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
            {initial}
          </button>
        ))}
      </div>

      {/* Lista de autores con scroll */}
      <div className="pt-6 max-h-96 overflow-y-auto">
        {selectedInitial && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {authorInitials[selectedInitial].map(author => (
              <div key={author.author} className="bg-gray-50 p-2 rounded shadow overflow-hidden">
                <span className="block text-ellipsis whitespace-nowrap overflow-hidden">
                  {author.author} ({author.count})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;