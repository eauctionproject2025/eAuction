import React from "react";

function CategoryCard({ category }) {
  const capitalizeName = category.name.charAt(0).toUpperCase() + category.name.slice(1);
  return (
    <div
      key={category._id}
      className="flex bg-gradient-to-r from-yellow-300 to-gray-200 hover:shadow-yellow-600 transition duration-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-yellow-400 rounded items-center justify-center gap-1 md:gap-2 shadow-md shadow-gray-500 p-2 md:p-4 md:mb-4 cursor-pointer w-[90px] h-[40px] md:w-[150px] md:h-[60px] overflow-hidden"
      onClick={() => (window.location.href = '/category/' + category.name)}
    >
      <img
        src={category.icon}
        alt={category.name}
        className="h-[30px] md:h-[50px] object-cover"
      />
      <h3 className="text-sm md:text-lg font-bold text-center">
        {capitalizeName}
      </h3>
    </div>
  );
}

export default CategoryCard;
