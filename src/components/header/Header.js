import React from 'react'
import Button from '../utils/Button'
import Input from '../utils/Input'
import logo from './clothinghub.png'
import { IoIosLogIn } from "react-icons/io";
import Navigation from './navigation/Navigation';
function Header() {
    return (
        <div className='m-0 bg-[#2E4053] text-[#ffffff] py-[10px] z-10 sticky top-0 shadow-md px-[20px] '>
            <div className='flex justify-between'>
                <div><h1 className='font-logoFont text-[26px] cursor-pointer select-none'>CLOTHING HUB</h1></div>
                <Navigation />
                <div className='flex cursor-pointer items-center text-[20px] gap-2'><IoIosLogIn /></div>
            </div>
        </div>
    )
}

export default Header