import React from 'react'

function Profile() {
    const stringUser = localStorage.getItem('user');
    const user = JSON.parse(stringUser);
    return (
        <div className='w-full p-7'>
            {/* creating profile update ui */}
            <div className='w-full flex flex-col justify-center items-center gap-2'>
                <h1>Profile</h1>
                <input id='image1' type="image" className='hidden' />
                <label htmlFor='image1' className='cursor-pointer'>
                    <div className='h-32 w-32 '>
                        <img className='rounded-full' src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=1024x1024&w=is&k=20&c=iGtRKCTRSvPVl3eOIpzzse5SvQFfImkV0TZuFh-74ps=" alt="" />
                    </div>
                </label>
                <input className='p-2 border outline-none rounded-md' type="text" name='fullname' placeholder='Full Name' value={user.fullname} />
                <input className='p-2 border outline-none rounded-md' type="text" name='username' placeholder='User Name' value={user.username} />
                <input className='p-2 border outline-none rounded-md' type='text' name='bio' placeholder='bio' />
                <button className='p-2 border outline-none rounded-md'>Update</button>
            </div>
        </div>
    )
}

export default Profile