import React, { useState, useRef, useEffect } from "react";
import useTodoStore from "../store/todoStore";

type TodoFilterProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
};

const TodoFilter: React.FC<TodoFilterProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    setFilter(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const { theme, toggleTheme } = useTodoStore(state => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-4 hover:cursor-pointer">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search note..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className={`p-2 h-[38px] border rounded-md w-full placeholder-gray-500 focus:outline-none ${
          theme === "dark"
            ? "search-icon-right-dark-mode border-white text-white bg-customBlack"
            : "search-icon-right border-customPurple text-gray-900"
        }`}
      />

      {/* Dropdown */}
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 h-[38px] w-[150px] flex justify-center items-center border border-customPurple bg-customPurple rounded-md shadow-sm text-white focus:outline-none"
        >
          {filter || "Select filter"}
          <svg
            className="inline-block h-5 w-5 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute mt-2 right-0 w-44 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div className="py-1">
              {[
                "ALL",
                "Completed",
                "Incomplete",
                "Datetime",
                "Alphabetical",
              ].map(option => (
                <div
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 text-customPurple cursor-pointer hover:bg-purple-100 hover:text-customPurple ${
                    filter === option ? "bg-customPurple text-white" : ""
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dark Mode */}
      <div
        className="p-2 bg-customPurple rounded flex justify-center items-center h-[38px] w-[48px]"
        onClick={toggleTheme}
      >
        <img
          src={theme === "dark" ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt="Dark Mode"
        />
      </div>
    </div>
  );
};

export default TodoFilter;
