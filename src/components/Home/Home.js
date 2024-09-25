import React from 'react'
import Header from '../header/Header'
import Body from '../body/Body'
import Footer from '../footer/Footer'
import Signup from './Signup/Signup'

function Home() {
    return (
        <div className='font-appFont'>
            <Header />
            <Body />
            <Footer />
            {/* <Signup /> */}
        </div>
    )
}

export default Home