import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = {name : 'John Doe'}
    const navigate = useNavigate();
    const logoutuser = () => {
        navigate('/')
    }

  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to = '/'>
                <img src="/logo.svg" alt="logo" className='h-11 w-auto'/>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className ='max-sm:hidden'>
                    Hi, {user.name}
                </p>
                <button onClick={logoutuser} className='bg-slate-200 hover:bg-green-500 border border-green-100 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar