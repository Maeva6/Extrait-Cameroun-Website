
import { useState } from 'react';

const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gold-400 dark:border-gold-600 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white bg-gold-100 hover:bg-gold-200 dark:hover:bg-gold-300 transition-colors rounded-t-xl"
      >
        <span>{title}</span>
        <span className="text-2xl">{open ? '–' : '+'}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-[1000px] py-4 px-6' : 'max-h-0 opacity-0'
        } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
      >
        {open && children}
      </div>
    </div>
  );
};

export default CollapsibleSection;