import { useState } from 'react';
import axios from 'axios';
import { TbPhotoSearch } from 'react-icons/tb';

const Search = () => {


  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([
    // You can add your predefined images here
    { id: 1, urls: { small: '/img1.jpg' }, alt_description: 'Placeholder 1' },
    { id: 2, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder 2' },
    { id: 3, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder 3' },
    { id: 4, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder 4' },
    { id: 5, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder 5' },
    { id: 6, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder ' },
    { id: 7, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder ' },
    { id: 8, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder ' },
    { id: 9, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder ' },
    { id: 10, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder 5' },
    // Add more placeholders if needed
  ]);

  const backgroundImageStyle = {
    backgroundImage: "url('/bg2.jpg')",
    backgroundPosition: 'center',
  };

  const searchImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: `${searchTerm}`,
          per_page: 15,
          client_id: '7Gli5Kqd_xGlW5hWkrt7fzbF9z4UJ6v6TjhcrLYHUVE', // Replace with your access key
        },
      });
      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchImages();
  };
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  const toggleLoadMoreButton = () => {
    setShowLoadMoreButton(!showLoadMoreButton);
  };
  // Define an asynchronous function named loadMoreImages
  const loadMoreImages = async () => {
    try {
      // Attempt to fetch images from the Unsplash API
      // using the Axios library for making HTTP requests

      // Send a GET request to the Unsplash API's search/photos endpoint
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        // Configure parameters for the request
        params: {
          query: `${searchTerm}`, // The search term for the images
          per_page: 10, // Number of images per page
          client_id: '7Gli5Kqd_xGlW5hWkrt7fzbF9z4UJ6v6TjhcrLYHUVE', // Your Unsplash API access key
        },
      });
      let newArray = [...images];
      newArray = newArray.concat(response.data.results);
      setImages(newArray);
    } catch (error) {
      // Log an error if the request fails
      console.error('Error fetching images:', error);
    }
  }
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
            className="m-2 h-80 w-80 object-cover rounded"
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {showLoadMoreButton && (
          <button
            onClick={
              loadMoreImages
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
