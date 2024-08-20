import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Box, CircularProgress, Paper } from '@mui/material';

function ExposureSession({ erpPlan, saveErpPlan }) {
  const { categoryId, exposureId } = useParams();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialAnxiety, setInitialAnxiety] = useState('');
  const [finalAnxiety, setFinalAnxiety] = useState('');
  const [anxietyError, setAnxietyError] = useState('');
  const [notes, setNotes] = useState('');

  const exposure = erpPlan?.categories[categoryId]?.exposures[exposureId];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleComplete = () => {
    if (validateAnxiety(initialAnxiety) && validateAnxiety(finalAnxiety)) {
      const newLog = {
        date: new Date().toISOString(),
        categoryName: erpPlan.categories[categoryId].name,
        exposureDescription: exposure.description,
        duration: timer,
        initialAnxiety: parseInt(initialAnxiety),
        finalAnxiety: parseInt(finalAnxiety),
        notes: notes
      };

      const updatedPlan = {
        ...erpPlan,
        progressLogs: [...erpPlan.progressLogs, newLog]
      };

      saveErpPlan(updatedPlan);
      navigate('/');
    } else {
      setAnxietyError('Please enter valid anxiety levels (0-10) before completing the session.');
    }
  };

  const validateAnxiety = (value) => {
    const anxietyLevel = parseInt(value);
    if (isNaN(anxietyLevel) || anxietyLevel < 0 || anxietyLevel > 10) {
      setAnxietyError('Anxiety level must be between 0 and 10');
      return false;
    }
    setAnxietyError('');
    return true;
  };

  const handleAnxietyChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    validateAnxiety(value);
  };

  if (!exposure) {
    return <Typography variant="body1">Exposure not found</Typography>;
  }

  return (
    <Box className="card" pb={4}>
      <Typography variant="h5" gutterBottom>{exposure.description}</Typography>
      <Typography variant="subtitle2" gutterBottom>Anxiety Level: {exposure.anxietyLevel}</Typography>
      
      <Paper elevation={3} sx={{ p: 2, my: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={2}>
          <CircularProgress variant="determinate" value={(timer % 60) / 60 * 100} size={100} thickness={4} />
          <Typography variant="h5" style={{ position: 'absolute' }}>
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>

        <Button 
          variant="contained"
          color={isRunning ? "secondary" : "primary"}
          onClick={handleStartStop}
          fullWidth
        >
          {isRunning ? "Stop" : "Start"}
        </Button>
      </Paper>

      <TextField
        label="Initial Anxiety (0-10)"
        type="number"
        value={initialAnxiety}
        onChange={handleAnxietyChange(setInitialAnxiety)}
        error={!!anxietyError}
        helperText={anxietyError}
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 10 }}
      />

      <TextField
        label="Final Anxiety (0-10)"
        type="number"
        value={finalAnxiety}
        onChange={handleAnxietyChange(setFinalAnxiety)}
        error={!!anxietyError}
        helperText={anxietyError}
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 10 }}
      />

      <TextField
        label="Notes"
        multiline
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleComplete} 
        fullWidth
        size="large"
        sx={{ mt: 2 }}
      >
        Complete Session
      </Button>
    </Box>
  );
}

export default ExposureSession;