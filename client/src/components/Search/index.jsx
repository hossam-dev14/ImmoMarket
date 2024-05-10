import 
  //React, 
  {useState} from 'react';
import { IoSearch } from 'react-icons/io5';
import PropTypes from 'prop-types'; // Import PropTypes

export default function Search({ setSearchTerm }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search); // Call setSearchTerm with the current search value
  }

  return (
    <form onSubmit={handleSearch}>
      <div className='relative flex'>
        <input
          type='text'
          className='block p-4 w-full text-lg text-gray-900 bg-white rounded-lg border-none focus-visible:border-none shadow-sm'
          placeholder='Search By Title/Description'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required=''
        />
        <button
          type='submit'
          className=''
        >
          <div className='flex absolute right-4 top-4 items-center pl-5'>
            <span className="text-4xl">
              <IoSearch />
            </span>
          </div>
        </button>
      </div>
    </form>
  )
}


// Define propsTable for your component
Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};
