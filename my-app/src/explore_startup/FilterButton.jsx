import React from 'react';

function FilterButton({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 justify-center items-center px-4 py-2 bg-white border border-solid shadow-sm rounded-[100px]"
    >
      {icon && <img loading="lazy" src={icon} alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />}
      <span className="self-stretch my-auto">{label}</span>
    </button>
  );
}

export default FilterButton;
