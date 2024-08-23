import React from 'react'
import { Share } from './Graphics'

const Nav = () => {
  return (
    <>
    <div className=' bg-bgsecondary h-[56px] px-[20px] py-[10px]'>
      <div className='flex items-center justify-between'>
        <p className='text-[#9B9B9B] text-[24px]'>ChatBot</p>
        <div>
          <Share/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Nav