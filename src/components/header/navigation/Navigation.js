import React from 'react'

function Navigation() {
    return (
        <nav className="flex justify-between items-center ml-3 ">
            <ul className="flex gap-[20px] flex-row">
                <li ><a className="text-slate-50 hover:text-slate-200" href="#">Home</a></li>
                <li ><a className="text-slate-50 hover:text-slate-200" href="#">About</a></li>
                <li ><a className="text-slate-50 hover:text-slate-200" href="#">Contact</a></li>
                <li ><a className="text-slate-50 hover:text-slate-200" href="#">Home</a></li>
                <li ><a className="text-slate-50 hover:text-slate-200" href="#">About</a></li>
                <li ><a className="text-slate-50 hover:text-slate-200" href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Navigation