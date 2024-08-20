import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DataExport from './DataExport';

function ProgressTracker({ erpPlan }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const chartData = erpPlan?.progressLogs.map(log => ({
    date: formatDate(log.date),
    initialAnxiety: log.initialAnxiety,
    finalAnxiety: log.finalAnxiety
  }));

  return (
    <Box className="card">
      <Typography variant="h4" gutterBottom>Progress Tracker</Typography>
      
      {erpPlan?.progressLogs.length > 0 ? (
        <>
          <Box height={400} mb={4}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="initialAnxiety" stroke="#8884d8" name="Initial Anxiety" strokeWidth={2} />
                <Line type="monotone" dataKey="finalAnxiety" stroke="#82ca9d" name="Final Anxiety" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          
          <List>
            {erpPlan.progressLogs.map((log, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${log.categoryName}: ${log.exposureDescription}`}
                  secondary={`Date: ${formatDate(log.date)}, Duration: ${Math.floor(log.duration / 60)}:${(log.duration % 60).toString().padStart(2, '0')}, Initial Anxiety: ${log.initialAnxiety}, Final Anxiety: ${log.finalAnxiety}`}
                />
              </ListItem>
            ))}
          </List>

          <Box mt={4}>
            <DataExport erpPlan={erpPlan} />
          </Box>
        </>
      ) : (
        <Typography>No progress logs yet. Complete some exposures to see your progress!</Typography>
      )}
    </Box>
  );
}

export default ProgressTracker;