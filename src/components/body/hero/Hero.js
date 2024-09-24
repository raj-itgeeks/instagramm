import React from 'react'

function Hero() {
    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className='w-[80%] h-[80%] bg-[#333333] flex justify-center items-center'>
                <div className='w-[100%] h-[100%] bg-[#333333]  relative flex justify-center items-center'>
                    <video autoPlay loop muted className='w-[100%] opacity-60  object-cover h-full'>
                        <source src="https://fashionopolism-galleria.myshopify.com/cdn/shop/videos/c/vp/fd60b4996e154fd39b7c7833198cb4a8/fd60b4996e154fd39b7c7833198cb4a8.HD-1080p-7.2Mbps-21532483.mp4?v=0" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h1 className='text-[#fff] absolute text-[40px]'>Welcome to our store</h1>
                </div>
            </div>
        </div>)
}

export default Hero