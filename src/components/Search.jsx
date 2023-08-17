import { useState } from 'react';
import axios from 'axios';
import { TbPhotoSearch } from 'react-icons/tb';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([
    // You can add your predefined images here
    { id: 1, urls: { small: '/img1.jpg' }, alt_description: 'Placeholder 1' },
    { id: 2, urls: { small: '/bg1.jpg' }, alt_description: 'Placeholder 2' },
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

  return (
    <div>
      <div className='flex flex-col items-center min-h-full' style={backgroundImageStyle}>
        <h1 className='text-white font-serif text-4xl text-center mx-auto py-10'>Image search engine<br />
          <span className='text-white text-sm italic'>Search and download any images</span>
        </h1>
        <form className='flex flex-col items-center pb-28' onSubmit={handleSearch}>
          <div className="relative w-96 flex">
            <input
              id='search-input'
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 text-black bg-gray-300 border border-solid border-white rounded-l px-4 py-2 placeholder-gray-500 focus:outline-none focus:placeholder-opacity-100"
              placeholder="Search..."
            />
            <button type="submit" className="w-24 h-10  border border-white rounded-r flex items-center justify-center">
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

    </div>
  );
}

export default Search;
