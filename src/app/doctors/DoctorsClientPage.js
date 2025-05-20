'use client'
import { fetchDoctors } from '@/services/doctorServices'
import Card from '../../components/Card'
import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '@/context/useSearch'

export default function DoctorsClientPage () {
  const {searchName} = useContext(SearchContext)
  const [allDoctors, setAllDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [specialities, setSpecialities] = useState([])
  const [experience, setExperience] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [page, setPage] = useState(1)
  

  useEffect(() => {
    const getDoctors = async () => {
      const response = await fetchDoctors(page)
      setAllDoctors((prev) => [...prev, ...response])
      setFilteredDoctors(response)
    }
    getDoctors()
  }, [page])

  useEffect(() => {
    let filtered = [...allDoctors]

    if (specialities.length > 0) {
      filtered = filtered.filter(doctor =>
        specialities.includes(doctor.specialization)
      )
    }

    if (experience === '0-5') {
      filtered = filtered.filter(doc => doc.experience <= 5)
    } else if (experience === '5-10') {
      filtered = filtered.filter(doc => doc.experience > 5 && doc.experience <= 10)
    } else if (experience === '10+') {
      filtered = filtered.filter(doc => doc.experience > 10)
    }

    if (priceRange === '0-500') {
      filtered = filtered.filter(doc => doc.price <= 500)
    } else if (priceRange === '500-1000') {
      filtered = filtered.filter(doc => doc.price > 500 && doc.price <= 1000)
    } else if (priceRange === '1000+') {
      filtered = filtered.filter(doc => doc.price > 1000)
    }

    if (searchName != '') {
        filtered = filtered.filter(doc => doc.name.toLowerCase().includes(searchName.toLowerCase()))
    }
    setFilteredDoctors(filtered)
  }, [specialities, experience, priceRange, allDoctors,page,searchName])

  const handlespecializationChange = (e) => {
    const value = e.target.value
    setSpecialities(prev =>
      prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value]
    )
  }

  const handleResetFilters = () => {
    setSpecialities([])
    setExperience('')
    setPriceRange('')
    setPage(1)
  }
  const handlePageNext = () => {
    setPage((prev => prev+1))
    console.log(page)
    
  }
  const handlePagePrevious = () => {
    setPage((prev => prev-1))
    console.log(page)
    
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r space-y-6">
        <div>
          <h3 className="font-semibold mb-2">specialization</h3>
          {[ "General Physician",
            "Cardiologist",
            "Dermatologist",
            "Pediatrician",
            "Gynecologist",
            "ENT Specialist",
            "Neurologist",
            "Psychiatrist"].map(spec => (
            <div key={spec}>
              <label>
                <input
                  type="checkbox"
                  value={spec}
                  onChange={handlespecializationChange}
                  checked={specialities.includes(spec)}
                  className="mr-2"
                />
                {spec}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Experience</h3>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border p-1"
          >
            <option value="">Any</option>
            <option value="0-5">0–5 years</option>
            <option value="5-10">5–10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Price</h3>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border p-1"
          >
            <option value="">Any</option>
            <option value="0-500">₹0–500</option>
            <option value="500-1000">₹500–1000</option>
            <option value="1000+">₹1000+</option>
          </select>
        </div>

        <button 
          onClick={handleResetFilters}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
        >
          Reset Filters
        </button>
      </div>

      <div className="w-3/4 p-4 space-y-4">
        <h1 className="text-3xl mb-4">Doctors Listing</h1>
        {filteredDoctors.length === 0 ? (
          <div>No doctors found.</div>
        ) : (
          filteredDoctors.map((doctor, index) => (
            <Card key={index} doctor={doctor} />
          ))
        )}
      {page>1 && <button
      className='bg-gray-100 p-2'
      onClick={() => handlePagePrevious()}>Previous Page</button>}
      <button
      className='bg-gray-100 p-2'
      onClick={() => handlePageNext()}>Next Page</button>
      </div>
    </div>
  )
}

