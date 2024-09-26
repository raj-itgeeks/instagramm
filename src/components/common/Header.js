import React from 'react'
import { IoIosLogIn } from "react-icons/io";
function Header() {
    let timeoutId;
    const handleSearch = (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            try {
                fetch(`http://localhost:8080/search/${query}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
            } catch (err) {
                console.log(err)
            }
        }, 500);
    }
    return (
        <div className='m-0 bg-[#2E4053] text-[#ffffff] py-[10px] z-10 sticky top-0 shadow-md px-[20px] '>
            <div className='flex justify-between'>
                <div><h1 className='font-logoFont text-[26px] cursor-pointer select-none'>FocalPoint</h1></div>
                <div className='flex cursor-pointer items-center text-[20px] gap-2'>
                    <div><input type="search" className='rounded text-black px-2 py-1 outline-none active:outline-none' onChange={(e) => { handleSearch(e.target.value) }} /></div>
                    <IoIosLogIn /></div>
            </div>
        </div>
    )
}

export default Header