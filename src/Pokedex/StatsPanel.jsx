import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

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
      <Divider style={{ width: "100%" }} />
      <Box display="flex" justifyContent="space-between" mt={1} style={{  }}>
        <Typography variant="body2"></Typography>
        <Typography variant="body2">
          TOTAL&nbsp;&nbsp;&nbsp; {statValues.reduce((acc, val) => acc + val, 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsPanel;