import React from 'react';

const Filter = ({ icon, value, options, onChange, placeholder }) => {
  return (
    <div className="filter-container">
      {/* Icon for the filter */}
      <img src={icon} alt={`${placeholder}-icon`} className="filter-icon" />
      
      {/* Dropdown for selecting filter options */}
      <select 
        className="filter-select"
        value={value}
        onChange={onChange}
      >
        {/* Placeholder option */}
        <option value="" disabled defaultValue hidden>{placeholder}</option>
        
        {/* Map through options to create dropdown items */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
