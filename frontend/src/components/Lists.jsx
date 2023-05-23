import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Lists = ({ text, id }) => {

  /* This code block is checking the value of the `VITE_NODE_ENV` environment
  variable. If it is set to `'development'`, it sets the `url` variable to the
  value of the `VITE_PRIVATE_URL` environment variable plus the string
  `'/api/goals'`. If it is set to `'production'`, it sets the `url` variable to
  the string `'https://todo-app-2021.herokuapp.com/api/goals'`. This allows the
  code to use different URLs for the API depending on whether it is running in a
  development or production environment. */
  if(import.meta.env.VITE_NODE_ENV === 'development'){
    var url = import.meta.env.VITE_PRIVATE_URL;
  }else if(import.meta.env.VITE_NODE_ENV === 'production'){
    var url = import.meta.env.VITE_PUBLIC_URL;
  }



  /*`handleDelete` sends a DELETE request to a specified endpoint using the axios library. The endpoint is
  specified using a template literal that includes the `id` parameter passed to
  the function. The function is marked as `async` to allow the use of `await`
  when making the request. If the request is successful, the response data is
  logged to the console. If there is an error, the error is logged to the
  console. */
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://todolistbackend.up.railway.app/api/goals/${id}`);
      // Handle the response if needed
      console.log(response.data);
      console.log('Deleted', id);
    } catch (error) {
      // Handle the error if needed
      console.error(error);
    }
  };
  
  return (
    <div  className='text-sm md:text-lg lg:text-xl border-none flex justify-between px-3 py-2 my-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg rounded-md'>
        <strong className='mx-2'>{text}</strong>
        <strong className='mx-2'>
          <AiFillDelete className='inline-block text-red-600 cursor-pointer' onClick={handleDelete} />
          <Link to={`/goal/update/${id}`} >
            <FaEdit className='inline-block text-yellow-800 cursor-pointer mx-2' />
          </Link> 
        </strong>
    </div>
  )
}

export default Lists