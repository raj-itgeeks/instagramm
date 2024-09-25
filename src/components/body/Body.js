import React from 'react'
import ProductCard from '../utils/ProductCard'
import Hero from './hero/Hero'
import Profile from '../UserComponents/Profile'

function Body() {

  return (
    <div className='bg-[#F7F7F7] text-[#333333]'>
      {/* scrolling Text */}
     
      {/* hero section */}
      <Profile />
      {/* <Hero /> */}
      {/* <ProductCard /> */}
    </div >
  )
}

export default Body