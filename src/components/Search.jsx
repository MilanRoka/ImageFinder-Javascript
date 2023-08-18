import { useState, useEffect } from 'react';
import axios from 'axios';
import { TbPhotoSearch } from 'react-icons/tb';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const backgroundImageStyle = {
    backgroundImage: "url('/bg2.jpg')",
    backgroundPosition: 'center',
  };

  useEffect(() => {
    fetchInitialImages();
  }, []);

  const fetchInitialImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          per_page: 10, // Number of initial images
          client_id: '7Gli5Kqd_xGlW5hWkrt7fzbF9z4UJ6v6TjhcrLYHUVE', 
        },
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching initial images:', error);
    }
  };

  const searchImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: searchTerm,
          per_page: 10,
          client_id: '7Gli5Kqd_xGlW5hWkrt7fzbF9z4UJ6v6TjhcrLYHUVE', 
        },
      });
      setImages(response.data.results);
      setCurrentPage(1);
      setShowLoadMoreButton(true);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const loadMoreImages = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: searchTerm,
          per_page: 10,
          page: nextPage,
          client_id: '7Gli5Kqd_xGlW5hWkrt7fzbF9z4UJ6v6TjhcrLYHUVE', // Replace with your Unsplash API access key
        },
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setCurrentPage(nextPage);

      if (response.data.results.length === 0) {
        setShowLoadMoreButton(false);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchImages();
  };

  const toggleLoadMoreButton = () => {
    setShowLoadMoreButton(!showLoadMoreButton);
  };

  
  return (
    <div>
      <div className='flex flex-col items-center min-h-full' style={backgroundImageStyle}>
        <h1 className='text-white font-serif text-4xl text-center mx-auto py-10'>Image search engine<br />
          <span className='text-white text-sm italic'>Search and download any images</span>
        </h1>
        <form className='flex flex-col items-center pb-28' onSubmit={handleSearch}>
          <div className="relative w-96 flex">
            <input
              required
              id='search-input'
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 text-black bg-gray-300 border border-solid border-white rounded-l px-4 py-2 placeholder-gray-500 focus:outline-none focus:placeholder-opacity-100"
              placeholder="Search..."
            />
            <button onClick={toggleLoadMoreButton} type="submit" className="w-24 h-10  border border-white rounded-r flex items-center justify-center">
              <TbPhotoSearch className="text-white w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="m-2 h-80 w-80 object-cover rounded 
            hover:opacity-50 transition ease-in-out duration-150"
            onClick={
              () => {
                window.open(image.urls.regular, '_blank');
              }
            }
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {showLoadMoreButton && (
          <button
            onClick={
              loadMoreImages
            }
            className="px-4 py-2 mb-10 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
