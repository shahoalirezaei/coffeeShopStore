"use client";

import React, { useState } from "react";

const CompareButton: React.FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {hover && (
        <span className="absolute -top-6 text-xs bg-zinc-900 text-white px-2 py-1 rounded-md whitespace-nowrap select-none z-50">
          مقایسه محصول
        </span>
      )}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="p-2 rounded-full bg-gray-100 dark:bg-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-500 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5">
          <use href="#arrows-right-left" />
        </svg>
      </div>
    </div>
  );
};

export default CompareButton;
