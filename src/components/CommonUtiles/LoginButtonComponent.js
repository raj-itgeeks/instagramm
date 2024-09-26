import React from 'react'

const LoginButtonComponent = ({ buttonText, handler, textColor, loader, bg }) => {
    return (
        <div className={`z-[1] cursor-pointer border uppercase text-[14px] flex justify-center items-center font-bodyFont font-medium p-[9px] w-[150px] rounded-full text-${textColor ? textColor : 'white'}`} style={{ backgroundColor: bg }} onClick={(e) => { handler(); }}>
            {loader ? <div className="border-white h-[21px] w-[21px] animate-spin rounded-full border-[3px] border-t-black" /> : buttonText}
        </div>
    )
}

export default LoginButtonComponent