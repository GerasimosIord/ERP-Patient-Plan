import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Box, CircularProgress } from '@mui/material';

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

  const handleInitialAnxietyChange = (e) => {
    const value = e.target.value;
    setInitialAnxiety(value);
    validateAnxiety(value);
  };

  const handleFinalAnxietyChange = (e) => {
    const value = e.target.value;
    setFinalAnxiety(value);
    validateAnxiety(value);
  };

  if (!exposure) {
    return <Typography>Exposure not found</Typography>;
  }

  return (
    <Box className="card">
      <Typography variant="h4" gutterBottom>{exposure.description}</Typography>
      <Typography variant="subtitle1" gutterBottom>Anxiety Level: {exposure.anxietyLevel}</Typography>
      
      <Box my={4} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress variant="determinate" value={(timer % 60) / 60 * 100} size={120} thickness={4} />
        <Typography variant="h4" style={{ position: 'absolute' }}>
          {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
        </Typography>
      </Box>

      <Button 
        className={isRunning ? "button-secondary" : "button-primary"}
        onClick={handleStartStop}
        fullWidth
        style={{ marginBottom: '20px' }}
      >
        {isRunning ? "Stop" : "Start"}
      </Button>

      <TextField
        label="Initial Anxiety (0-10)"
        type="number"
        value={initialAnxiety}
        onChange={handleInitialAnxietyChange}
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
        onChange={handleFinalAnxietyChange}
        error={!!anxietyError}
        helperText={anxietyError}
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 10 }}
      />

      <TextField
        label="Notes"
        multiline
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button className="button-primary" onClick={handleComplete} fullWidth>
        Complete Session
      </Button>
    </Box>
  );
}

export default ExposureSession;