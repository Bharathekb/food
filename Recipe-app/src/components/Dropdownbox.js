import React from 'react';

const Dropdownbox = ({ options, onSelect }) => {
  return (
    <select className='form-select' onChange={(e) => onSelect(e.target.value)}>
      <option value=''>Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdownbox;
