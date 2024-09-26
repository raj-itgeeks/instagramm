import React from 'react'

const InputComponentText = ({ label, placeholder, name, value, changeHandler, errors, touched }) => {
    return (
        <div className='w-full flex text-[13px] relative'>
            <label className='py-[7px] px-[15px] w-[30%] flex'>{label}</label>
            <input className='py-[7px] px-[15px] w-[70%] border-[1px] border-solid border-[#dad5d5] outline-none' type='text' value={value} onChange={changeHandler}
                placeholder={placeholder}
                name={name} />
            {(errors && touched) && <p className='text-[10px] text-red-500 absolute left-[30%] bottom-[-35%]'>{errors}</p>}
        </div>
    )
}

const InputComponentNumber = ({ label, placeholder, name, value, changeHandler, errors, touched }) => {
    return (
        <div className='w-full flex text-[13px] relative'>
            <label className='py-[7px] px-[15px] w-[30%] flex'>{label}</label>
            <input className='py-[7px] px-[15px] w-[70%] border-[1px] border-solid border-[#dad5d5] outline-none' type='number' value={value} onChange={changeHandler}
                placeholder={placeholder}
                name={name} />
            {(errors && touched) && <p className='text-[10px] text-red-500 absolute left-[30%] bottom-[-35%]'>{errors}</p>}
        </div>
    )
}

const InputComponentImage = ({ label, name, changeHandler, value }) => {
    return (
        <div className='w-full flex text-[13px] relative'>
            <label className='py-[7px] px-[15px] w-[30%] flex'>{label}</label>
            <input
                className='py-[7px] px-[15px] w-[70%] border-[1px] border-solid border-[#dad5d5] outline-none'
                type='file' multiple onChange={(e) => changeHandler(e)} name={name}
            />
        </div>
    );
};

const InputComponentSelect = ({ label, name, value, changeHandler, data, errors, touched }) => {
    return (
        <div className='w-full flex text-[13px] relative'>
            <label className='py-[7px] px-[15px] w-[30%] flex'>{label}</label>
            <select className='py-[7px] px-[15px] w-[70%] border-[1px] border-solid border-[#dad5d5] outline-none' name={name} value={value} onChange={changeHandler}>
                <option value={"null"} >Select</option>
                {data?.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>{item.name}</option>
                    )
                })}
            </select>
            {(errors && touched) && <p className='text-[10px] text-red-500 absolute left-[30%] bottom-[-35%]'>{errors}</p>}
        </div>
    );
}

export { InputComponentText, InputComponentNumber, InputComponentImage, InputComponentSelect }