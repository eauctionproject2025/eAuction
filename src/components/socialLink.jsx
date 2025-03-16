import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SocialLink({link, des, href}) {
  return (
    <Link href={href}>
        <div className='flex items-center justify-center w-[40px] h-[40px] bg-[#00000033] rounded-full'>
            <Image src={link} alt={des}/>
        </div>
    </Link>
  )
}

export default SocialLink