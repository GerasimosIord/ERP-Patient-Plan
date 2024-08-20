import React, { useState } from 'react';
import { Typography, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function Settings({ erpPlan, saveErpPlan }) {
  const [reminderTime, setReminderTime] = useState('09:00');
  const [openDialog, setOpenDialog] = useState(false);

  const handleReminderChange = (event) => {
    setReminderTime(event.target.value);
  };

  const handleSaveSettings = () => {
    // Here you would typically save the reminder time to the user's settings
    console.log('Reminder time saved:', reminderTime);
  };

  const handleReset = () => {
    setOpenDialog(true);
  };

  const handleConfirmReset = () => {
    const resetPlan = {
      ...erpPlan,
      progressLogs: []
    };
    saveErpPlan(resetPlan);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      
      <TextField
        label="Daily Reminder Time"
        type="time"
        value={reminderTime}
        onChange={handleReminderChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        fullWidth
        margin="normal"
      />
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSaveSettings}
        fullWidth
        style={{ marginTop: '20px' }}
      >
        Save Settings
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleReset}
        fullWidth
        style={{ marginTop: '20px' }}
      >
        Reset All Progress
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reset Progress?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reset all progress? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmReset} color="secondary" autoFocus>
            Confirm Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Settings;