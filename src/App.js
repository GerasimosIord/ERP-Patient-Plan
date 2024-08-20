import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, Paper, Box, CircularProgress, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import ExposureHierarchy from './components/ExposureHierarchy';
import ExposureSession from './components/ExposureSession';
import ProgressTracker from './components/ProgressTracker';
import Settings from './components/Settings';

const defaultErpPlan = {
  categories: [
    {
      name: "Door Locking (Checking OCD)",
      exposures: [
        { description: "Leave a room without checking the door", anxietyLevel: "low" },
        { description: "Lock the door once and walk away immediately", anxietyLevel: "moderate" },
        { description: "Lock the door and don't check it for increasing periods of time", anxietyLevel: "high" },
        { description: "Go to sleep without checking doors", anxietyLevel: "very high" }
      ]
    },
    {
      name: "Studying Perfectionism",
      exposures: [
        { description: "Study for 30 minutes using a non-optimal method", anxietyLevel: "low" },
        { description: "Submit an assignment without triple-checking it", anxietyLevel: "moderate" },
        { description: "Attend a class without pre-reading the material", anxietyLevel: "high" },
        { description: "Take a test without over-preparing", anxietyLevel: "very high" }
      ]
    },
    {
      name: "Moral Judgments and Reactions to Disagreement",
      exposures: [
        { description: "Read an opinion piece that slightly disagrees with your views", anxietyLevel: "low" },
        { description: "Have a conversation with someone whose values differ from yours on a minor issue", anxietyLevel: "moderate" },
        { description: "Engage in a discussion about a topic where you have strong opinions, allowing others to disagree", anxietyLevel: "high" },
        { description: "Attend a debate or forum where views opposite to yours are presented", anxietyLevel: "very high" },
        { description: "Write out arguments supporting a view you strongly disagree with", anxietyLevel: "very high" }
      ]
    },
    {
      name: "Retroactive Jealousy",
      exposures: [
        { description: "Look at a photo of your girlfriend with male friends", anxietyLevel: "low" },
        { description: "Discuss a neutral topic about your girlfriend's past", anxietyLevel: "moderate" },
        { description: "Have your girlfriend tell you about a past flirtatious interaction", anxietyLevel: "high" },
        { description: "Imagine your girlfriend in a romantic situation with a past partner", anxietyLevel: "very high" }
      ]
    },
    {
      name: "Compulsion for Constant Productivity",
      exposures: [
        { description: "Sit quietly for 5 minutes without engaging in any productive activity", anxietyLevel: "low" },
        { description: "Take a 15-minute break between study sessions without researching or being productive", anxietyLevel: "moderate" },
        { description: "Spend an hour engaging in a purely leisurely activity with no educational value", anxietyLevel: "high" },
        { description: "Take a full day off from studying or researching, focusing on relaxation or non-productive activities", anxietyLevel: "very high" }
      ]
    }
  ],
  progressLogs: []
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [erpPlan, setErpPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedPlan = localStorage.getItem('erpPlan');
    if (storedPlan) {
      setErpPlan(JSON.parse(storedPlan));
    } else {
      setErpPlan(defaultErpPlan);
    }
    setIsLoading(false);
  }, []);

  const saveErpPlan = (updatedPlan) => {
    setErpPlan(updatedPlan);
    localStorage.setItem('erpPlan', JSON.stringify(updatedPlan));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">OCD ERP Plan</Typography>
            <nav>
              <Link to="/" style={{ color: 'white', marginLeft: 20 }}>Hierarchy</Link>
              <Link to="/progress" style={{ color: 'white', marginLeft: 20 }}>Progress</Link>
              <Link to="/settings" style={{ color: 'white', marginLeft: 20 }}>Settings</Link>
            </nav>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<ExposureHierarchy erpPlan={erpPlan} />} />
            <Route path="/session/:categoryId/:exposureId" element={<ExposureSession erpPlan={erpPlan} saveErpPlan={saveErpPlan} />} />
            <Route path="/progress" element={<ProgressTracker erpPlan={erpPlan} />} />
            <Route path="/settings" element={<Settings erpPlan={erpPlan} saveErpPlan={saveErpPlan} />} />
          </Routes>
        </Container>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <List component="nav">
            <ListItem button component={Link} to="/">
              <ListItemText primary="Hierarchy" />
            </ListItem>
            <ListItem button component={Link} to="/progress">
              <ListItemText primary="Progress" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;