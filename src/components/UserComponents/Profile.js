import React, { useEffect, useState } from 'react'
import { RiImageAddLine } from "react-icons/ri";
import { useNavigate } from 'react-router';
function Profile() {
    const [imageToSend, setImageToSend] = useState()
    const [isPopUp, setIsPopUp] = useState(false);
    const stringUser = localStorage.getItem('user');
    const navigate = useNavigate();
    const user = JSON.parse(stringUser);
    console.log(user)
    const [image, setImage] = useState(user ? user?.profilePicture : 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=1024x1024&w=is&k=20&c=iGtRKCTRSvPVl3eOIpzzse5SvQFfImkV0TZuFh-74ps=');
    const [followersCount, setFollowersCount] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);
    const [formData, setFormData] = useState({
        fullname: user?.fullname,
        username: user?.username,
        bio: user?.bio,
    });
    // function to change image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            // Handle case where no file is selected (optional)
            console.error('No file selected');
            return;
        }
        setImageToSend(file);
        const reader = new FileReader();

        reader.onload = () => {
            const imageData = reader.result;
            setImage(imageData);
        };

        reader.readAsDataURL(file);
    };
    //  function to submit pofile updation form
    const handleSubmit = () => {
        const formD = new FormData();
        formD.append('username', formData.username);
        formD.append('fullname', formData.fullname);
        formD.append('bio', formData.bio);
        if (imageToSend) {
            formD.append('profilePicture', imageToSend);
        }

        try {
            fetch('http://localhost:8080/profileUpdate', {
                method: 'POST',
                body: formD,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(response => response.json()).then(data => {
                console.log(data);
                navigate('/feed');
            })
                .catch(error => console.error(error));
        } catch (err) {
            console.log(err);
        }
    }

    // function to fetch follwers and following count
    const fetchCounts = () => {
        try {
            fetch('http://localhost:8080/followingandfollowerscounts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json()).then(
                data => {
                    console.log(data);
                    setFollowersCount(data.res?.followersCount);
                    setFollowingCount(data.res?.followingToCount);
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCounts();
    }, [])
    console.log(formData)
    return (
        <div className='w-full mx-[34px] mt-2 px-8 pt-4 flex '>
            {/* creating profile update ui */}
            <div className='w-min ring-purple-400 pb-2  rounded-lg  shadow-xl flex flex-col justify-center items-center  gap-2'>
                <div className='cursor-pointer pb-4 border-b-2 border-[#000] flex flex-col gap-3 relative'>
                    <div className='h-[296px]  w-[296px] '>
                        <img onClick={() => { if (image) setIsPopUp(true) }} className='rounded-[100%] shadow-sm border-[2px] border-spacing-1 shadow-sm h-full w-full' src={image} alt="" />
                    </div>

                    <div className='text-[20px] select-none tracking-wide'>Anil_ji</div>
                    <div className='text-[14px] select-none border-[#000] py-[5px] px-[16px] rounded-lg bg-opacity-30 border-[2px] bg-violet-400 shadow-md text-center'>
                        Edit Profile
                    </div>

                    <div className=' rounded-md w-full flex font-medium items-center gap-2 text-sm '>
                        <svg aria-hidden="true" height="20" viewBox="0 0 24 24" version="1.1" width="20" data-view-component="true" class="octicon octicon-people blankslate-icon">
                            <path d="M3.5 8a5.5 5.5 0 1 1 8.596 4.547 9.005 9.005 0 0 1 5.9 8.18.751.751 0 0 1-1.5.045 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.499-.044 9.005 9.005 0 0 1 5.9-8.181A5.496 5.496 0 0 1 3.5 8ZM9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 1 1-.212-1.484 4.53 4.53 0 0 1 3.38 8.097 6.69 6.69 0 0 1 3.956 6.107.75.75 0 0 1-1.5 0 5.193 5.193 0 0 0-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0 0 17.29 8Z"></path>
                        </svg>
                        <div className='flex gap-1 items-center justify-center'>
                            <span>
                                {followersCount || ""}
                            </span>
                            <span>
                                Followers
                            </span>
                        </div>
                        <div className='h-[2px] w-[2px] rounded-full bg-black'></div>
                        <div className='flex gap-1 items-center justify-center'>
                            <span>
                                {followingCount || ""}
                            </span>
                            <span>
                                Following
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                rest
            </div>
        </div>
    )
}

export default Profile

{/* <div className='w-min ring-purple-400 rounded-lg shadow-xl flex flex-col justify-center items-center  gap-2'>
<h1>Profile</h1>
<div className='cursor-pointer relative'>
    <div className='h-[128px]  w-[128px] '>
        <img onClick={() => { if (image) setIsPopUp(true) }} className='rounded-[100%] border-[2px] border-spacing-1 shadow-sm h-full w-full' src={image} alt="" />
    </div>
    <div className='absolute top-[100px] right-2'>
        <label htmlFor='image1'><RiImageAddLine /></label>
        <input type='file' id='image1' style={{ display: "none" }} accept="image/png, image/gif, image/jpeg,image/jpg" onInput={(e) => { handleImageChange(e) }} />
    </div>
</div>
<div className='border rounded-md w-full flex gap-5 text-sm justify-center'>
    <div onClick={() => { navigate('/home/followersList') }} className='flex flex-col gap-1 items-center justify-center'>
        <span>
            {followersCount || ""}
        </span>
        <span>
            Followers
        </span>
    </div>
    <div className='flex flex-col gap-1 items-center justify-center'>
        <span>
            {followingCount || ""}
        </span>
        <span>
            Following
        </span>
    </div>
</div>
<input className='p-2 border outline-none rounded-md' type="text" name='fullname' placeholder='Full Name' value={formData?.fullname} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
<input className='p-2 border outline-none rounded-md' type="text" name='username' placeholder='User Name' value={formData?.username} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
<input className='p-2 border outline-none rounded-md' type='text' name='bio' placeholder='bio' value={formData?.bio} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
<button className='p-2 border outline-none rounded-md' onClick={() => { handleSubmit() }}>Update Profile</button>
</div> */}