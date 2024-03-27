import React, { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'>
          Search
        </label>
        <div className='relative flex'>
          <input
            type='search'
            className='block p-3 w-full text-md text-gray-900 bg-white rounded-lg border-none focus-visible:border-none'
            placeholder='Search By Title'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required=''
          />
          <button
            type='submit'
            className=''
          >
            <div className='flex absolute right-3 top-3 items-center pl-3'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          </button>
        </div>
      </form>
    </div>
  )
}
