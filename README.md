Models

User

name, email, password, role (admin or customer)

Car

brand, model, year, image, pricePerDay, availability, location

Booking

userId, carId, startDate, endDate, totalPrice, status (pending, confirmed, canceled)

Review

userId, carId, rating, comment

Controllers

AuthController

register, login, logout

CarController

createCar, getAllCars, getCarById, updateCar, deleteCar

BookingController

createBooking, getUserBookings, getAllBookings, updateBookingStatus

ReviewController

addReview, getCarReviews

UserController (optional)

getProfile, updateProfile

Routes

/api/auth

POST /register, POST /login, POST /logout

/api/cars

GET /, POST /, GET /:id, PUT /:id, DELETE /:id

/api/bookings

POST /, GET /user, GET /, PATCH /:id

/api/reviews

POST /:carId, GET /:carId

/api/users

GET /profile, PUT /profile

Middlewares

authMiddleware

verify JWT, protect routes

roleMiddleware

restrict access based on role

errorHandler

global error handling
