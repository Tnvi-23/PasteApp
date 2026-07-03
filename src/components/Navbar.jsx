import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [click , setClick] = useState(false)
  return (
    <div className='flex flex-row gap-8 p-2 pl-7 justify-center bg-gray-700 text-white'>
        <NavLink to='/' className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-semibold"
            : "text-white "
        }>
            Home
        </NavLink>
        <NavLink to='/pastes' className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-semibold"
            : "text-white "
        }>
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar