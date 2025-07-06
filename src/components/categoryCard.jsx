import React from 'react'

function CategoryCard({category}) {
  return (
    <div key={category._id} className="flex flex-col rounded justify-center shadow-md p-4 mb-4 cursor-pointer w-[150px] h-[170px] hover:bg-gray-200" onClick={() => window.location.href = category.link}>
        <img src={category.icon} alt={category.name} className="w-full object-cover" />
        <h3 className="text-lg font-bold text-center">{category.name}</h3>
    </div>
  )
}

export default CategoryCard