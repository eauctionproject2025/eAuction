import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Auction({imgLink, href, title, price}) {
  return (
    <div className='md:bg-gray-900 border-2 border-gray-600 rounded-md p-4 gap-2 flex flex-col items-center justify-between'>
        <div>
            <Image src={imgLink} alt='auction'></Image>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
            <div className='text-xl'>{title}</div>
            <div className='text-center'>$ {price}</div>
            <button className='bg-[#3dd477] cursor-pointer rounded-md px-3 py-1'><Link href={href}>Bid</Link></button>
        </div>
    </div>
  )
}

export default Auction