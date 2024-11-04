import React, { useState, useRef, useEffect } from 'react';

function FilterSection({ title, icon, options = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef(null);

  // Toggle section and manage height
  const toggleSection = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isExpanded]);

  return (
    <div className="flex flex-col mb-6 border p-4 rounded-lg shadow-md bg-white overflow-hidden">
      <h3
        className="flex items-center text-lg font-semibold mb-2 cursor-pointer"
        onClick={toggleSection}
      >
        {icon && <img src={icon} alt="" className="mr-2 w-6 h-6" />}
        {title}
      </h3>
      <div
        ref={contentRef}
        style={{ height }}
        className="transition-height duration-300 ease-in-out overflow-hidden"
      >
        <div className="flex flex-col mt-2 space-y-2">
          {options.map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
      {!isExpanded && options.length > 2 && (
        <button className="mt-2 text-indigo-600" onClick={toggleSection}>
          Show more options
        </button>
      )}
    </div>
  );
}

export default FilterSection;
