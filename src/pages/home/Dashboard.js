import {useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { BooksContext } from '../../contexts/BooksProvider'
import CategoryCard from '../../components/CategoryCard'
import CategoryCloud from "./CategoryCloud";
const links = [
    { name: 'Explora', to: 'products' },
]



 const Dashboard=()=> {
    const {booksState: { authors },}=useContext(BooksContext)
    useEffect(()=>{
        document.title="Home | The Book Shelf"
    },[])
    const [authorInitials, setAuthorInitials] = useState(authors);
    const [selectedInitial, setSelectedInitial] = useState(null);
   const handleInitialClick = (initial) => {
     setSelectedInitial(initial);
   };

    return (
        <div className='relative flex flex-col'>
            <div className="relative py-24 mt-16 overflow-hidden bg-gray-900 lg:mt-0 isolate sm:pt-32 sm:pb-16">
                <img
                    src="https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/boksbg.png?updatedAt=1684597529803"
                    alt="header-books"
                    className="absolute inset-0 object-cover object-right w-full h-full -z-10 md:object-center"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-30"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>

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

              {/* Lista de autores */}
              <div className="pt-6">
                {selectedInitial && (
                  <div className="grid grid-cols-2 gap-4">
                    {authorInitials[selectedInitial].map(author => (
                      <div key={author.author} className="bg-gray-50 p-2 rounded shadow">
                        {author.author} ({author.count})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

        </div>
    )
}


export default Dashboard
