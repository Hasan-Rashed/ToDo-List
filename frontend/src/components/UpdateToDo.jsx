import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, FormGroup, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UpdateToDo = () => {

    const [text, setText] = useState('');

    
    // Get the id param from the URL.
    const { id } = useParams();

/* Used to programmatically navigate to a different route in the application. */
    const navigate = useNavigate();

    /**
     * This is a function that handles updating data using an HTTP PUT request with
     * error handling.
     */
    const handleUpdateRequest = async () => {
        try {
        const response = await axios.put(`http://localhost:5000/api/goals/${id}`, { text });
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