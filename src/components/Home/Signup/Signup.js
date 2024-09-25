import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router';

function Signup() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (!formData?.username) return;
        fetch('http://localhost:8080/userRegister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(res => { console.log(res); navigate('/') })
            .catch(err => console.error(err))
    }
    return (
        <div className='w-full flex flex-col justify-center h-full items-center'>
            {/* : A name that references the focal point of a camera lens, implying a platform that helps users focus on sharing their moments. */}
            <div className='flex flex-col border text-sm m-11 p-14 rounded-lg shadow-lg gap-2 w-1/3'>
                <h1 className='font-logoFont w-full text-center text-[22px]'> FocalPoint</h1>
                <input className='p-1 rounded-sm outline-none border' name='username' type="text" placeholder='User Name' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <input className='p-1 rounded-sm outline-none border' type="text" name='fullname' placeholder='Full Name' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <input className='p-1 rounded-sm outline-none border' name='email' type="email" placeholder='email' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <input className='p-1 rounded-sm outline-none border' name='password' type="password" placeholder='password' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <button className='border rounded-sm p-2' onClick={handleSubmit}>Signup</button>
            </div>
        </div>
    )
}

export default Signup