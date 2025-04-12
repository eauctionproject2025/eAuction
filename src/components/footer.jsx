import React from 'react'
import SocialLink from './socialLink'
import fb from '@/public/socioIcons/fb.svg'
import insta from '@/public/socioIcons/insta.svg'
import x from '@/public/socioIcons/x.svg'
import pinterest from '@/public/socioIcons/pinterest.svg'
import FooterBox from '@/components/footerBox'

function Footer() {
  return (
    <div className='w-full flex flex-col justify-between mt-6'>
        <div className='flex flex-col w-full  bg-[#00000033] py-5 gap-7 items-center justify-center'>
          <div className=''>
            <FooterBox />
          </div>
          <div className='flex items-center justify-between w-[80%] h-full'>
              <div className='text-[10px] md:text-[15px] text-[#FFFFFF99]'>Copyright 2025 e-Nilaam. All Rights Reserved</div>
              <div className='flex space-x-1'>
                  <SocialLink link={fb} des='fb icon' href="#"/>
                  <SocialLink link={insta} des='insta icon' href="#"/>
                  <SocialLink link={x} des='x icon' href="#"/>
                  <SocialLink link={pinterest} des='pinterest icon' href="#"/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Footer