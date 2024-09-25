import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function Login() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const handleSubmit = () => {
        fetch('http://localhost:8080/userLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(res => { localStorage.setItem('token', res.accessToken); localStorage.setItem('user',JSON.stringify(res.res)); navigate('/home') })
            .catch(err => console.error(err))
    }
    return (
        <div className='w-full flex flex-col justify-center h-full items-center'>
            {/* : A name that references the focal point of a camera lens, implying a platform that helps users focus on sharing their moments. */}
            <div className='flex flex-col border text-sm p-14 m-11 rounded-lg shadow-lg gap-2 w-1/3'>
                <h1 className='font-logoFont w-full text-center text-[22px]'> FocalPoint</h1>
                <input className='p-1 rounded-sm outline-none shadow-sm border' name='email' type="email" placeholder='email' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <input className='p-1 rounded-sm outline-none shadow-sm border' name='password' type="password" placeholder='password' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <button className='border rounded-sm shadow-sm p-2' onClick={handleSubmit} >Log in</button>
                <div className='text-center'>Or</div>
                <button className='border rounded-sm shadow-sm p-2' onClick={() => { navigate('/sign-up') }} >Sign Up</button>
            </div>
        </div>
    )
}

export default Login