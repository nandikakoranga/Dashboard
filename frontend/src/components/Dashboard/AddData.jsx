import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';

const AddData = ({ onAddData }) => {
    const [formData, setFormData] = useState({
        country: '',
        title: '',
        region: '',
        sector: '',
        topic: '',
        insight: '',
        startYear: '',
        endYear: '',
        pestle: '',
        source: '',
        intensity: '',
        likelihood: '',
        published: '',
        impact: ''
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/addData', formData);
            const { message, newData } = response.data;
            toast({
                title: 'Data Added',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setFormData({
                country: '',
                title: '',
                region: '',
                sector: '',
                topic: '',
                insight: '',
                startYear: '',
                endYear: '',
                pestle: '',
                source: '',
                intensity: '',
                likelihood: '',
                published: '',
                impact: ''
            });
            // Optional: Call parent function to update UI with new data
            if (onAddData) {
                onAddData(newData);
            }
        } catch (error) {
            console.error('Error adding data:', error);
            toast({
                title: 'Error',
                description: 'Failed to add data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box mt={8}>
            <form onSubmit={handleSubmit}>
                <FormControl id="country" mb={4}>
                    <FormLabel>Country</FormLabel>
                    <Input type="text" name="country" value={formData.country} onChange={handleChange} />
                </FormControl>
                <FormControl id="title" mb={4}>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" name="title" value={formData.title} onChange={handleChange} />
                </FormControl>
                {/* Add more form fields for other data properties */}
                <Button colorScheme="teal" type="submit">
                    Add Data
                </Button>
            </form>
        </Box>
    );
};

export default AddData;
