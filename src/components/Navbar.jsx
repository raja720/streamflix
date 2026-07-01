import React, { useState } from 'react'
import { Bell, User, Search } from 'lucide-react'

const Navbar = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(query)
        }
    }

    return (
        <div className='flex justify-between items-center p-4 bg-black text-white'>
            <div className='text-red-600 font-bold text-xl'>StreamFlix</div>
            <div className='relative grow mx-4'>
                <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='w-full pl-10 px-4 py-2 rounded-full bg-gray-800 text-white'
                    type="text"
                    placeholder="Search for movies, shows..."
                />
            </div>
            <div className='flex items-center gap-4'>
                <Bell size={20} />
                <div className='flex items-center gap-2'>
                    <User size={20} />
                    <span>Profile</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar