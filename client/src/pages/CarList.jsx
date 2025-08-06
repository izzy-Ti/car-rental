import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CarList = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [sortBy, setSortBy] = useState('price')

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cars/')
      const data = await response.json()
      
      if (data.success) {
        setCars(data.car)
      } else {
        setError('Failed to fetch cars')
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort cars
  const filteredAndSortedCars = cars
    .filter(car => {
      const matchesSearch = car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.location?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = !filterBrand || car.brand === filterBrand
      const matchesLocation = !filterLocation || car.location === filterLocation
      
      return matchesSearch && matchesBrand && matchesLocation
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerDay - b.pricePerDay
        case 'price-desc':
          return b.pricePerDay - a.pricePerDay
        case 'year':
          return b.year - a.year
        case 'brand':
          return a.brand?.localeCompare(b.brand)
        default:
          return 0
      }
    })

  // Get unique brands and locations for filters
  const uniqueBrands = [...new Set(cars.map(car => car.brand).filter(Boolean))]
  const uniqueLocations = [...new Set(cars.map(car => car.location).filter(Boolean))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-[#F87060] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md">
            {error}
          </div>
          <button 
            onClick={fetchCars}
            className="mt-4 bg-[#F87060] hover:bg-[#e65a4a] text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#102542] mb-4">
            Available Cars
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of premium vehicles for your next adventure
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-[#102542] mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
              />
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-[#102542] mb-2">
                Brand
              </label>
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
              >
                <option value="">All Brands</option>
                {uniqueBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-[#102542] mb-2">
                Location
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-[#102542] mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
              >
                <option value="price">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year">Year: Newest First</option>
                <option value="brand">Brand: A-Z</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterBrand('')
                  setFilterLocation('')
                  setSortBy('price')
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedCars.length} of {cars.length} cars
          </p>
        </div>

        {/* Cars Grid */}
        {filteredAndSortedCars.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No cars found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCars.map((car) => (
              <div key={car._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Car Image */}
                <div className="h-48 bg-gray-200 relative">
                  {car.image && car.image.length > 0 ? (
                    <img 
                      src={car.image[0]} 
                      alt={`${car.brand} ${car.model}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="bg-[#F87060] text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ${car.pricePerDay}/day
                    </span>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#102542] mb-2">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {car.location}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#F87060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {car.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#F87060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {car.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#F87060]">
                      ${car.pricePerDay}/day
                    </span>
                    <Link
                      to={`/car/${car._id}`}
                      className="bg-[#102542] hover:bg-[#0a1a2e] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CarList
