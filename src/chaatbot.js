import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [responseLoading, setResponseLoading] = useState(false);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const fetchResponse = async (query, isEasyVersion = false) => {
        setResponseLoading(true);
        const requestData = isEasyVersion ? `${query}, Explain it like explaining it to a 10 year old.` : query;
        try {
            const response = await axios.post('http://localhost:8000/api/getGeminiResponse', { data: requestData });
            setChatHistory([...chatHistory, { role: 'You', text: query }, { role: 'Bot', text: response.data.result }]);
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setResponseLoading(false);
        }
    };

    const handleSubmit = () => {
        if (input) {
            fetchResponse(input);
            setInput('');
        }
    };

    const handleEasySubmit = () => {
        if (input) {
            fetchResponse(input, true);
            setInput('');
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
                Placement Trainer Chatbot
            </Typography>
            <TextField
                label="Hey there! How can I help you?"
                variant="outlined"
                value={input}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: '1rem' }}
            />
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={responseLoading}>
                    Ask
                </Button>
                <Button variant="contained" color="secondary" onClick={handleEasySubmit} disabled={responseLoading}>
                    Easy Version
                </Button>
            </Box>
            <Box sx={{ marginTop: '2rem', width: '100%' }}>
                <Typography variant="h6">Chat History</Typography>
                {chatHistory.map((entry, index) => (
                    <Paper key={index} elevation={3} sx={{ padding: '1rem', marginTop: '1rem' }}>
                        <Typography variant="body1"><strong>{entry.role}:</strong> {entry.text}</Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default Chatbot;
