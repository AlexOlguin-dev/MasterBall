import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import StatsPanel from './StatsPanel';
import PokemonList from '../assets/json/PokemonList.json';
import PokemonDetail from '../assets/json/Detalles_DB.json';

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

const PokedexDetail = () => {
  const { id } = useParams();
  const gen_data = PokemonList.find(p => String(p.numero_pokedex) === String(id));
  const pokemon = PokemonDetail.find(p => String(p.numero_pokedex) === String(id));
  const [index, setIndex] = useState(0);

  const isLightColor = (color) => {
    if (!color) return true;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140;
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? pokemon.descripciones_en.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === pokemon.descripciones_en.length - 1 ? 0 : prev + 1));
  };

  const typeColor = typeColors[gen_data.tipos[0].toLowerCase()] || "#ccc";

  return (
    <Box style={{ padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }} bgcolor="#383838" minHeight="100vh">
  
      {/** ========================================= Datos Base ======================================================== */}
      <Box style={{ marginTop: "100px", backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px" }}>
        {/* Contenedor imagen + info */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Imagen */}
          <Box
            style={{
              width: 100,
              height: 100,
              backgroundColor: midBgColors[gen_data.tipos[0].toLowerCase()],
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={`/assets/img/official_art/${gen_data.numero_pokedex}.png`}
              alt={pokemon.nombre}
              style={{ width: 120, height: 120 }}
            />
          </Box>

          {/* Info al lado derecho de la imagen */}
          <Box>
            {/* Número */}
            <Typography style={{ fontSize: 30 }}>
              #{String(gen_data.numero_pokedex).padStart(3, '0')}
            </Typography>

            {/* Nombre */}
            <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
              {gen_data.nombre}
            </Typography>

            {/* Tipos */}
            <Box display="flex" gap={0.5} mt={1}>
              {gen_data.tipos.map((tipo, i) => {
                const key = tipo.toLowerCase();
                const bg = typeColors[key] || '#aaa';
                const textColor = isLightColor(bg) ? '#000' : '#fff';

                return (
                  <Box
                    key={i}
                    px={1}
                    py={0.5}
                    borderRadius={1}
                    bgcolor={bg}
                    style={{ width: "50px", textAlign: "center" }}
                  >
                    <Typography fontSize={12} fontWeight="bold" color={textColor}>
                      {tipo}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      {/** ========================================= Datos Base ======================================================== */}

      {/** ========================================= Pokedex ======================================================== */}
      <Box style={{ marginTop: "10px", backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px", textAlign: "center" }}>
        <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
          Pokedex Descriptions
        </Typography>
          <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <IconButton onClick={handlePrev}>
              <ArrowBackIos />
            </IconButton>

            <Box
              width="80%"
              minHeight={80}
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={2}
              py={1}
              bgcolor="#f5f5f5"
              borderRadius={2}
              style={{ minHeight: "200px" }}
            >
              <Typography fontSize={12} fontStyle="italic" textAlign="center">
                {pokemon.descripciones_en[index]}
              </Typography>
            </Box>

            <IconButton onClick={handleNext}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
      </Box>
      {/** ========================================= Pokedex ======================================================== */}

      {/** ========================================= Habilities ======================================================== */}
      <Box style={{ marginTop: "10px", backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()] || "#ccc", padding: "10px", borderRadius: "10px", textAlign: "center" }}>
        <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
          Habilities
        </Typography>
        {pokemon.habilidades.map((hab, index) => {
          const isOculta = hab.tipo.toLowerCase() === "oculta";
          const style = {
            border: `2px solid ${typeColor}`,
            borderRadius: "30px",
            padding: "8px",
            margin: "5px auto",
            width: "90%",
            backgroundColor: isOculta ? typeColor : "transparent",
            color: isOculta ? "#fff" : "#000",
          };

          return (
            <Box key={index} style={style}>
              <Typography>
                {hab.nombre_en}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {/** ========================================= Habilities ======================================================== */}

      {/** ========================================= Stats ======================================================== */}
      <Box style={{ marginTop: "10px", backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px", textAlign: "center" }}>
        <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
          Stats
        </Typography>
        <StatsPanel estadisticas={pokemon.estadisticas_base} />
      </Box>
      {/** ========================================= Stats ======================================================== */}

    </Box>
  );
};

export default PokedexDetail;