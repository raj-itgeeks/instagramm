import React, { useState } from 'react'

function Signup() {
    const [formData, setFormData] = useState({});
    const handleSubmit = () => {
        fetch('http://localhost:8080/userRegister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
    return (
        <div className='w-full flex justify-center'>
            <div className='flex flex-col gap-2 w-1/3'><h1>
                Signup</h1>
                <input className='p-1 rounded-sm border' name='username' type="text" placeholder='User Name' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <input className='p-1 rounded-sm border' name='email' type="email" placeholder='email' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <input className='p-1 rounded-sm border' name='password' type="password" placeholder='password' onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                <button className='border rounded-sm p-2' onClick={handleSubmit}>Signup</button>
            </div>
        </div>
    )
}

export default Signup