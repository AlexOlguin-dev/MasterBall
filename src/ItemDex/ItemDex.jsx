import React, { useRef, useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ItemList from '../assets/json/Items.json';

const ItemDex = ({ onLoadFinish }) => {
  const topRef = useRef(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadFinish?.(); // finalizar carga cuando esté listo
    }, 10); // simula tiempo de carga
    return () => clearTimeout(timer);
  }, [onLoadFinish]);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredItems = Object.keys(ItemList)
    .filter(key => ItemList[key].name.toLowerCase().includes(filter.toLowerCase()))
    .map(key => ItemList[key]);

  return (
    <Box style={{ position: 'relative', padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }} bgcolor="#383838" minHeight="100vh">
      
      <div ref={topRef}></div>
      <Box style={{ padding: "110px 10px 20px 10px" }}></Box>

      {/* Filtro por nombre */}
      <Box mb={2}>
        <TextField
          plaveholder="By Item Name"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          inputProps={{ autoComplete: 'off' }}
          sx={{
            marginTop: "10px",
            backgroundColor: '#e0e0e0',
            color: '#000',
            borderRadius: 1,
            fontWeight: 'bold',
            fontSize: 14,
            minHeight: 36,
            '& input': {
              padding: '8px',
              color: '#000',
              fontWeight: 'bold',
              fontSize: 14
            },
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }
          }}
        />
      </Box>

      {filteredItems.map((item, index) => (
        <Box
          key={index}
          mb={1}
          p={1}
          borderRadius={2}
          bgcolor="#4a4a4a"
          boxShadow={3}
        >
          {/* Fila con nombre e imagen */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            {/* Nombre a la izquierda */}
            <Typography fontWeight="bold" fontSize={17} color="#fff" ml={1}>
              {item.name}
            </Typography>
        
            {/* Imagen a la derecha */}
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: "#bfbfbf",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={`/assets/img/items/${item.name}.png`}
                alt={item.name}
                style={{ width: 30, height: 30 }}
              />
            </Box>
          </Box>
        
          {/* Caja del efecto debajo */}
          <Box style={{ backgroundColor: "#c4c4c4", borderRadius: "10px" }}>
            <Typography
              fontSize={14}
              whiteSpace="pre-line"
              style={{ textAlign: "center", color: "#000", padding: "5px" }}
            >
              {item.effect}
            </Typography>
          </Box>
        </Box>      
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 50,
          right: 16,
          zIndex: 1000,
          borderRadius: '50%',
          minWidth: 'auto',
          padding: 1.5,
          backgroundColor: '#000'
        }}
      >
        <KeyboardArrowUpIcon />
      </Button>
    </Box>
  );
};

export default ItemDex;