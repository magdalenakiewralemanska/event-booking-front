import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Slider,
  Paper,
  Grid
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterPanel = ({
  onFilterApply,
  onFilterCancel,
  minAgeFilter,

  onMinAgeFilterChange
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [minAge, setMinAge] = useState(1);
  const [maxAge, setMaxAge] = useState(100);

  const handleFilterClick = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleFilterApply = () => {
    const filterOptions = {
      minAge: minAge,
      maxAge: maxAge
    };

    onFilterApply(filterOptions);
  };

  const handleFilterCancel = () => {
    setIsPanelOpen(false);
    onFilterCancel();
  };

  const handleMinAgeFilterChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== '') {
      setMinAge(Number(value));
    } else {
      setMinAge(0); // or any other default value
    }
  };

  const handleMaxAgeFilterChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMaxAge(value);
  };

  const handleMinAgeInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilterApply();
    }
  };

  const handleMinAgeInputBlur = () => {
    handleFilterApply();
  };

  const handleMaxAgeInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilterApply();
    }
  };

  const handleMaxAgeInputBlur = () => {
    handleFilterApply();
  };

  return (
    <Box mb={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
        </Grid>
        {isPanelOpen && (
          <Grid item>
            <Box display="flex" alignItems="center" gap={3}>
              <Typography variant="body1" fontWeight="bold">
                Filters:
              </Typography>
              <Box mr={2}>
                <TextField
                  label="Min Age"
                  type="number"
                  value={minAge}
                  onChange={handleMinAgeFilterChange}
                  onKeyPress={handleMinAgeInputKeyPress}
                  onBlur={handleMinAgeInputBlur}
                  InputProps={{ inputProps: { min: 0, max: maxAge } }}
                  size="small"
                  style={{ width: 100 }}
                />
              </Box>
              <Box mr={2}>
                <TextField
                  label="Max Age"
                  type="number"
                  value={maxAge}
                  onChange={handleMaxAgeFilterChange}
                  onKeyPress={handleMaxAgeInputKeyPress}
                  onBlur={handleMaxAgeInputBlur}
                  InputProps={{ inputProps: { min: minAge, max: 100 } }}
                  size="small"
                  style={{ width: 100 }}
                />
              </Box>
              <Button variant="contained" onClick={handleFilterApply}>
                Apply Filters
              </Button>
              <Button variant="outlined" onClick={handleFilterCancel}>
                Cancel
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FilterPanel;
