import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Divider, Grid, Tabs, Tab,Button } from '@mui/material';
import '../assets/css/maincss.css';
import { ArrowBackIosNew, Info } from '@mui/icons-material';
import MasterBall from '../assets/img/main_icon.png';
import Phisical from '../assets/img/moves/phisical.png';
import Special from '../assets/img/moves/special.png';
import Status from '../assets/img/moves/status.png';
import All from '../assets/img/Attacks/all.png';
import Double from '../assets/img/Attacks/double.png';
import Random from '../assets/img/Attacks/random.png';
import Single from '../assets/img/Attacks/single.png';
import SpecificMove from '../assets/img/Attacks/specific_move.png';
import User from '../assets/img/Attacks/user.png';
import UserField from '../assets/img/Attacks/user_field.png';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moveDict from '../assets/json/Movimientos_DB.json';
import pokemonData from '../assets/json/PokemonMoves_DB.json';
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

const MoveDetails = () => {
	const navigate = useNavigate();
	const topRef = useRef(null);
	const { id } = useParams();
	const move = moveDict[id];
	const [loading, setLoading] = useState(false);
	const [activeView, setActiveView] = useState('info');
	const [activeList, setActiveList] = useState('level');
	const [loadingView, setLoadingView] = useState(false);
	const excludedWords = ['-starter', '-mode', '-build', '-gulping', '-gorging', '-10', '-totem'];

	const isSelected = {
    level: activeList === 'level',
    tm: activeList === 'tm',
    egg: activeList === 'egg',
    tutor: activeList === 'tutor',
  };

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

	if (!move) {
    return <Box></Box>;
  }

	const handleGoBack = () => {
    setLoading(true);
    // Esperar un poco antes de navegar para que la animación se vea
    setTimeout(() => {
      navigate('/Movedex');
    }, 10); // puedes ajustar el tiempo si lo deseas
  };

	const getCategoryIcon = (category) => {
		switch (category.toLowerCase()) {
			case 'physical':
				return Phisical;
			case 'special':
				return Special;
			case 'status':
				return Status;
			default:
				return null;
		}
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

	function getMoveLearningMethod(pokemonName, moveName, pokemonData) {
		// Buscar el Pokémon por nombre
		const entry = Object.values(pokemonData).find(p => p.name === pokemonName);
		if (!entry || !entry.moves) return null;
	
		// Lista de métodos posibles
		const methods = ["level_up", "machine", "egg", "tutor"];
	
		// Buscar el movimiento en cada método
		for (const method of methods) {
			const movesList = entry.moves[method] || [];
			const found = movesList.some(move => move.name === moveName);
			if (found) {
				return method;
			}
		}
	
		// Si no se encuentra en ningún método
		return null;
	};

	const handleChange = (event, newValue) => {
    setActiveList(newValue);
  };

	const getPokemonIdByName = (name) => {
		return Object.keys(pokemonData).find(
			(id) => pokemonData[id]?.name?.toLowerCase() === name.toLowerCase()
		);
	};

	const getPokemonTypesByName = (name) => {
		const pokemon = PokemonList.find(
			(p) => p.nombre.toLowerCase() === name.toLowerCase()
		);
		return pokemon ? pokemon.tipos : [];
	};

	const renderPokemonByLearnMethod = () => {
		return move.learned_by_pokemon
			.filter((pokemon) => {
				const method = getMoveLearningMethod(pokemon.name, move.name, pokemonData);
	
				// Verificar si el nombre del Pokémon contiene alguna palabra excluida
				const isExcluded = excludedWords.some((word) => pokemon.name.includes(word));
	
				// Si está excluido, no lo mostraré
				if (isExcluded) return false;
	
				if (isSelected.level) return method === 'level_up';
				if (isSelected.tm) return method === 'machine';
				if (isSelected.egg) return method === 'egg';
				if (isSelected.tutor) return method === 'tutor';
	
				return true; // si no hay filtro activo, muestra todos
			})
			.map((pokemon) => (
				<Box
					key={pokemon.name}
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					bgcolor={bgColors[getPokemonTypesByName(pokemon.name)[0].toLowerCase()]}
					mb={1}
					borderRadius={1}
					style={{
						color: isLightColor[bgColors[getPokemonTypesByName(pokemon.name)[0].toLowerCase()]],
						padding: '12px',
					}}
				>
					{/* Box izquierda */}
					<Box display="flex" flexDirection="column" flexGrow={1}>
						<Box display="flex" alignItems="center" mb={0.5}>
							<Typography fontWeight="bold" fontSize={17} color="#000" ml={1}>
								{pokemon.name}
							</Typography>
						</Box>
	
						<Box display="flex" gap={0.5}>
							{getPokemonTypesByName(pokemon.name).map((tipo, i) => {
								const key = tipo.toLowerCase();
								const bg = typeColors[key] || '#aaa';
								const textColor = isLightColor(bg) ? '#000' : '#fff';
	
								return (
									<Box key={i} px={1} py={0.5} borderRadius={1} bgcolor={bg} style={{ width: '50px', textAlign: 'center' }}>
										<Typography fontSize={12} fontWeight="bold" color={textColor}>
											{tipo}
										</Typography>
									</Box>
								);
							})}
						</Box>
					</Box>
	
					{/* Box derecha */}
					<Box flex={1} display="flex" justifyContent="flex-end">
						<Box
							sx={{
								width: 80,
								height: 80,
								borderRadius: '50%',
								backgroundColor: midBgColors[getPokemonTypesByName(pokemon.name)[0].toLowerCase()] || '#ccc',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								margin: '-10px 0px',
							}}
						>
							<img
								src={`/assets/img/icons/${getPokemonIdByName(pokemon.name)}.png`}
								alt={pokemon.name}
								style={{ width: 80, height: 80 }}
							/>
						</Box>
					</Box>
				</Box>
			));
	};

	const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

	return(
		<Box style={{ padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }} bgcolor="#383838" minHeight="100vh">

			{/* Marcador del inicio */}
      <div ref={topRef}></div>

			{/* Barra de navegación de vistas */}
			<Box display="flex" justifyContent="flex-start" width="100%" gap={4} style={{ marginTop: "100px", paddingBottom: "10px" }}>
				<IconButton onClick={handleGoBack}>
					<ArrowBackIosNew style={{ color: "#fff" }} />
				</IconButton>

				<Box sx={{ position: "relative", display: "inline-block", textAlign: "center" }}>
					<Box sx={{ backgroundColor: bgColors[move.type.toLowerCase()], borderRadius: "10px", width: "60px", textAlign: "center", padding: "2px", position: "relative" }}>
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
								borderTop: `8px solid ${bgColors[move.type.toLowerCase()]}`, 
								borderRadius: "2px" 
							}}
						/>
					) : null}
									
				</Box>

				<Box sx={{ position: "relative", display: "inline-block", textAlign: "center" }}>
					<Box sx={{ backgroundColor: bgColors[move.type.toLowerCase()], borderRadius: "10px", width: "60px", textAlign: "center", padding: "2px", position: "relative" }}>
						<IconButton onClick={() => handleChangeView('learn')} color="primary">
							<SchoolIcon sx={{ color: "#000" }} />
						</IconButton>
					</Box>
									
					{/**Flecha */}
					{ activeView === 'learn' ? (
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
								borderTop: `8px solid ${bgColors[move.type.toLowerCase()]}`, 
								borderRadius: "2px" 
							}}
						/>
					) : null}
									
				</Box>

			</Box>

			{activeView === 'info' && (
				<>
					{/**Move basic info */}
					<Box style={{ backgroundColor: bgColors[move.type.toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px" }}>
						<Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: "10px" }}>
							<Typography style={{ fontWeight: "bold", fontSize: 20 }}>{move.name.replace('_', ' ')}</Typography>
							<img src={getCategoryIcon(move.damage_class)} alt={move.damage_class} style={{ width: "100px" }}/>
						</Box>
						<Divider style={{ width: "100%", marginBottom: "10px" }} />
						<Grid container justifyContent="space-between" alignItems="center" style={{ backgroundColor: midBgColors[move.type.toLowerCase()], borderRadius: "10px", padding: "10px" }}>
							<Grid item>
								<Typography variant="subtitle2" style={{ fontSize: 15 }}>Acc</Typography>
								<Typography style={{ fontSize: 20, fontWeight: "bold" }}>{move.accuracy ?? '-'}</Typography>
							</Grid>
							<Grid item>
								<Typography variant="subtitle2" style={{ fontSize: 15 }}>PP</Typography>
								<Typography style={{ fontSize: 20, fontWeight: "bold" }}>{move.pp ?? '-'}</Typography>
							</Grid>
							<Grid item>
								<Typography variant="subtitle2" style={{ fontSize: 15 }}>Power</Typography>
								<Typography style={{ fontSize: 20, fontWeight: "bold" }}>{move.power ?? '-'}</Typography>
							</Grid>
						</Grid>
					</Box>

					{/**Move description */}
					<Box style={{ backgroundColor: bgColors[move.type.toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px", marginTop: "10px", textAlign: "center" }}>
						<Typography style={{ fontWeight: "bold", fontSize: 20 }}>
							Move Effect
						</Typography>
						<Divider style={{ width: "100%", marginBottom: "10px" }} />
						<Box
							width="90%"
							minHeight={20}
							display="flex"
							flexDirection="column"  // Asegura que los elementos estén uno sobre el otro
							alignItems="center"
							justifyContent="flex-start"  // Esto alinea el contenido hacia la parte superior del contenedor
							px={2}
							py={1}
							bgcolor="#f5f5f5"  // Color de fondo gris claro
							borderRadius={2}
						>
							<Typography fontSize={15} fontStyle="italic" textAlign="center">{move.effect_entries[0]['effect']}</Typography>
						</Box>
					</Box>

					{/**Move's technical data */}
					<Box style={{ backgroundColor: bgColors[move.type.toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px", marginTop: "10px", textAlign: "center" }}>
						<Typography style={{ fontWeight: "bold", fontSize: 20 }}>
							Tecnical Data
						</Typography>
						<Box bgcolor="#f5f5f5" borderRadius={2} display="flex" alignItems="center" gap={1} p={1} justifyContent="center">
							<Typography>Priority:</Typography>
							<Typography>{move.priority}</Typography>
						</Box>
						{ move.target === 'selected-pokemon' ? (
							<img src={Single} alt={move.target} style={{ width: "100%" }} />
						) : move.target === 'entire-field' ? (
							<img src={UserField} alt={move.target} style={{ width: "100%" }} />
						) : move.target === 'all-opponents' ? (
							<img src={Double} alt={move.target} style={{ width: "100%" }} />
						) : move.target === 'all-other-pokemon' ? (
							<img src={All} alt={move.target} style={{ width: "100%" }} />
						) : move.target === 'user' ? (
							<img src={User} alt={move.target} style={{ width: "100%" }} />
						) : move.target === 'random-opponent' ? (
							<img src={Random} alt={move.target} style={{ width: "100%" }} />
						) : move.target === 'specific-move' ? (
							<img src={SpecificMove} alt={move.target} style={{ width: "100%" }} />
						) : null}
					</Box>
					</>
			)}

			{activeView === 'learn' && (
				<Box sx={{ width: '100%' }}>
					<Tabs value={activeList} onChange={handleChange} centered TabIndicatorProps={{ style: { display: 'none' } }}>
						<Tab 
							label="By Level" 
							value="level" 
							style={{ 
								backgroundColor: isSelected.level ? bgColors[move.type.toLowerCase()] : midBgColors[move.type.toLowerCase()],
								margin: "5px 5px 0px 50px", 
								borderRadius: "10px",
								fontSize: 12,
                padding: "5px",
                fontWeight: "bold",
								color: isSelected.level ? isLightColor(bgColors[move.type.toLowerCase()]) : isLightColor(midBgColors[move.type.toLowerCase()])
							}}
						/>
						<Tab 
							label="By TM" 
							value="tm" 
							style={{ 
								backgroundColor: isSelected.tm ? bgColors[move.type.toLowerCase()] : midBgColors[move.type.toLowerCase()],
								margin: "5px 5px 0px 5px", 
								borderRadius: "10px",
								fontSize: 12,
                padding: "5px",
                fontWeight: "bold",
								color: isSelected.tm ? isLightColor(bgColors[move.type.toLowerCase()]) : isLightColor(midBgColors[move.type.toLowerCase()])
							}} 
						/>
						<Tab 
							label="By Egg" 
							value="egg" 
							style={{
								backgroundColor: isSelected.egg ? bgColors[move.type.toLowerCase()] : midBgColors[move.type.toLowerCase()],
								margin: "5px 5px 0px 5px", 
								borderRadius: "10px",
								fontSize: 12,
                padding: "5px",
                fontWeight: "bold",
								color: isSelected.egg ? isLightColor(bgColors[move.type.toLowerCase()]) : isLightColor(midBgColors[move.type.toLowerCase()])
							}} 
						/>
						<Tab 
							label="By Tutor" 
							value="tutor" 
							style={{
								backgroundColor: isSelected.tutor ? bgColors[move.type.toLowerCase()] : midBgColors[move.type.toLowerCase()],
								margin: "5px 5px 0px 5px", 
								borderRadius: "10px",
								fontSize: 12,
                padding: "5px",
                fontWeight: "bold",
								color: isSelected.tutor ? isLightColor(bgColors[move.type.toLowerCase()]) : isLightColor(midBgColors[move.type.toLowerCase()])
							}} 
						/>
					</Tabs>

					<Box mt={2}>
						{renderPokemonByLearnMethod()}
					</Box>
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

			{/* Botón fijo en la esquina inferior derecha */}
			{activeView === 'learn' && (
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
			)}

    </Box>
	)
}

export default MoveDetails