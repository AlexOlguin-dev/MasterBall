import React from 'react';
import { Box, Typography } from '@mui/material';

const StatsPanel = ({ estadisticas }) => {
  const maxStat = 255; // para normalizar ancho
  const statLabels = ['HP', 'ATT', 'DEF', 'SPA', 'SPD', 'SPE'];
  const statValues = Object.values(estadisticas);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {statLabels.map((label, index) => {
        const value = statValues[index] || 0;

        return (
          <Box key={label} display="flex" alignItems="center">
            <Box width={60}>
              <Typography variant="body2">{label}</Typography>
            </Box>
            <Box
              flexGrow={1}
              mx={1}
              height={24}
              bgcolor="#e0e0e0"
              borderRadius={4}
              position="relative"
              display="flex"
              alignItems="center"
            >
              <Box
                height="100%"
                width={`${(value / maxStat) * 90}%`}
                bgcolor="#3f51b5"
                borderRadius={4}
              />
            </Box>
            <Box width={32}>
              <Typography variant="body2" align="right">
                {value}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default StatsPanel;