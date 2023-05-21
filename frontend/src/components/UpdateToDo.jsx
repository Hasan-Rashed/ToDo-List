import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, FormGroup, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UpdateToDo = () => {

    const [text, setText] = useState('');

    
    // Get the id param from the URL.
    const { id } = useParams();


        /* This code block is checking the value of the `VITE_NODE_ENV` environment
    variable. If it is set to `'development'`, it sets the `url` variable to the
    value of the `VITE_PRIVATE_URL` environment variable plus the string
    `'/api/goals'`. If it is set to `'production'`, it sets the `url` variable to
    the string `'https://todo-app-2021.herokuapp.com/api/goals'`. This allows the
    code to use different URLs for the API depending on whether it is running in a
    development or production environment. */
    if(import.meta.env.VITE_NODE_ENV === 'development'){
        var url = import.meta.env.VITE_PRIVATE_URL+`/api/goals/${id}`;
    }else if(import.meta.env.VITE_NODE_ENV === 'production'){
        var url = import.meta.env.VITE_PUBLIC_URL;
    }


/* Used to programmatically navigate to a different route in the application. */
    const navigate = useNavigate();

    /**
     * This is a function that handles updating data using an HTTP PUT request with
     * error handling.
     */
    const handleUpdateRequest = async () => {
        try {
        const response = await axios.put(url, { text });
        // Handle the response if needed
        console.log(response.data);
        console.log(text);
        setText('');

        // Navigate to the home page after updating the data
        navigate('/');
        
        } catch (error) {
        // Handle the error if needed
        console.error(error);
        }
    };


    useEffect(() => {
    
    }, [text])
    
    
    return (
        <div className="container mx-auto text-center py-5  justify-center items-center h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Update Task</h1>

            <FormGroup row className='my-5 justify-center' >
                <TextField variant="outlined" placeholder="Add a todo" value={text} onChange={(e) => setText(e.target.value)} />
                <Button variant="contained" disableElevation onClick={handleUpdateRequest} > Update Task </Button>
            </FormGroup>

        </div>
    )
}

export default UpdateToDo