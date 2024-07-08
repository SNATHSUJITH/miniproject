import React, { useState } from 'react';
import { Box, Typography, InputBase, Button, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const CustomInputBase = styled(InputBase)({
  '& input': {
    fontSize: '1.2rem',
    caretColor: 'black',
  },
});

const CustomButton = styled(Button)({
  backgroundColor: '#303f9f',  // Hexadecimal color code for default blue
  color: '#fff',
  fontSize: '1rem',
  transition: 'transform 0.2s ease-in-out',
  borderRadius: '50px', // Increase borderRadius for a more rounded button
  '&:hover': {
    backgroundColor: '#1565c0',  // Darker shade of blue on hover
    transform: 'scale(1.05)',
  },
});

const ResultBox = styled(Paper)({
  padding: '1rem',
  marginTop: '2rem',
  backgroundColor: '#f5f5f5', // Grey background color
  borderRadius: '8px',
  width: '100%',
  whiteSpace: 'pre-wrap', // To maintain whitespace formatting in code
});

const Sidebar = styled(Box)({
  width: '10%', // Adjust the width of the sidebar as needed
  height: '100vh', // Full height sidebar
  backgroundColor: '#651fff', // Updated to match the main content box color
});

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const callPythonFunction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://suji-api.bhagyaj.in/api/getGeminiResponse', { data: searchText });
      setResult(response.data.result);
    } catch (error) {
      setError('Error calling the API');
      console.error('Error calling the API', error);
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (result) => {
    if (!result) return '';
    // This function can be extended to handle more complex formatting requirements
    return result.replace(/```/g, '');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#e8eaf6', // Light gray background, Which is the background white color
        minHeight: '100vh',
        padding: '0', // Remove default padding
        margin: '0', // Remove default margin
      }}
    >
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          width: { xs: '100%', sm: '80%', md: '80%' }, // Adjust the width of the main content
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem', // Add padding to main content area
        }}
      >
        {/* Rounded rectangle with purple background */}
        <Box
          sx={{
            height: '180px', // Adjust the height as needed, e.g., '300px', '100%', etc.
            width: '1080px', // Adjusted width
            backgroundColor: '#651fff', // Instagram's purple color
            padding: '1rem',
            borderRadius: '16px',
            marginBottom: '2rem',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: '#fff', // White text color
              fontFamily: "'Pacifico', cursive",
              fontWeight: 'bold',
              fontSize: '290%', // Increase font size by 20%
              marginBottom: '0rem',
            }}
          >
            PLACEMENT TRAINER CHATBOT
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#e1f5fe', // White background for search bar
              borderRadius: '8px',
              overflow: 'hidden',
              marginTop: '4rem', // Adds space above the Box
              marginBottom: '2rem', // Adds space below the Box
            }}
          >
            <CustomInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={handleInputChange}
              sx={{ flex: 1, p: 1, borderRadius: 0, border: 0 }}
            />
            <CustomButton variant="contained" onClick={callPythonFunction}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </CustomButton>
          </Box>
        </Box>

        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}

        {result && (

          
          <ResultBox elevation={3} sx={{ width: '75%', backgroundColor: '#e1f5fe' }}>  
            <Typography
              variant="body1"
              component="pre"
              sx={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: "'sans-serif",
                fontWeight: 'bolder',
                fontSize: '160%',
                color: '#000000', // Black text color
              }}
            >
              <code>{formatResult(result)}</code>
            </Typography>
          </ResultBox>
        )}
      </Box>

      {/* Right Sidebar */}
      <Sidebar />
    </Box>
  );
};

export default App;
