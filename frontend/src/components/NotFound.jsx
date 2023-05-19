import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container mx-auto text-center py-5  justify-center h-screen">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">404 Not Found</h1>
      <hr />

      <span className='text-blue-600 text-lg' ><Link to="/" >Go to the home page</Link></span>
      
    </div>
  )
}

export default NotFound