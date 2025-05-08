import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Tabs, Tab, Grid, Divider } from '@mui/material';
import '../assets/css/maincss.css';
import { ArrowBackIos, ArrowForwardIos, ArrowBackIosNew, Info, SwapHoriz } from '@mui/icons-material';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import StatsPanel from './StatsPanel';
import Phisical from '../assets/img/moves/phisical.png';
import Special from '../assets/img/moves/special.png';
import Status from '../assets/img/moves/status.png';
import MasterBall from '../assets/img/main_icon.png';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import PokemonList from '../assets/json/PokemonList.json';
import PokemonDetail from '../assets/json/Detalles_DB.json';
import PokemonMoves from '../assets/json/PokemonMoves_DB.json';
import MovesData from '../assets/json/Movimientos_DB.json';
import EvolutionData from '../assets/json/Evolution_DB.json';
import HabilityData from '../assets/json/Habilities_DB.json';

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

const evolutionExceptions = [
  "eevee", "flareon", "jolteon", "vaporeon",
  "leafeon", "glaceon", "umbreon", "espeon", "sylveon"
];

const PokedexDetail = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [loadingTab, setLoadingTab] = useState(false);
  const gen_data = PokemonList.find(p => String(p.numero_pokedex) === String(id));
  const pokemon = PokemonDetail.find(p => String(p.numero_pokedex) === String(id));
  const pokemon_moves = PokemonMoves[id];
  const [index, setIndex] = useState(0);
  const [activeView, setActiveView] = useState('info');
  const [pokemonMovesTabIndex, setPokemonMovesTabIndex] = useState(0);
  const pokemonMovesCategories = ['level_up', 'machine', 'egg', 'tutor'];

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

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

  if (!pokemon_moves || !pokemon_moves.moves) {
    return null;
  }

  const removeDuplicates = (moves) => {
    const map = new Map();
    moves.forEach((move) => {
      if (!map.has(move.id)) {
        map.set(move.id, move);
      }
    });
    return Array.from(map.values());
  };

  const cleanedMoves = {
    level_up: removeDuplicates(pokemon_moves.moves.level_up).sort((a, b) => a.level - b.level),
    machine: removeDuplicates(pokemon_moves.moves.machine),
    egg: removeDuplicates(pokemon_moves.moves.egg),
    tutor: removeDuplicates(pokemon_moves.moves.tutor),
  };

  const renderTable = (moves, type) => {
    return moves.map((move) => {
      const move_data = MovesData[move.id]
      return (
        <Box style={{ backgroundColor: bgColors[move_data.type], margin: "5px", borderRadius: "10px", padding: "10px", color: isLightColor(bgColors[move_data.type]) }}
          onClick={() =>
            navigate(`/move_detail/${move.id}`, {
              state: { from: "pokedex", id: gen_data.numero_pokedex }
            })
          }
        >
          <Grid container spacing={2} alignItems="center">
            {type === 'level_up' && (
              <Grid item>
                <Typography variant="subtitle2" style={{ fontSize: 10 }}>Level</Typography>
                <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move.level}</Typography>
              </Grid>
            )}
            <Grid item style={{ width: type === 'level_up' ? "100px" : "145px" }}>
              <Typography variant="subtitle2" style={{ fontSize: 10 }}>Name</Typography>
              <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move_data.name.replace(/-/g, " ")}</Typography>
            </Grid>
            <Grid item style={{ with: type !== 'level_up' && "30px" }}>
              <Typography variant="subtitle2" style={{ fontSize: 10 }}>Acc</Typography>
              <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move_data.accuracy ? move_data.accuracy : '-' }</Typography>
            </Grid>
            <Grid item style={{ with: type !== 'level_up' && "30px" }}>
              <Typography variant="subtitle2" style={{ fontSize: 10 }}>PP</Typography>
              <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move_data.pp}</Typography>
            </Grid>
            <Grid item style={{ with: type !== 'level_up' && "30px" }}>
              <Typography variant="subtitle2" style={{ fontSize: 10 }}>Power</Typography>
              <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move_data.power ? move_data.power : '-'}</Typography>
            </Grid>
            <Grid item>
              { move_data.damage_class === 'physical' ? (
                <img src={Phisical} alt="fisico" style={{ width: "50px", marginTop: "10px" }} />
              ) : move_data.damage_class === 'special' ? (
                <img src={Special} alt="especial" style={{ width: "50px", marginTop: "10px" }} />
              ) : move_data.damage_class === 'status' ? (
                <img src={Status} alt="status" style={{ width: "50px", marginTop: "10px" }} />
              ) : null}
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Box style={{ backgroundColor: typeColors[move_data.type], padding: "5px", borderRadius: "10px", width: "100%", textAlign: "center", marginTop: "5px" }}>
              <Typography style={{ fontWeight: "bold", fontSize: 12, color: isLightColor(typeColors[move_data.type]) ? '#000' : '#fff' }}>{move_data.type}</Typography>
            </Box>
          </Grid>
        </Box>
      )
    })
  };

  const handleGoBack = () => {
    setLoading(true);
    // Esperar un poco antes de navegar para que la animación se vea
    setTimeout(() => {
      navigate('/');
    }, 10); // puedes ajustar el tiempo si lo deseas
  };

  const handleChangeView = (view) => {
    if (activeView !== view) {
      setLoadingView(true);
      setTimeout(() => {
        setActiveView(view);
        setLoadingView(false);
      }, 10); // Ajusta el tiempo según lo que dure el cambio real
    }
  };

  const handleTabChange = (event, newValue) => {
    if (pokemonMovesTabIndex !== newValue) {
      setLoadingTab(true);
      setTimeout(() => {
        setPokemonMovesTabIndex(newValue);
        setLoadingTab(false);
      }, 10); // o ajusta al tiempo real que toma el cambio
    }
  };

  const obtenerNumeroPokedexPorNombre = (pokemonLista, nombreBuscado) => {
    const pokemon = pokemonLista.find(p => p.nombre.toLowerCase() === nombreBuscado.toLowerCase());
    return pokemon ? pokemon.numero_pokedex : null;
  }

  const obtenerTiposPorNombre = (pokemonList, nombre) => {
    const pokemon = pokemonList.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    return pokemon ? pokemon.tipos : [];
  };

  const renderPokemonBox = (pokeName, tipo, i) => {
    const numeroPokedex = obtenerNumeroPokedexPorNombre(PokemonList, pokeName);
  
    return (
      <Box key={`poke-${i}-${pokeName}`} style={{
        backgroundColor: bgColors[tipo] || '#ccc',
        padding: "10px",
        borderRadius: "10px",
        margin: "5px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
      }}>
        <Box style={{
          width: 70, height: 70,
          backgroundColor: midBgColors[tipo],
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {numeroPokedex ? (
            <img src={`/assets/img/official_art/${numeroPokedex}.png`} alt={pokeName} style={{ width: 90, height: 90 }} />
          ) : (
            <p>{pokeName}</p>
          )}
        </Box>
        <Typography style={{ marginTop: "8px", fontWeight: "bold", textAlign: "center", color: isLightColor(bgColors[tipo]) }}>{pokeName}</Typography>
        <Box display="flex" gap={0.5}>
          {obtenerTiposPorNombre(PokemonList,pokeName).map((tipo, i) => {
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
    );
  };
  
  // Método principal para renderizar evoluciones
  const render_evolutions = () => {
    const tipo = gen_data.tipos[0]?.toLowerCase();
    const evolChainData = EvolutionData[gen_data.nombre.toLowerCase()]?.evolution_chain_data?.chain;
  
    if (!evolChainData) return null;
  
    const renderChain = (node, depth = 0) => {
      const elements = [];
  
      // Render Pokémon actual
      elements.push(renderPokemonBox(node.species.name, tipo, `${depth}-main`));
  
      // Render evoluciones
      if (node.evolves_to.length > 0) {
        // Muestra los métodos de evolución si están disponibles
        const evolutionMethods = node.evolves_to.map((evo, i) => {
          const detail = evo.evolution_details?.[0];
          if (!detail) return null;
  
          const trigger = detail.trigger?.name;
          const itemName = detail.item?.name;
          const heldItemName = detail.held_item?.name;
  
          return (
            <Box
              key={`evol-${depth}-${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
                fontWeight: "bold",
                color: "#fff",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
                marginRight: detail.relative_physical_stats === 1 ? "-15px" : null,
                marginLeft: detail.relative_physical_stats === 0 ? "-15px" : null
              }}
            >

              {detail.gender === 1 && <div>Gender Female + </div>}
              {detail.gender === 2 && <div>Gender Male + </div>}

              {trigger === "level-up" && (
                <div>
                  {detail.relative_physical_stats === 1 && <div style={{ fontSize: 12 }}>Ataque &gt; Defensa</div>}
                  {detail.relative_physical_stats === -1 && <div style={{ fontSize: 12 }}>Ataque &lt; Defensa</div>}
                  {detail.relative_physical_stats === 0 && <div style={{ fontSize: 12 }}>Ataque = Defensa</div>}
                  {detail.needs_overworld_rain === true && <div>Rain +</div>}
                  {detail.turn_upside_down === true && <div>Turn Console Around +</div>}
                  {detail.min_beauty === 171 && <div>Max Beauty +</div>}
                  {detail.party_type !== null && <div>{detail.party_type.name} Pokemon in Team + </div>}
                  {detail.known_move !== null && <div>{detail.known_move.name} + </div>}
                  {detail.time_of_day !== "" && <div>During {detail.time_of_day}</div>}
                  {detail.gender === 1 && <div>Gender Female + </div>}
                  {detail.gender === 2 && <div>Gender Male + </div>}
                  {detail.min_happiness === 160
                    ? "Level Up + Friendship Max"
                    : `Level ${detail.min_level ?? "Up"}`}
                </div>
              )}
  
              {trigger === "use-item" && itemName && (
                <>
                  <div>Use {itemName.replace(/-/g, ' ')}</div>
                </>
              )}
  
              {trigger === "trade" && <div>Trade</div>}
              {heldItemName && <div>Hold {heldItemName.replace(/-/g, ' ')}</div>}

              {node.species.name === 'primeape' && (<div>Level up + use 20 times Rage Fist</div>)}
  
              <KeyboardDoubleArrowDownIcon />
            </Box>
          );
        });
  
        // Métodos de evolución (scroll horizontal)
        elements.push(
          <Box
            key={`methods-${depth}`}
            sx={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch", // para scroll suave en iOS
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: 2,
                px: 2, // padding horizontal para que no quede pegado
                width: "max-content",
              }}
            >
              {evolutionMethods}
            </Box>
          </Box>
        );
  
        // Render cada evolución lado a lado
        const children = node.evolves_to.map((evo, i) =>
          renderChain(evo, depth + 1 + i)
        );
  
        // Evoluciones hijas (scroll horizontal)
        elements.push(
          <Box
            key={`children-${depth}`}
            sx={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: 2,
                px: 2,
                width: "max-content",
              }}
            >
              {children}
            </Box>
          </Box>
        );
      }
  
      return (
        <Box key={`branch-${depth}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {elements}
        </Box>
      );
    };
  
    return renderChain(evolChainData);
  };

  const getHabilityIdByName = (name, habilityData) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, '-'); // "Tinted Lens" → "tinted-lens"
  
    for (const [id, data] of Object.entries(habilityData)) {
      if (data.name.en.toLowerCase() === formattedName) {
        return id;
      }
    }
  
    return null; // Si no se encuentra
  };

  return (
    <Box style={{ padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }} bgcolor="#383838" minHeight="100vh">

      {/* Barra de navegación de vistas */}
      <Box display="flex" justifyContent="center" gap={4} style={{ marginTop: "100px", paddingBottom: "10px" }}>
        <IconButton onClick={handleGoBack}>
          <ArrowBackIosNew style={{ color: "#fff" }} />
        </IconButton>

        <Box sx={{ position: "relative", display: "inline-block", textAlign: "center" }}>
          <Box sx={{ backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()], borderRadius: "10px", width: "60px", textAlign: "center", padding: "2px", position: "relative" }}>
            <IconButton onClick={() => handleChangeView('info')} color="primary">
              <Info sx={{ color: "#000" }} />
            </IconButton>
          </Box>
          
          {/**Flecha */}
          { activeView === 'info' ? (
            <Box 
              sx={{ 
                position: "absolute", 
                bottom: -8, 
                left: "50%", 
                transform: "translateX(-50%)", 
                width: 0, 
                height: 0, 
                borderLeft: "8px solid transparent", 
                borderRight: "8px solid transparent", 
                borderTop: `8px solid ${bgColors[gen_data.tipos[0].toLowerCase()]}`, 
                borderRadius: "2px" 
              }}
            />
          ) : null}
          
        </Box>

        <Box sx={{ position: "relative", display: "inline-block", textAlign: "center" }}>
          <Box sx={{ backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()], borderRadius: "10px", width: "60px", textAlign: "center", padding: "2px", position: "relative" }}>
            <IconButton onClick={() => handleChangeView('battle')} color="primary">
              <SportsMmaIcon style={{ color: "#000" }} />
            </IconButton>
          </Box>

          {/**Flecha */}
          { activeView === 'battle' ? (
            <Box 
              sx={{ 
                position: "absolute", 
                bottom: -8, 
                left: "50%", 
                transform: "translateX(-50%)", 
                width: 0, 
                height: 0, 
                borderLeft: "8px solid transparent", 
                borderRight: "8px solid transparent", 
                borderTop: `8px solid ${bgColors[gen_data.tipos[0].toLowerCase()]}`, 
                borderRadius: "2px" 
              }}
            />
          ) : null}
          
        </Box>

        <Box sx={{ position: "relative", display: "inline-block", textAlign: "center" }}>
          <Box sx={{ backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()], borderRadius: "10px", width: "60px", textAlign: "center", padding: "2px", position: "relative" }}>
            <IconButton onClick={() => handleChangeView('swap')} color="primary">
              <SwapHoriz style={{ color: "#000" }} />
            </IconButton>
          </Box>

          {/**Flecha */}
          { activeView === 'swap' ? (
            <Box 
              sx={{ 
                position: "absolute", 
                bottom: -8, 
                left: "50%", 
                transform: "translateX(-50%)", 
                width: 0, 
                height: 0, 
                borderLeft: "8px solid transparent", 
                borderRight: "8px solid transparent", 
                borderTop: `8px solid ${bgColors[gen_data.tipos[0].toLowerCase()]}`, 
                borderRadius: "2px" 
              }}
            />
          ) : null}
          
        </Box>
      </Box>
  
      {activeView === 'info' && (
        <>
          {/** ========================================= Datos Base ======================================================== */}
          <Box style={{ backgroundColor: bgColors[gen_data.tipos[0].toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px" }}>
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
                  alt="Pokemon"
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
            <Divider style={{ width: "100%" }} />
              <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                <IconButton onClick={handlePrev}>
                  <ArrowBackIos />
                </IconButton>

                <Box
                  width="80%"
                  minHeight={80}
                  display="flex"
                  flexDirection="column"  // Asegura que los elementos estén uno sobre el otro
                  alignItems="center"
                  justifyContent="flex-start"  // Esto alinea el contenido hacia la parte superior del contenedor
                  px={2}
                  py={1}
                  bgcolor="#f5f5f5"  // Color de fondo gris claro
                  borderRadius={2}
                  style={{ minHeight: "200px" }}
                >
                  <Box
                    width="90%"  // Asegura que el Box interno ocupe todo el ancho disponible
                    bgcolor="#e0e0e0"  // Gris más claro para el fondo
                    borderRadius={2}
                    p={2}  // Agrega algo de padding
                    display="flex"
                    flexDirection="column"  // Alinea los elementos en columna
                    alignItems="center"
                    marginBottom="10px"
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {pokemon.pokedex_entry_origin_en[index]}
                    </Typography>
                  </Box>

                  <Typography fontSize={13} fontStyle="italic" textAlign="center">
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
            <Divider style={{ width: "100%", marginBottom: "10px" }} />
            {pokemon.habilidades.map((hab, index) => {
              const isOculta = hab.tipo.toLowerCase() === "oculta";
              const style = {
                border: `2px solid ${typeColor}`,
                borderRadius: "30px",
                padding: "8px",
                margin: "5px auto",
                width: "90%",
                backgroundColor: isOculta ? typeColor : "transparent"
              };

              return (
                <Box key={index} style={style} 
                onClick={() =>
                  navigate(`/hability_detail/${getHabilityIdByName(hab.nombre_en, HabilityData)}`, {
                    state: { from: "pokedex", id: gen_data.numero_pokedex }
                  })
                }
                >
                  <Typography style={{ color: isOculta ? isLightColor(typeColor) ? '#000' : '#fff' : "#000" }}>
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
            <Divider style={{ width: "100%", marginBottom: "10px" }} />
            <StatsPanel estadisticas={pokemon.estadisticas_base} />
          </Box>
          {/** ========================================= Stats ======================================================== */}
        </>
      )}

      {activeView === 'battle' && (
        <Box sx={{ width: '100%' }}>
          <Tabs value={pokemonMovesTabIndex} onChange={handleTabChange} TabIndicatorProps={{ style: { display: 'none' } }}>
            {pokemonMovesCategories.map((type, index) => {
              const isSelected = pokemonMovesTabIndex === index;
              const unselected_bg = bgColors[gen_data.tipos[0].toLowerCase()]
              const selected_bg = midBgColors[gen_data.tipos[0].toLowerCase()] || '#aaa';
              return (
                <Tab 
                  key={index} 
                  sx={{ 
                    bgcolor: isSelected ? selected_bg : unselected_bg, 
                    margin: "5px 5px 0px 5px" , 
                    borderRadius: "10px", 
                    color: isSelected ? isLightColor(selected_bg) : isLightColor(unselected_bg) ? '#000' : '#fff',
                    fontSize: 12,
                    padding: "5px",
                    fontWeight: "bold"
                  }}
                  label={type.replace('_', ' ')} 
                />
              )
            })}
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {pokemonMovesCategories.map((type, index) => (
              <Box key={type} hidden={pokemonMovesTabIndex !== index}>
                {cleanedMoves[type].length > 0 ? (
                  renderTable(cleanedMoves[type], type)
                ) : (
                  <Typography variant="body2"></Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {activeView === 'swap' && (
        <Box display="flex" flexDirection="column" alignItems="center">
          {evolutionExceptions.includes(gen_data.nombre.toLowerCase()) ? (
            <>
              {/** 133, 134, 135, 136, 196, 197, 470, 471, 700 */}

              {/**EEVEE */}
              <Box 
                style={{
                  backgroundColor: "#EEEEEE",
                  padding: "10px",
                  borderRadius: "10px",
                  margin: "5px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                <Box style={{
                  width: 70, height: 70,
                  backgroundColor: "#FAFAFA",
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={`/assets/img/official_art/133.png`} alt="eevee" style={{ width: 90, height: 90 }} />
                </Box>
                <Typography style={{ marginTop: "8px", fontWeight: "bold", textAlign: "center", color: isLightColor("#EEEEEE") }}>Eevee</Typography>
                <Box display="flex" gap={0.5}>
                  {obtenerTiposPorNombre(PokemonList,'eevee').map((tipo, i) => {
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
              {/**EEVEE */}

              <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mt={2}>
                {[{ num: 134, name: "Vaporeon" }, { num: 135, name: "Jolteon" }, { num: 136, name: "Flareon" }].map(({ num, name }) => (
                  <Box 
                    key={num}
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "5px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                    }}
                  >
                    <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}> Use</Typography>
                    { num === 134 && <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Water Stone</Typography> }
                    { num === 135 && <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Electric Stone</Typography> }
                    { num === 136 && <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Fire Stone</Typography> }
                    <KeyboardDoubleArrowDownIcon style={{ marginBottom: "10px" }} />
                    <Box style={{
                      width: 70, height: 70,
                      backgroundColor: "#FAFAFA",
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img src={`/assets/img/official_art/${num}.png`} alt={name.toLowerCase()} style={{ width: 90, height: 90 }} />
                    </Box>
                    <Typography style={{ marginTop: "8px", fontWeight: "bold", textAlign: "center", color: isLightColor("#EEEEEE") }}>
                      {name}
                    </Typography>
                    <Box display="flex" gap={0.5}>
                      {obtenerTiposPorNombre(PokemonList, name.toLowerCase()).map((tipo, i) => {
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
                ))}
              </Box>

              <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mt={2}>
                {[{ num: 197, name: "Umbreon" }, { num: 196, name: "Espeon" }].map(({ num, name }) => (
                  <Box 
                    key={num}
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "5px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                    }}
                  >
                    <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Max Friendship</Typography>
                    { num === 197 && <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>During Night</Typography> }
                    { num === 196 && <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>During Day</Typography> }
                    <KeyboardDoubleArrowDownIcon style={{ marginBottom: "10px" }} />
                    <Box style={{
                      width: 70, height: 70,
                      backgroundColor: "#FAFAFA",
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img src={`/assets/img/official_art/${num}.png`} alt={name.toLowerCase()} style={{ width: 90, height: 90 }} />
                    </Box>
                    <Typography style={{ marginTop: "8px", fontWeight: "bold", textAlign: "center", color: isLightColor("#EEEEEE") }}>
                      {name}
                    </Typography>
                    <Box display="flex" gap={0.5}>
                      {obtenerTiposPorNombre(PokemonList, name.toLowerCase()).map((tipo, i) => {
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
                ))}
              </Box>

              <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mt={2}>
                {[{ num: 471, name: "Glaceon" }, { num: 470, name: "Leafeon" }].map(({ num, name }) => (
                  <Box 
                    key={num}
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "5px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                    }}
                  >
                    <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Use</Typography>
                    { num === 471 && <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Ice Stone</Typography> }
                    { num === 470 && <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Leaf Stone</Typography> }
                    <KeyboardDoubleArrowDownIcon style={{ marginBottom: "10px" }} />
                    <Box style={{
                      width: 70, height: 70,
                      backgroundColor: "#FAFAFA",
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img src={`/assets/img/official_art/${num}.png`} alt={name.toLowerCase()} style={{ width: 90, height: 90 }} />
                    </Box>
                    <Typography style={{ marginTop: "8px", fontWeight: "bold", textAlign: "center", color: isLightColor("#EEEEEE") }}>
                      {name}
                    </Typography>
                    <Box display="flex" gap={0.5}>
                      {obtenerTiposPorNombre(PokemonList, name.toLowerCase()).map((tipo, i) => {
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
                ))}
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Box 
                  style={{
                    backgroundColor: "#EEEEEE",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "5px",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    display: "flex",
                  }}
                >
                  <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Max Friendship +</Typography>
                  <Typography style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>Know Fairy Move</Typography>
                  <KeyboardDoubleArrowDownIcon style={{ marginBottom: "10px" }} />
                  <Box style={{
                    width: 70, height: 70,
                    backgroundColor: "#FAFAFA",
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <img src={`/assets/img/official_art/700.png`} alt="sylveon" style={{ width: 90, height: 90 }} />
                  </Box>
                  <Typography style={{ marginTop: "8px", fontWeight: "bold", textAlign: "center", color: isLightColor("#EEEEEE") }}>
                    Sylveon
                  </Typography>
                  <Box display="flex" gap={0.5}>
                    {obtenerTiposPorNombre(PokemonList, "sylveon").map((tipo, i) => {
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
              </Box>
            </>
          ) : (
            render_evolutions()
          )}
        </Box>
      )}

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#383838',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src={MasterBall}
            alt="Pokeball Loading"
            style={{
              width: '100px',
              height: '100px',
              animation: 'spin 1s linear infinite',
            }}
          />
          <Typography sx={{ color: 'white', marginTop: 2 }}>
            Loading
          </Typography>
        </Box>
      )}

      {loadingView && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            flexDirection: 'column',
          }}
        >
          <img
            src={MasterBall}
            alt="Pokeball Loading"
            style={{
              width: '100px',
              height: '100px',
              animation: 'spin 1s linear infinite',
            }}
          />
          <Typography sx={{ color: 'white', marginTop: 2 }}>
            Loading
          </Typography>
        </Box>
      )}

      {loadingTab && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            flexDirection: 'column',
          }}
        >
          <img
            src={MasterBall}
            alt="Pokeball Loading"
            style={{
              width: '100px',
              height: '100px',
              animation: 'spin 1s linear infinite',
            }}
          />
          <Typography sx={{ color: 'white', marginTop: 2 }}>
            Loading
          </Typography>
        </Box>
      )}

    </Box>
  );
};

export default PokedexDetail;