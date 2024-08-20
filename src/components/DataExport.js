import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { CSVLink } from 'react-csv';

function DataExport({ erpPlan }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const prepareCSVData = () => {
    const headers = [
      'Date',
      'Category',
      'Exposure',
      'Initial Anxiety',
      'Final Anxiety',
      'Duration (minutes)',
      'Notes'
    ];

    const data = erpPlan.progressLogs.map(log => [
      formatDate(log.date),
      log.categoryName,
      log.exposureDescription,
      log.initialAnxiety,
      log.finalAnxiety,
      Math.round(log.duration / 60),
      log.notes
    ]);

    return [headers, ...data];
  };

  const csvData = prepareCSVData();
  const fileName = `ERP_Progress_Data_${formatDate(new Date())}.csv`;

  return (
    <Box className="card">
      <Typography variant="h5" gutterBottom>Export Progress Data</Typography>
      <Typography variant="body1" paragraph>
        Export your ERP progress data for clinical interpretation or personal record-keeping.
      </Typography>
      <CSVLink 
        data={csvData} 
        filename={fileName}
        className="button-primary"
        style={{ textDecoration: 'none' }}
      >
        <Button variant="contained" color="primary">
          Download CSV
        </Button>
      </CSVLink>
    </Box>
  );
}

export default DataExport;