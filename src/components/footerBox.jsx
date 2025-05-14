import React from 'react'
import Link from 'next/link'

const links1 = [
    {id:'1', label:'All auctions', link:'/'},
    {id:'2', label:'All Offers', link:'#'},
    {id:'3', label:'Membership', link:'#'},
    {id:'4', label:'Add auction', link:'/createAuction'},
    {id:'5', label:'Contact', link:'#'},
]
const links2 = [
    {id:'1', label:'About us', link:'#'},
    {id:'2', label:'Payment method', link:'#'},
    {id:'3', label:'FAQs', link:'#'},
    {id:'4', label:'Terms & condition', link:'#'},
    {id:'5', label:'Privacy policy', link:'#'},
]

function FooteBox() {
  return (
    <div className='flex w-full h-full flex items-center justify-center'>
        <div className=' md:h-[70%] h-[95%] flex flex-col md:flex-row justify-stretch items-center'>
            <div className='w-95% md:w-[25%] h-full flex flex-col space-y-2 md:space-y-6'>
                <div className=''>
                    <Link href="/" className='cursor-pointer text-2xl'>
                    e-Nilaam
                    </Link>
                </div>
                <div className='w-[100%] flex flex-col space-y-3 md:space-y-8'>
                    <h1> Let's get some awesome Items from eNilaam </h1>
                </div>
            </div>
            <div className='w-95% md:w-[25%] h-full flex md:flex-col items-center gap-5 md:gap-0 md:my-0'>
                <ul className='md:space-y-2'>
                    {links1.map((link =>(
                        <li key={link.id} className='text-[12px] md:text-[15px] font-light text-[#FFFFFF99] hover:text-white'><Link href={link.link}>{link.label}</Link></li>
                    )))}
                </ul>
                <ul className='md:hidden'>
                    {links2.map((link =>(
                        <li key={link.id} className='text-[12px] font-light text-[#FFFFFF99]'><Link href={link.link}>{link.label}</Link></li>
                    )))}
                </ul>
            </div>
            <div className='hidden md:block w-[25%] h-full flex flex-col items-center '>
                <ul className='space-y-2'>
                    {links2.map((link =>(
                        <li key={link.id} className='text-[15px] font-light text-[#FFFFFF99] hover:text-[#fff]'><Link href={link.link}>{link.label}</Link></li>
                    )))}
                    </ul>
            </div>
            <div className='w-95% md:w-[25%] h-full flex flex-col space-y-1 md:space-y-3'>
                    Sell your precious items to the world and get the best price
            </div>
        </div>
    </div>
  )
}

export default FooteBox