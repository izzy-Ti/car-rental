import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CarList from './pages/CarList'
import CarDetail from './pages/CarDetail'
import AddCar from './pages/AddCar'
import EditCar from './pages/EditCar'
import UserBookings from './pages/UserBookings'
import AllBookings from './pages/AllBookings'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token')
    if (token) {
      // You can add a verify token API call here
      setUser({ token })
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F87060] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} setUser={setUser} />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetail user={user} />} />
          <Route path="/add-car" element={user ? <AddCar /> : <Navigate to="/login" />} />
          <Route path="/edit-car/:id" element={user ? <EditCar /> : <Navigate to="/login" />} />
          <Route path="/my-bookings" element={user ? <UserBookings /> : <Navigate to="/login" />} />
          <Route path="/all-bookings" element={user ? <AllBookings /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
