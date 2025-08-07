import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiUrl } from '../lib/api'

const CarDetail = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: ''
  })
  const [bookingLoading, setBookingLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [reviews, setReviews] = useState([])
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [reviewLoading, setReviewLoading] = useState(false)

  async function fetchReviews() {
    try {
      const res = await fetch(apiUrl(`/api/reviews/${id}`), { credentials: 'include' })
      const data = await res.json()
      if (data.success) setReviews(data.reviews || [])
    } catch {}
  }

  const submitReview = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    if (!reviewForm.comment.trim()) return
    setReviewLoading(true)
    try {
      const res = await fetch(apiUrl(`/api/reviews/${id}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewForm)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setReviewForm({ rating: 5, comment: '' })
        fetchReviews()
      }
    } catch {}
    finally { setReviewLoading(false) }
  }

  useEffect(() => {
    fetchCarDetails()
  }, [id])

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(apiUrl(`/api/cars/${id}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setCar(data.car)
        fetchReviews()
      } else {
        setError('Failed to fetch car details')
      }
    } catch (error) {
      console.error('Error fetching car details:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }

    if (!bookingData.startDate || !bookingData.endDate) {
      alert('Please select both start and end dates')
      return
    }

    const startDate = new Date(bookingData.startDate)
    const endDate = new Date(bookingData.endDate)
    
    if (startDate >= endDate) {
      alert('End date must be after start date')
      return
    }

    if (startDate < new Date()) {
      alert('Start date cannot be in the past')
      return
    }

    setBookingLoading(true)

    try {
      const response = await fetch(apiUrl(`/api/bookings/${id}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          startDate: bookingData.startDate,
          endDate: bookingData.endDate
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert('Booking created successfully!')
        navigate('/my-bookings')
      } else {
        alert(data.message || 'Failed to create booking')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Network error. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const calculateTotalPrice = () => {
    if (!bookingData.startDate || !bookingData.endDate || !car) return 0
    
    const startDate = new Date(bookingData.startDate)
    const endDate = new Date(bookingData.endDate)
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    
    return days * car.pricePerDay
  }

  const nextImage = () => {
    if (car && car.image && car.image.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % car.image.length)
    }
  }

  const prevImage = () => {
    if (car && car.image && car.image.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + car.image.length) % car.image.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-[#F87060] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md">
            {error || 'Car not found'}
          </div>
          <button 
            onClick={() => navigate('/cars')}
            className="mt-4 bg-[#F87060] hover:bg-[#e65a4a] text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Back to Cars
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <button onClick={() => navigate('/cars')} className="hover:text-[#F87060] transition-colors duration-200">
                Cars
              </button>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="text-[#102542] font-medium">
              {car.brand} {car.model}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Images */}
          <div className="space-y-4">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                {car.image && car.image.length > 0 ? (
                  <img 
                    src={car.image[currentImageIndex]} 
                    alt={`${car.brand} ${car.model}`} 
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Image Navigation */}
              {car.image && car.image.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {car.image && car.image.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {car.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex ? 'border-[#F87060]' : 'border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${car.brand} ${car.model} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car Details and Booking */}
          <div className="space-y-6">
            {/* Car Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-[#102542] mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-xl text-[#F87060] font-semibold mb-4">
                ${car.pricePerDay}/day
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#F87060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">{car.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#F87060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">{car.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#F87060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">{car.availability || 'Available'}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-[#102542] mb-2">Description</h3>
                <p className="text-gray-600">
                  Experience luxury and comfort with this {car.year} {car.brand} {car.model}. 
                  Perfect for your next adventure, this vehicle offers premium features and 
                  exceptional performance. Located in {car.location} for your convenience.
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#102542] mb-4">Book This Car</h2>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#102542] mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#102542] mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                      min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                    />
                  </div>
                </div>

                {bookingData.startDate && bookingData.endDate && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Price:</span>
                      <span className="text-2xl font-bold text-[#F87060]">
                        ${calculateTotalPrice()}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={bookingLoading || !user}
                  className="w-full bg-[#F87060] hover:bg-[#e65a4a] disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:cursor-not-allowed"
                >
                  {bookingLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : !user ? (
                    'Login to Book'
                  ) : (
                    'Book Now'
                  )}
                </button>

                {!user && (
                  <p className="text-sm text-gray-600 text-center">
                    Please <button 
                      onClick={() => navigate('/login')}
                      className="text-[#F87060] hover:text-[#e65a4a] font-medium"
                    >
                      login
                    </button> to book this car.
                  </p>
                )}
              </form>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#102542] mb-4">Reviews</h2>
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {reviews.map((r) => (
                    <div key={r._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < r.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Review */}
              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#102542] mb-2">Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                  >
                    {[5,4,3,2,1].map(n => (
                      <option key={n} value={n}>{n} Star{n>1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#102542] mb-2">Comment</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    rows={3}
                    placeholder="Share your experience..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={reviewLoading || !user}
                  className="w-full bg-[#102542] hover:bg-[#0a1a2e] disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold"
                >
                  {user ? (reviewLoading ? 'Posting...' : 'Post Review') : 'Login to review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
