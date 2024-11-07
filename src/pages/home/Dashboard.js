import { useContext, useEffect, useState } from 'react';
import { BooksContext } from '../../contexts/BooksProvider';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const { booksState: { authors, categories ,genres = [], series = [] },fetchBooksByCategory,fetchBooksByAuthor,fetchBooksBySeries} = useContext(BooksContext);
    const [activeTab, setActiveTab] = useState('');
    const [authorInitials, setAuthorInitials] = useState(authors);
    const [selectedInitial, setSelectedInitial] = useState(Object.keys(authors)[0]);
    const [seriesInitials, setSeriesInitials] = useState(series);
    const [selectedSeriessInitial, setSelectedSeriesInitial] = useState(Object.keys(series)[0]);

  useEffect(() => {
    document.title = "Home | The Book Shelf";
  }, []);

  const handleInitialClick = (initial) => {
    setSelectedInitial(initial);
  };
  const handleSerieInitialClick = (initial) => {
      setSelectedSeriesInitial(initial);
  };
    const navigate = useNavigate();
    const handleCategoryClick = (categoryName) => {
        fetchBooksByCategory(categoryName);
        navigate(`/products/${categoryName}`);
    };
    const handleAuthorClick = (author) => {
        fetchBooksByAuthor(author);
        navigate(`/products/${author}`);
    };
    const handleSeriesClick = (series) => {
        fetchBooksBySeries(series);
        navigate(`/products/${series}`);
    };

    const handleTab = (tab) => {
        setActiveTab(activeTab === tab ? '' : tab)
    };
  return (
    <div className='relative flex flex-col h-24 pt-5'>
        <div className='relative flex flex-col min-h-screen px-10'>
            {/* Índice de letras con barra de desplazamiento horizontal invisible y fija */}
            <div className="sticky top-0 flex justify-center overflow-x-auto gap-1 whitespace-nowrap pt-4 px-2 hide-scrollbar shadow-md z-10">
                {['Autores', 'Géneros', 'Series'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTab(tab)}
                        className={`text-xs sm:text-sm md:text-base font-semibold px-2 py-1 ${
                            activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}>
                        {tab}
                    </button>
                ))}
            </div>
            {/* Contenido de las pestañas */}
            { activeTab!=='' && <div className="pt-6 flex-grow overflow-y h-[300] bg-amber-300 p-5">
                {activeTab === 'Autores' && selectedInitial && ( <>
                    <div className="flex justify-center overflow-x-auto whitespace-nowrap pt-4 px-2 gap-1 hide-scrollbar pb-10">
                        {Object.keys(authorInitials).sort().map((initial) => (
                            <button
                                key={initial}
                                onClick={() => handleInitialClick(initial)}
                                className={`text-xs sm:text-sm md:text-base font-semibold px-1 sm:px-2 py-1 ${
                                    selectedInitial === initial ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}>
                                {initial}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {authorInitials[selectedInitial].map(author => (
                            <div key={author.author} className="bg-gray-50 p-2 rounded shadow overflow-hidden">
                <span className="block text-ellipsis whitespace-nowrap overflow-hidden" onClick={()=>handleAuthorClick(author.author)}>
                  {author.author} ({author.count})
                </span>
                            </div>
                        ))}
                    </div>
                </>)}
                {activeTab === 'Géneros' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map(genre => (
                            <div key={genre} className="bg-gray-50 p-2 rounded shadow overflow-hidden">
                <span className="block text-ellipsis whitespace-nowrap overflow-hidden" onClick={() => handleCategoryClick(genre.name)}>
                  {genre.name} ({genre.count})
                </span>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'Series' && selectedSeriessInitial && ( <>
                    <div className="flex justify-center overflow-x-auto whitespace-nowrap pt-4 px-2 gap-1 hide-scrollbar pb-10">
                        {Object.keys(seriesInitials).sort().map((initial) => (
                            <button
                                key={initial}
                                onClick={() => handleSerieInitialClick(initial)}
                                className={`text-xs sm:text-sm md:text-base font-semibold px-1 sm:px-2 py-1 ${
                                    selectedSeriessInitial === initial ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}>
                                {initial}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {seriesInitials[selectedSeriessInitial].map(author => (
                            <div key={author.series} className="bg-gray-50 p-2 rounded shadow overflow-hidden">
                <span className="block text-ellipsis whitespace-nowrap overflow-hidden"  onClick={() => handleSeriesClick(author.series)}>
                  {author.series} ({author.count})
                </span>
                            </div>
                        ))}
                    </div>
                </>)}
            </div>}
        </div>

    </div>
  );
};

export default Dashboard;
