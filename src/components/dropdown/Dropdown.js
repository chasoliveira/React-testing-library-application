import { useState } from 'react';
/**
 * 1. Start closed
 * 2. Open the list with all options
 * 3. set the selected on click
*/

export const Dropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  }
  return (
    <div className='c-dropdown'>
      <button onClick={() => setIsOpen(prev => !prev)}>{title}</button>

      {isOpen && (
        <ul role='menu'>
          {
            options.map(option =>
              <li key={option} role='menuitem' onClick={() => handleOnClick(option)}>{option}</li>
            )}
        </ul>
      )}
    </div>
  );
}