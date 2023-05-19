import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Lists = ({ text, id }) => {


  /* This code defines a function called `handleDelete` that sends a DELETE
  request to a specified endpoint using the axios library. The endpoint is
  specified using a template literal that includes the `id` parameter passed to
  the function. The function is marked as `async` to allow the use of `await`
  when making the request. If the request is successful, the response data is
  logged to the console. If there is an error, the error is logged to the
  console. */
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/goals/${id}`);
      // Handle the response if needed
      // console.log(response.data);
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