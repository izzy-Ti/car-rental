import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCar = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    location: '',
    availability: 'available'
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 3) {
      setError('Maximum 3 images allowed')
      return
    }
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const invalidFiles = files.filter(file => !validTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      setError('Please select only image files (JPEG, PNG, WebP)')
      return
    }

    setImages(files)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (!formData.brand || !formData.model || !formData.year || !formData.pricePerDay || !formData.location) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (images.length === 0) {
      setError('Please select at least one image')
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const formDataToSend = new FormData()
      
      // Append car data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key])
      })
      
      // Append images
      images.forEach(image => {
        formDataToSend.append('image', image)
      })

      const response = await fetch('https://car-rental-1xr3.onrender.com/api/cars/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: formDataToSend
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert('Car added successfully!')
        navigate('/cars')
      } else {
        setError(data.message || 'Failed to add car')
      }
    } catch (error) {
      console.error('Error adding car:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#102542] mb-4">
            Add New Car
          </h1>
          <p className="text-lg text-gray-600">
            Add a new vehicle to your car rental inventory
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Car Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#102542] mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                  placeholder="e.g., Toyota, BMW, Mercedes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#102542] mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                  placeholder="e.g., Camry, X5, C-Class"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#102542] mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                  placeholder="e.g., 2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#102542] mb-2">
                  Price per Day ($) *
                </label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                  placeholder="e.g., 50.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#102542] mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                  placeholder="e.g., New York, Los Angeles"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#102542] mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F87060] focus:border-[#F87060]"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-[#102542] mb-2">
                Car Images * (Max 3 images)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#F87060] transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-[#F87060] hover:text-[#e65a4a] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#F87060]">
                      <span>Upload images</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, WebP up to 10MB each</p>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-[#102542] mb-2">Selected Images:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/cars')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#F87060] hover:bg-[#e65a4a] disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Car...
                  </div>
                ) : (
                  'Add Car'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCar
