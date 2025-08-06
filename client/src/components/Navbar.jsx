import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = ({ user, setUser }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Still remove token and user state even if API call fails
      localStorage.removeItem('token')
      setUser(null)
      navigate('/')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src={logo} 
                alt="Carrentsl House Logo" 
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors duration-200 font-medium text-lg relative group ${
                isActive('/') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F87060] transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/cars" 
              className={`transition-colors duration-200 font-medium text-lg relative group ${
                isActive('/cars') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
              }`}
            >
              Cars
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F87060] transition-all duration-300 ${
                isActive('/cars') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            {user && (
              <>
                <Link 
                  to="/my-bookings" 
                  className={`transition-colors duration-200 font-medium text-lg relative group ${
                    isActive('/my-bookings') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
                  }`}
                >
                  My Bookings
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F87060] transition-all duration-300 ${
                    isActive('/my-bookings') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
                <Link 
                  to="/profile" 
                  className={`transition-colors duration-200 font-medium text-lg relative group ${
                    isActive('/profile') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
                  }`}
                >
                  Profile
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F87060] transition-all duration-300 ${
                    isActive('/profile') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/add-car"
                  className="bg-[#102542] hover:bg-[#0a1a2e] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add Car
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#F87060] hover:bg-[#e65a4a] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-[#102542] text-[#102542] hover:bg-[#102542] hover:text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#F87060] hover:bg-[#e65a4a] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#102542] hover:text-[#F87060] focus:outline-none focus:text-[#F87060] transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 pb-6' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            <Link 
              to="/" 
              className={`transition-colors duration-200 font-medium text-lg py-2 ${
                isActive('/') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className={`transition-colors duration-200 font-medium text-lg py-2 ${
                isActive('/cars') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cars
            </Link>
            {user && (
              <>
                <Link 
                  to="/my-bookings" 
                  className={`transition-colors duration-200 font-medium text-lg py-2 ${
                    isActive('/my-bookings') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link 
                  to="/profile" 
                  className={`transition-colors duration-200 font-medium text-lg py-2 ${
                    isActive('/profile') ? 'text-[#F87060]' : 'text-[#102542] hover:text-[#F87060]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/add-car" 
                  className="text-[#102542] hover:text-[#F87060] transition-colors duration-200 font-medium text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Add Car
                </Link>
              </>
            )}
            <div className="pt-4 space-y-3">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full bg-[#F87060] hover:bg-[#e65a4a] text-white px-6 py-3 rounded-full text-base font-semibold text-center transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full bg-transparent border-2 border-[#102542] text-[#102542] hover:bg-[#102542] hover:text-white px-6 py-3 rounded-full text-base font-semibold text-center transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full bg-[#F87060] hover:bg-[#e65a4a] text-white px-6 py-3 rounded-full text-base font-semibold text-center transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
