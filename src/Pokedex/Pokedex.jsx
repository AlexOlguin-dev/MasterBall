import React, { useState } from 'react';
import { Box, Typography, Avatar, Select, MenuItem, TextField } from '@mui/material';
import PokemonList from '../assets/json/PokemonList.json';

const typeColors = {
  grass: '#1f7d21',
  poison: '#7b32a8',
  fire: '#ed2121',
  flying: '#a3b7f7',
  water: '#314ead',
  bug: '#90bf37',
  normal: '#fcfafc',
  electric: '#fccf03',
  ground: '#d18e36',
  fairy: '#f743d6',
  fighting: '#ff895e',
  psychic: '#a85ea3',
  rock: '#6e5e46',
  ice: '#a2fcf8',
  ghost: '#6747a6',
  dragon: '#7e5eff',
  dark: '#2b2b2b',
  steel: '#7e7e80'
};

const midBgColors = {
  grass: '#e1f5e1',
  poison: '#f3e5f5',
  fire: '#ffebee',
  flying: '#e3f2fd',
  water: '#e3f2fd',
  bug: '#f1f8e9',
  normal: '#fafafa',
  electric: '#fffde7',
  ground: '#ffecb3',
  fairy: '#fce4ec',
  fighting: '#f8bbd0',
  psychic: '#fce4ec',
  rock: '#f5f5f5',
  ice: '#b3e5fc',
  ghost: '#ede7f6',
  dragon: '#d1c4e9',
  dark: '#e0e0e0',
  steel: '#f5f5f5'
};

const bgColors = {
  grass: '#81c784',
  poison: '#ce93d8',
  fire: '#e57373',
  flying: '#90caf9',
  water: '#64b5f6',
  bug: '#aed581',
  normal: '#eeeeee',
  electric: '#fff176',
  ground: '#ffcc80',
  fairy: '#f48fb1',
  fighting: '#e57373',
  psychic: '#f48fb1',
  rock: '#bcaaa4',
  ice: '#4dd0e1',
  ghost: '#b39ddb',
  dragon: '#9fa8da',
  dark: '#a0a0a0',
  steel: '#bdbdbd'
};

const excludedWords = ['-starter', '-mode', '-build', '-gulping', '-gorging', '-10', '-totem'];

const isLightColor = (color) => {
  if (!color) return true;
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140;
};

const Pokedex = () => {
  const [selectedType, setSelectedType] = useState('Any type');
  const [searchName, setSearchName] = useState('');

  const allTypes = Array.from(
    new Set(
      PokemonList.flatMap((pokemon) => pokemon.tipos.map((tipo) => tipo.toLowerCase()))
    )
  ).sort();

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredList = PokemonList.filter((pokemon) => {
    const lowerName = pokemon.nombre.toLowerCase();
    const hasType =
      selectedType === 'Any type' ||
      pokemon.tipos.some((tipo) => tipo.toLowerCase() === selectedType.toLowerCase());
    const matchesName = lowerName.includes(searchName.toLowerCase());
  
    return hasType && matchesName && !excludedWords.some((word) => lowerName.includes(word));
  });

  const selectedColor =
    selectedType !== 'Any type' ? typeColors[selectedType.toLowerCase()] : '#ccc';
  const isLight = isLightColor(selectedColor);

  return (
    <Box style={{ padding: "10px 10px 40px 10px", marginTop: "-80px" }} bgcolor="#383838" minHeight="100vh">
      
      <Box
        mb={2}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#383838',
          paddingBottom: 2,
          padding: "100px 10px 10px 0px",
          marginRight: "-10px"
        }}
      >
        <Select
          value={selectedType}
          onChange={handleChange}
          fullWidth
          displayEmpty
          sx={{
            backgroundColor: selectedType === 'Any type' ? '#e0e0e0' : selectedColor,
            color: selectedType === 'Any type' ? '#000' : isLight ? '#000' : '#fff',
            borderRadius: 1,
            fontWeight: 'bold',
            fontSize: 14,
            minHeight: 36,
            py: 0.5,
            '& .MuiSelect-select': {
              py: 0.5,
            },
            '& .MuiSelect-icon': {
              color: selectedType === 'Any type' ? '#000' : isLight ? '#000' : '#fff'
            },
            // Quitar todos los bordes del OutlinedInput
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            }
          }}
        >
          <MenuItem value="Any type" sx={{ color: '#000', fontSize: 14, minHeight: 36 }}>
            Any type
          </MenuItem>
          {allTypes.map((type) => (
            <MenuItem
              key={type}
              value={type}
              sx={{ fontSize: 14, minHeight: 36 }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </Select>

        <TextField
          placeholder="Pokemon Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          variant="outlined"
          fullWidth
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

      {filteredList.map((pokemon, index) => {
        const typeKey = pokemon.tipos[0].toLowerCase();
        const backgroundColor = bgColors[typeKey] || '#ccc';

        return (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor={backgroundColor}
            mb={1}
            borderRadius={1}
            style={{ padding: "12px" }}
          >
            <Box display="flex" flexDirection="column" flexGrow={1}>
              <Box display="flex" alignItems="center" mb={0.5}>
                <Typography fontWeight="bold" fontSize={17} color="#000" ml={1}>
                  {pokemon.nombre}
                </Typography>
              </Box>

              <Box display="flex" gap={0.5}>
                {pokemon.tipos.map((tipo, i) => {
                  const key = tipo.toLowerCase();
                  const bg = typeColors[key] || '#aaa';
                  const textColor = isLightColor(bg) ? '#000' : '#fff';

                  return (
                    <Box key={i} px={1} py={0.5} borderRadius={1} bgcolor={bg} style={{ width: "50px", textAlign: "center" }}>
                      <Typography fontSize={12} fontWeight="bold" color={textColor}>
                        {tipo}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: midBgColors[typeKey] || '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: "-10px 0px"
              }}
            >
              <img src={`/assets/img/icons/${pokemon.numero_pokedex}.png`} alt={pokemon.nombre} sx={{ width: 80, height: 80 }} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Pokedex;