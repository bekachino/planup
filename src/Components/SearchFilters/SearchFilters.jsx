import React from 'react';
import './searchFilters.css';

const SearchFilters = ({ ...rest }) => {
  return (
    <div className="search-filters">
      <input type="text" {...rest} />
    </div>
  );
};

export default SearchFilters;
