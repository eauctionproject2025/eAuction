import React from 'react'

function profileSkeleton() {
  return (
    <div className='w-[80%] md:w-[90%] lg:w-[70%] h-[100vh] md:h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-4 my-7'>
        <div className='flex flex-col items-start justify-top gap-3 lg:gap-5 p-4 items-start justify-top shadow-md shadow-gray-700'>
            <div className='w-[100px] md:w-[150px] h-[100px] md:h-[150px] bg-gray-300 rounded-full animate-pulse'></div>
            <div className='w-2/5 h-[35px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-3/5 h-[40px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-4/5 h-[35px] bg-gray-300 rounded animate-pulse'></div>
         </div>
        <div className='lg:w-[80%] flex flex-col gap-4 lg:ml-[20%] p-4 items-start justify-top'>
            <div className='w-3/5 h-[40px] pb-2 bg-gray-300 rounded animate-pulse'></div>
            <div className='w-full h-[2px]  bg-gray-300 rounded animate-pulse'></div>
            <div className='w-full h-[80px] md:h-[100px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-full h-[80px] md:h-[100px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-full h-[80px] md:h-[100px] bg-gray-300 rounded animate-pulse'></div>
        </div>
    </div>
  )
}

export default profileSkeleton