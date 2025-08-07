import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => (
  <section className="bg-gradient-to-r from-[#102542] to-[#1a365d] py-20 px-4">
    <div className="max-w-6xl mx-auto text-center text-white">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Drive Your <span className="text-[#F87060]">Dreams</span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Discover premium vehicles for every journey. From luxury sedans to powerful SUVs, 
        we have the perfect car for your adventure.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/cars" 
          className="bg-[#F87060] hover:bg-[#e65a4a] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Browse Cars
        </Link>
        <Link 
          to="/register" 
          className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#102542] transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  </section>
)

const FeaturedCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('https://car-rental-1xr3.onrender.com/api/cars/')
      const data = await response.json()
      if (data.success) {
        // Get 4 random cars from the array
        const shuffled = data.car.sort(() => 0.5 - Math.random())
        setCars(shuffled.slice(0, 4))
      } else {
        console.error('Failed to fetch cars')
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#102542] mb-4">
            Featured Vehicles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium vehicles for your next adventure
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-[#F87060] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading featured cars...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cars.map((car) => (
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
    </section>
  )
}

const Features = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#102542] mb-4">
          Why Choose Carrentsl House?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We provide exceptional car rental services with premium vehicles and outstanding customer support
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="bg-[#F87060] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#102542] mb-2">Premium Vehicles</h3>
          <p className="text-gray-600">Handpicked luxury and premium cars for your comfort and style</p>
        </div>

        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="bg-[#F87060] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#102542] mb-2">Best Prices</h3>
          <p className="text-gray-600">Competitive rates and transparent pricing with no hidden fees</p>
        </div>

        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="bg-[#F87060] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#102542] mb-2">24/7 Support</h3>
          <p className="text-gray-600">Round-the-clock customer support for all your rental needs</p>
        </div>
      </div>
    </div>
  </section>
)

const CTA = () => (
  <section className="py-16 bg-[#102542]">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Start Your Journey?
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        Join thousands of satisfied customers who trust us for their car rental needs
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/register" 
          className="bg-[#F87060] hover:bg-[#e65a4a] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started Today
        </Link>
        <Link 
          to="/cars" 
          className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#102542] transition-all duration-300"
        >
          Browse All Cars
        </Link>
      </div>
    </div>
  </section>
)

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCars />
      <Features />
      <CTA />
    </div>
  )
}

export default Home
