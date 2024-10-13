import React from 'react'

// the navbar component
const Navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-900 text-white py-3 text-xl'>
            <div className="logo font-bold mx-20"><h2 className='m-2'>Get it Done</h2></div>
            <ul className='flex gap-8 mx-20'>
                <li className='m-2 cursor-pointer hover:font-bold transition-all flex justify-center items-center' style={{ minWidth: '80px'}}>Home</li>
                <li className='m-2 cursor-pointer hover:font-bold transition-all flex justify-center items-center' style={{ minWidth: '120px'}}>Your tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
