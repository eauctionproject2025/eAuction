import React from 'react'

function profileSkeleton() {
  return (
    <div className='w-[90%] lg:w-[80%] lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 mt-7'>
        <div className='flex flex-col items-start justify-top gap-5 lg:gap-9 p-4 items-start justify-top shadow-md shadow-gray-700'>
            <div className='w-1/1 h-[300px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-2/4 h-[35px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-5/5 h-[55px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-2/3 h-[30px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-3/5 h-[25px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-3/5 h-[25px] bg-gray-300 rounded animate-pulse'></div>
            <div className='w-2/5 h-[25px] bg-gray-300 rounded animate-pulse'></div>
         </div>
        <div className='lg:w-[80%] flex flex-col gap-7 lg:ml-[20%] p-4 items-start justify-top'>
            <div className='w-full flex flex-col gap-2'>
                <div className='w-1/5 h-[40px] pb-2 bg-gray-300 rounded animate-pulse'></div>
                <div className='w- 3/5 h-[35px] bg-gray-300 rounded animate-pulse'></div>            
                <div className='w-full h-[2px] bg-gray-300 animate-pulse'></div>
            </div>
            <div className='w-full flex flex-col gap-2 mt-5'>
                <div className='w-1/2 h-[40px] bg-gray-300 rounded animate-pulse'></div>
                <div className='w-full h-[70px] bg-gray-300 rounded animate-pulse'></div>
                <div className='w-full h-[70px] bg-gray-300 rounded animate-pulse'></div>
                <div className='w-full h-[70px] bg-gray-300 rounded animate-pulse'></div>
            </div>
        </div>
    </div>
  )
}

export default profileSkeleton