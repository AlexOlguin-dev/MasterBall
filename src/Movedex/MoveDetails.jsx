import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Divider, Grid } from '@mui/material';
import '../assets/css/maincss.css';
import { ArrowBackIosNew } from '@mui/icons-material';
import MasterBall from '../assets/img/main_icon.png';
import Phisical from '../assets/img/moves/phisical.png';
import Special from '../assets/img/moves/special.png';
import Status from '../assets/img/moves/status.png';
import moveDict from '../assets/json/Movimientos_DB.json';

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
	const { id } = useParams();
	const move = moveDict[id];
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		window.scrollTo(0,0)
	},[])

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

	return(
		<Box style={{ padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }} bgcolor="#383838" minHeight="100vh">

			{/* Barra de navegación de vistas */}
			<Box display="flex" justifyContent="flex-start" width="100%" gap={4} style={{ marginTop: "100px", paddingBottom: "10px" }}>
				<IconButton onClick={handleGoBack}>
					<ArrowBackIosNew style={{ color: "#fff" }} />
				</IconButton>
			</Box>

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

			<Box style={{ backgroundColor: bgColors[move.type.toLowerCase()] || '#ccc', padding: "10px", borderRadius: "10px", marginTop: "10px", textAlign: "center" }}>
				<Typography style={{ fontWeight: "bold", fontSize: 20 }}>
					Tecnical Data
				</Typography>
				
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

export default MoveDetails