import { FcSearch } from 'react-icons/fc';


const Search = () => {
  const backgroundImageStyle = {
    backgroundImage: "url('/bg1.jpg')",
    backgroundPosition: 'center',
  };
  return (
    <div>
      <div className='flex flex-col items-center min-h-full' style={backgroundImageStyle}>
      <h1 className='text-white font-serif text-4xl text-center mx-auto py-10'>Image search engine<br/>
      <span className='text-white text-sm italic'>Search and download any images</span>

      </h1>
      <form className='flex flex-col items-center pb-28'>
        <div className="relative w-96 flex">
          <input
            type="text"
            className="w-full h-10 text-black bg-gray-300 border border-gray-700 rounded-l px-4 py-2 placeholder-gray-500 focus:outline-none focus:placeholder-opacity-100"
            placeholder="Search..."
          />
          <button className="w-24 h-10 bg-blue-300 border border-gray-700 rounded-r flex items-center justify-center">
            <FcSearch className="w-6 h-6" />
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Search;
