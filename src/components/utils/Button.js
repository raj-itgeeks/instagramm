import React from 'react'

function Button({ jsonObj }) {
  const { text, borderRadius } = jsonObj;
  return (
    <div className='bg-[#FFC5C5] text-[#333333] hover:bg-[#FF99CC] transition-all duration-200 ease-in-out p-[2px] text-center  h-5 ' style={{ borderRadius: borderRadius }}>{text}</div>
  )
}

export default Button

