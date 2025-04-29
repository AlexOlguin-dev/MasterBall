import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pLimit from 'p-limit';
import { Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Avatar, Typography } from '@mui/material';
import MasterBall from '../assets/img/main_icon.png';
import '../assets/css/maincss.css';

const typeColors = {
  grass: '#32a852',
  poison: '#7b32a8',
  fire: '#a83232',
  flying: '#aed2eb',
  water: '#2325ad',
  bug: '#88ad23',
  normal: '#e2e3e1',
  electric: '#fccf03',
  ground: '#d18e36',
  fairy: '#eb8dd6',
  fighting: '#b86363',
  psychic: '#8a2556',
  rock: '#54493e',
  ice: '#64c1d9',
  ghost: '#6747a6',
  dragon: '#2f439c',
  dark: '#2b2b2b',
  steel: '#7e7e80'
};

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  
  const limit = pLimit(5); // Limitar a 5 solicitudes concurrentes

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        let pokemonData = [];
        let offset = 0;
        const batchSize = 20; // Cambiar a 20 Pokémon por solicitud
        const totalPokemons = 1320; // Total de Pokémon a solicitar

        // Hacer solicitudes por lotes de 20
        while (offset < totalPokemons) {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${batchSize}&offset=${offset}`);
          const results = response.data.results;

          // Realizar las solicitudes para obtener los detalles de cada Pokémon
          const batchData = await Promise.all(
            results.map((pokemon) =>
              limit(() =>
                axios.get(pokemon.url).then((res) => res.data)
              )
            )
          );

          pokemonData = [...pokemonData, ...batchData];
          offset += batchSize;

          // Actualizar el porcentaje de carga
          setLoadPercentage(Math.round((offset / totalPokemons) * 100));
        }

        const pokemonDetails = pokemonData.map((details) => ({
          name: details.name,
          sprite: details.sprites.front_default,
          types: details.types.map((typeInfo) => typeInfo.type.name),
        }));

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box
          component="img"
          src={MasterBall}
          alt="Loading"
          sx={{
            animation: 'spin 2s linear infinite',
            width: 100,
            height: 100,
            marginBottom: 2,
          }}
        />
        <LinearProgress
          variant="determinate"
          value={loadPercentage}
          sx={{
            width: '80%',
            borderRadius: '100px',
            height: '10px',
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#3F3D91',
            },
          }}
        />
        <Typography variant="caption" sx={{ marginTop: 1 }}>
          {loadPercentage}% Cargando...
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
          {pokemonList
            .filter((pokemon) => !pokemon.name.includes('-totem'))
            .filter((pokemon) => !pokemon.name.includes('-starter'))
            .filter((pokemon) => !pokemon.name.includes('-gulping'))
            .filter((pokemon) => !pokemon.name.includes('-gorging'))
            .filter((pokemon) => !pokemon.name.includes('-10'))
            .filter((pokemon) => !pokemon.name.includes('-build'))
            .filter((pokemon) => !pokemon.name.includes('-mode'))
            .map((pokemon) => (
              <TableRow key={pokemon.name} sx={{ height: '40px' }}>
                <TableCell width={50} sx={{ padding: '4px' }}>
                  <Avatar src={pokemon.sprite} alt={pokemon.name} sx={{ width: 40, height: 40 }} />
                </TableCell>
                <TableCell sx={{ padding: '4px' }}>
                  <Box display="flex" alignItems="center">
                    <Typography fontWeight="bold" sx={{ mr: 1, fontSize: 12 }}>
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </Typography>
                    <Box display="flex" gap={0.5} sx={{ marginLeft: 'auto', marginRight: '10px' }}>
                      {pokemon.types.map((type) => (
                        <Box
                          key={type}
                          width="50px"
                          px={1}
                          py={0.5}
                          borderRadius="4px"
                          bgcolor={typeColors[type] || '#000'}
                          color={
                            ['normal', 'fairy', 'electric', 'flying', 'grass', 'ice', 'bug'].includes(type)
                              ? '#000'
                              : '#fff'
                          }
                          textAlign="center"
                          fontSize="0.8rem"
                          fontWeight="bold"
                        >
                          <Typography style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Pokedex;