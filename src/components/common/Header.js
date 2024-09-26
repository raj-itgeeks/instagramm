import React, { useEffect, useRef, useState } from 'react'
import { CiLogout, CiSearch, CiUser } from 'react-icons/ci'
function Header() {
    // let timeoutId;
    // const handleSearch = (query) => {
    //     clearTimeout(timeoutId);
    //     timeoutId = setTimeout(() => {
    //         try {
    //             fetch(`http://localhost:8080/search/${query}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 }
    //             }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }, 500);
    // }
    const [openOption, setOpenOption] = useState(false);
    //////////////////////////////////////////////////////////////////////////////////////////////////
    const menuRef = useRef(null);
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenOption(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const storedUser = JSON.parse(localStorage.getItem('userDetailes'));
    return (
        <div className='bg-[#181b1e] text-[#ffffff] py-[10px]  px-[20px] z-[1] sticky w-full flex justify-between items-center'>
            <div><h1 className='font-logoFont text-[26px] cursor-pointer select-none'>FocalPoint</h1></div>
            <div className='flex gap-[20px] items-center'>
                <div className='text-[26px]'><CiSearch /></div>
                <div ref={menuRef}>
                    <div className='w-[40px] h-[40px] bg-white rounded-full relative' onClick={() => setOpenOption(prev => !prev)}></div>
                    {openOption &&
                        <div className='absolute right-[10px] top-[70px] shadow-md bg-white w-[200px] rounded-[5px] h-min text-black p-[15px] flex flex-col gap-[10px]'>
                            <div className='flex gap-[10px] items-center cursor-pointer w-min'>
                                <div className='text-[20px]'><CiUser /></div>
                                <p>Profile</p>
                            </div>
                            <div className='flex gap-[10px] items-center cursor-pointer w-min'>
                                <div className='text-[20px]'><CiLogout /></div>
                                <p>Logout</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Header

