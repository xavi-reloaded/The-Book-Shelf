import {useState, useEffect, useContext} from 'react';
import {BooksContext, urlserver} from "../../contexts/BooksProvider";

const ProductsPagination = ({ fetchProducts, paging }) => {
    const { filtersState: { bookQuery },} = useContext(BooksContext);
    const recordsPerPage = 50;
    const totalRecords = paging.total || 0; // Total viene de paging
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getPageFromOffset = (url) => {
            if (!url || !url.includes('?')) return 1;
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const offset = parseInt(urlParams.get('offset'), 10) || 0;
            return Math.floor(offset / recordsPerPage) + 1;
        };

        if (paging.previous!=='') {
            setCurrentPage(getPageFromOffset(paging.previous) + 1);
        } else if (paging.next!=='') {
            setCurrentPage(getPageFromOffset(paging.next) - 1);
        } else {
            setCurrentPage(1);
        }
    }, [paging]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        const offset = (pageNumber - 1) * recordsPerPage;
        const limit = recordsPerPage;
        fetchProducts(`${urlserver}/v1/ebooks?limit=${limit}&offset=${offset}&${bookQuery}`);
    };

    const range = (start, end) => Array.from({ length: (end - start + 1) }, (_, i) => start + i);

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => handlePageClick(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
            >
                Primera
            </button>
            {range(Math.max(1, currentPage - 4), Math.min(totalPages, currentPage + 4)).map(pageNumber => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-2 py-1 text-sm font-medium ${
                        currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}>
                    {pageNumber}
                </button>
            ))}
            <button
                onClick={() => handlePageClick(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
            >
                Última
            </button>
        </div>
    );
};

export default ProductsPagination;
