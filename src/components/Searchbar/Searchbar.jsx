import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ setSearchKeyword }) => {
  const [searchKeyword, setSearchKeywordLocal] = useState('');

  const handleSearch = () => {
    if(searchKeyword.trim() !== '') {
      setSearchKeyword(searchKeyword);
      setSearchKeywordLocal(''); // Reset the input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-styles'>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchKeyword} 
        onChange={(e) => setSearchKeywordLocal(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Searchbar;
