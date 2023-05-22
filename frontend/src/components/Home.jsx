import React, { useState, useEffect } from 'react';
import { Button, FormGroup, TextField } from '@mui/material';
import Lists from './Lists';
import axios from 'axios';
import RingLoader from "react-spinners/RingLoader";
import { DataProvider } from '../context/Context';
import { HashLoader } from 'react-spinners';



const Home = () => {
  const [data, setData] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  /* This code block is checking the value of the `VITE_NODE_ENV` environment
  variable. If it is set to `'development'`, it sets the `url` variable to the
  value of the `VITE_PRIVATE_URL` environment variable plus the string
  `'/api/goals'`. If it is set to `'production'`, it sets the `url` variable to
  the string `'https://todo-app-2021.herokuapp.com/api/goals'`. This allows the
  code to use different URLs for the API depending on whether it is running in a
  development or production environment. */
  if(import.meta.env.VITE_NODE_ENV === 'development'){
    var url = import.meta.env.VITE_PRIVATE_URL+`/api/goals`;
  }else if(import.meta.env.VITE_NODE_ENV === 'production'){
    var url = import.meta.env.VITE_PUBLIC_URL+`/api/goals`;
  }


 /**
  * This function fetches data from a specified URL using axios and sets the
  * response data to a state variable while also logging the data to the console.
  */
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * This is an asynchronous function that sends a POST request using axios and
   * logs the response data or any errors to the console.
   */
  const handlePostRequest = async () => {
    try {
      const response = await axios.post(url, { text });
      console.log(response.data); // Process the response data

      // clear the text field
      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

  }, [data]);

  
  // }else if(data.length === 0){
  //   return <div>no data found</div>
  // }else{
  
  return (
    <div>
      {
        loading ? (<div className="flex justify-center items-center h-screen mx-auto"> <HashLoader color="#1C2833" size={50} /> </div>) : (
        <div className="container hover:text-white mx-auto text-center py-5  justify-center h-auto">
          <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold">What's the plan for today?</h1>

              <FormGroup row className='my-5 justify-center' >
                  <TextField variant="outlined" placeholder="Add a todo" value={text} onChange={(e) => setText(e.target.value)} />
                  <Button variant="contained" disableElevation onClick={handlePostRequest} > Add task </Button>
              </FormGroup>

              {/* <Lists /> */}
              <ul className='list-none'>
                {
                  data.map((item, index) => (
                    <li key={index}><Lists text = {item.text} id = {item._id} /></li>
                  ))
                }
              </ul>
          </div>
        </div> 
      )
      }
    </div>
  )
}
// }

export default Home