import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ExposureHierarchy({ erpPlan }) {
  return (
    <div className="card">
      <Typography variant="h4" gutterBottom>Exposure Hierarchy</Typography>
      {erpPlan && erpPlan.categories.map((category, categoryIndex) => (
        <Accordion key={categoryIndex}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-label={`Expand ${category.name} category`}
          >
            <Typography>{category.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {category.exposures.map((exposure, exposureIndex) => (
                <ListItem 
                  button 
                  component={Link} 
                  to={`/session/${categoryIndex}/${exposureIndex}`} 
                  key={exposureIndex}
                  aria-label={`Start exposure: ${exposure.description}`}
                >
                  <ListItemText 
                    primary={exposure.description} 
                    secondary={`Anxiety Level: ${exposure.anxietyLevel}`} 
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default ExposureHierarchy;