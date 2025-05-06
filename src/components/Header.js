'use client'
import React, { useContext, useEffect, useState } from 'react';
import AddDoctorModal from './AddDoctorModal';
import { SearchContext } from '@/context/useSearch';

const Header = () => {
    const {setSearchName} = useContext(SearchContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('')
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [debouncedName, setDebouncedName] = useState(name)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedName(name)
        },300)

        return () => clearTimeout(handler)
    },[name])

    useEffect(() => {
        setSearchName(debouncedName)
    },[debouncedName])

  return (
    <div className="flex justify-between items-center space-x-5 mt-3">
      <img className='w-12' src='https://images.apollo247.in/images/icons/apollo247.svg'/>
      <div> Select location</div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-1/2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Search Doctors"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src="/search.png"
            alt="Search"
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <button 
      onClick={() => handleOpenModal()}
      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
        Add Doctor
        </button>
        <AddDoctorModal isOpen={isModalOpen} onClose={handleCloseModal} />

    </div>
  );
};

export default Header;
