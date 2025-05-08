import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/maincss.css';
import { Box, IconButton, Typography, Tab, Tabs } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MasterBall from '../assets/img/main_icon.png';
import Habilities from '../assets/json/Habilities_DB.json';
import PokemonDetails from '../assets/json/Detalles_DB.json';
import PokemonList from '../assets/json/PokemonList.json';

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

const HabilityDetails = () => {
	const navigate = useNavigate();
	const topRef = useRef(null);
	const { id } = useParams();
	const location = useLocation();
	const from = location.state?.from;
	const idPokedex = location.state?.id;
	const ability = Habilities[id];
	const [loading, setLoading] = useState(false);
	const [activeList, setActiveList] = useState('normal');
	const isSelected = {
    normal: activeList === 'normal',
		hidden: activeList === 'hidden'
  };

	useEffect(() => {
		window.scrollTo(0,0)
	},[])

	const handleGoBack = () => {
		if (from === "pokedex") {
			navigate(`/pokedex_detail/${idPokedex}`)
		}else{
			setLoading(true);
			// Esperar un poco antes de navegar para que la animación se vea
			setTimeout(() => {
				navigate('/Habilitydex');
			}, 10); // puedes ajustar el tiempo si lo deseas
		}
  };

	const handleChange = (event, newValue) => {
    setActiveList(newValue);
  };

	const isLightColor = (color) => {
    if (!color) return true;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140;
  };

	const normalizeAbilityName = (name) => {
		return name.toLowerCase().replace(/[-_ ]/g, "");
	};

	const renderTablePokemonAbilities = () => {
		const matchingPokemons = [];
	
		PokemonDetails.forEach(pokemon => {
			pokemon.habilidades.forEach(habilidad => {
				const habilidadNombre = habilidad.nombre_en.toLowerCase();
				const habilidadTipo = habilidad.tipo.toLowerCase();
	
				if (
					normalizeAbilityName(habilidad.nombre_en) === normalizeAbilityName(ability.name.en) &&
					((isSelected.normal && habilidad.tipo.toLowerCase() === "normal") ||
					(isSelected.hidden && habilidad.tipo.toLowerCase() === "oculta"))
				) {
					const pokemonInfo = PokemonList.find(p => p.numero_pokedex === pokemon.numero_pokedex);
				
					if (!pokemonInfo || !pokemonInfo.tipos || !pokemonInfo.tipos.length) {
						console.warn(`No se encontró información para el Pokémon N°${pokemon.numero_pokedex}`);
						return;
					}
				
					matchingPokemons.push({
						numero: pokemon.numero_pokedex,
						nombre: pokemonInfo.nombre || "Desconocido",
						type: pokemonInfo.tipos,
						tipo: habilidad.tipo,
						icono: pokemonInfo.icono_url
					});
				}
			});
		});
	
		return (
			<Box>
				{matchingPokemons.length > 0 ? (
					matchingPokemons.map((poke, index) => (
						<Box
							key={index}
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							bgcolor={bgColors[poke.type[0].toLowerCase()] || '#ccc'}
							p={1}
							my={1}
							borderRadius="10px"
							style={{ padding: "12px", cursor: 'pointer' }}
						>
							<Box display="flex" flexDirection="column" flexGrow={1}>
								<Box display="flex" alignItems="center" mb={0.5}>
									<Typography fontWeight="bold" fontSize={17} color="#000" ml={1}>
										{poke.nombre}
									</Typography>
								</Box>
								<Box display="flex" gap={0.5}>
									{poke.type.map((tipo, i) => {
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
									backgroundColor: midBgColors[poke.type[0].toLowerCase()] || '#ccc',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									margin: "-10px 0px"
								}}
							>
								<img src={`/assets/img/icons/${poke.numero}.png`} alt={poke.nombre} sx={{ width: 80, height: 80 }} />
							</Box>
						</Box>
					))
				) : (
					<Typography style={{ color: "#fff", textAlign: "center" }}>
						No Pokémon found with this ability type.
					</Typography>
				)}
			</Box>
		);
	};	

	return(
		<Box style={{ padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }} bgcolor="#383838" minHeight="100vh">

			{/* Marcador del inicio */}
      <div ref={topRef}></div>

			<Box display="flex" justifyContent="flex-start" width="100%" gap={4} style={{ marginTop: "100px", paddingBottom: "10px" }}>
				<IconButton onClick={handleGoBack}>
					<ArrowBackIosNew style={{ color: "#fff" }} />
				</IconButton>
			</Box>

			<Box style={{ backgroundColor: "#4A4A4A", padding: "10px", borderRadius: "10px" }}>
				<Typography variant="h6" fontWeight="bold" gutterBottom style={{ textAlign: "center", color: "#fff" }}>
					{ability.name.en}
				</Typography>
				<Box style={{ backgroundColor: "#c4c4c4", borderRadius: "10px" }}>
					<Typography fontSize={14} whiteSpace="pre-line" style={{ textAlign: "center", color: "#000", padding: "5px" }}>
						{ability.description.en}
					</Typography>
				</Box>
			</Box>

			<Box sx={{ width: '100%' }}>
				<Tabs value={activeList} onChange={handleChange} centered TabIndicatorProps={{ style: { display: 'none' } }} style={{ marginTop: "10px" }}>
					<Tab 
						label="Normal" 
						value="normal" 
						style={{ 
							backgroundColor: isSelected.normal ? "#c4c4c4" : "#4A4A4A",
							margin: "5px 5px 0px 5px", 
							borderRadius: "10px",
							fontSize: 12,
							padding: "5px",
							fontWeight: "bold",
							color: "#000"
						}}
					/>
					<Tab 
						label="Hidden" 
						value="hidden" 
						style={{ 
							backgroundColor: isSelected.hidden ? "#c4c4c4" : "#4A4A4A",
							margin: "5px 5px 0px 5px", 
							borderRadius: "10px",
							fontSize: 12,
							padding: "5px",
							fontWeight: "bold",
							color: "#000"
						}}
					/>
				</Tabs>

				<Box mt={2}>
					{renderTablePokemonAbilities()}
				</Box>
			</Box>

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

		</Box>
	)
}

export default HabilityDetails