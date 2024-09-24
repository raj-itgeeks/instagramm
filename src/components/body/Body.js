import React from 'react'
import ProductCard from '../utils/ProductCard'
import Hero from './hero/Hero'

function Body() {
  return (
    <div className='bg-[#F7F7F7] text-[#333333]'>
      {/* scrolling Text */}
      <div className="scrolling-text">
        <marquee direction="left" scrollamount="5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </marquee>
      </div>
      {/* hero section */}
      
      {/* <Hero /> */}
      <ProductCard />
    </div >
  )
}

export default Body