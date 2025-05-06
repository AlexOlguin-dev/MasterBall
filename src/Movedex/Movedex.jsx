import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, TextField, Select, MenuItem, Button, Menu, IconButton } from '@mui/material';
import Phisical from '../assets/img/moves/phisical.png';
import Special from '../assets/img/moves/special.png';
import Status from '../assets/img/moves/status.png';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SortIcon from '@mui/icons-material/Sort';
import MovesData from '../assets/json/Movimientos_DB.json';

const bgColors = {
  grass: '#81c784', poison: '#ce93d8', fire: '#e57373', flying: '#90caf9',
  water: '#64b5f6', bug: '#aed581', normal: '#eeeeee', electric: '#fff176',
  ground: '#ffcc80', fairy: '#f48fb1', fighting: '#e57373', psychic: '#f48fb1',
  rock: '#bcaaa4', ice: '#4dd0e1', ghost: '#b39ddb', dragon: '#9fa8da',
  dark: '#a0a0a0', steel: '#bdbdbd'
};

const typeColors = {
  grass: '#1f7d21', poison: '#7b32a8', fire: '#ed2121', flying: '#a3b7f7',
  water: '#314ead', bug: '#90bf37', normal: '#fcfafc', electric: '#fccf03',
  ground: '#d18e36', fairy: '#f743d6', fighting: '#ff895e', psychic: '#a85ea3',
  rock: '#6e5e46', ice: '#a2fcf8', ghost: '#6747a6', dragon: '#7e5eff',
  dark: '#2b2b2b', steel: '#7e7e80'
};

const Movedex = ({ onLoadFinish }) => {
	const topRef = useRef(null);
	const navigate = useNavigate();
  const movesData = MovesData;
  const [filter, setFilter] = useState('');
	const [damageClassFilter, setDamageClassFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortByPower, setSortByPower] = useState(false);
  const [sortByAccuracy, setSortByAccuracy] = useState(null);

	useEffect(() => {
    const timer = setTimeout(() => {
      onLoadFinish?.();
    }, 10);
    return () => clearTimeout(timer);
  }, [onLoadFinish]);

  // Manejo del menú desplegable
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget); // abre el menú al hacer click en el botón
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

  const filteredMoves = Object.values(movesData)
  .filter((move) => {
    const matchesName = move.name.toLowerCase().includes(filter.toLowerCase());
    const matchesDamageClass = damageClassFilter ? move.damage_class === damageClassFilter : true;
    const matchesType = typeFilter ? move.type === typeFilter : true;
    return matchesName && matchesDamageClass && matchesType;
  })
  .sort((a, b) => {
    if (sortByPower === 'asc') {
      return (a.power || 0) - (b.power || 0); // menor a mayor
    } else if (sortByPower === 'desc') {
      return (b.power || 0) - (a.power || 0); // mayor a menor
    } else if (sortByAccuracy === 'asc') {
      return (a.accuracy || 0) - (b.accuracy || 0); // menor a mayor
    } else if (sortByAccuracy === 'desc') {
      return (b.accuracy || 0) - (a.accuracy || 0); // mayor a menor
    }
    return 0; // sin orden si no se activa el sort
  });

	function getMoveIdByName(moveName, dict) {
		return Object.keys(dict).find((key) => dict[key].name === moveName);
	}

  const handleOrderByPowerDesc = () => {
    setSortByPower('desc'); // orden ascendente (de menor a mayor)
    setAnchorEl(null); // cierra el menú
  };
  
  const handleOrderByPowerAsc = () => {
    setSortByPower('asc'); // orden descendente (de mayor a menor)
    setAnchorEl(null); // cierra el menú
  };

  const handleOrderByAccuracyDesc = () => {
    setSortByAccuracy('desc'); // orden descendente (de mayor a menor)
    setAnchorEl(null); // cierra el menú
  };
  
  const handleOrderByAccuracyAsc = () => {
    setSortByAccuracy('asc'); // orden ascendente (de menor a mayor)
    setAnchorEl(null); // cierra el menú
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // cierra el menú si clicas fuera
  };

  const moveNames = filteredMoves.map((move, index) => (
    <Box 
			key={index} 
			style={{ backgroundColor: bgColors[move.type], margin: "5px", borderRadius: "10px", padding: "10px", color: isLightColor(bgColors[move.type]) }}
			onClick={() => {
				const moveId = getMoveIdByName(move.name, movesData);
				navigate(`/move_detail/${moveId}`);
			}}
		>
      <Grid container spacing={2} alignItems="center">
        <Grid item style={{ width: "100px" }}>
          <Typography variant="subtitle2" style={{ fontSize: 10 }}>Name</Typography>
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move.name.replace(/-/g, " ")}</Typography>
        </Grid>
        <Grid item style={{ width: "30px" }}>
          <Typography variant="subtitle2" style={{ fontSize: 10 }}>Acc</Typography>
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move.accuracy ?? '-'}</Typography>
        </Grid>
        <Grid item style={{ width: "30px" }}>
          <Typography variant="subtitle2" style={{ fontSize: 10 }}>PP</Typography>
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move.pp}</Typography>
        </Grid>
        <Grid item style={{ width: "30px" }}>
          <Typography variant="subtitle2" style={{ fontSize: 10 }}>Power</Typography>
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>{move.power ?? '-'}</Typography>
        </Grid>
        <Grid item>
          {move.damage_class === 'physical' && <img src={Phisical} alt="fisico" style={{ width: "50px", marginTop: "10px" }} />}
          {move.damage_class === 'special' && <img src={Special} alt="especial" style={{ width: "50px", marginTop: "10px" }} />}
          {move.damage_class === 'status' && <img src={Status} alt="status" style={{ width: "50px", marginTop: "10px" }} />}
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Box style={{ backgroundColor: typeColors[move.type], padding: "5px", borderRadius: "10px", width: "100%", textAlign: "center", marginTop: "5px" }}>
          <Typography style={{ fontWeight: "bold", fontSize: 12, color: isLightColor(typeColors[move.type]) ? '#000' : '#fff' }}>
            {move.type}
          </Typography>
        </Box>
      </Grid>
    </Box>
  ));

	const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box style={{ position: 'relative', padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }} bgcolor="#383838" minHeight="100vh">

			{/* Marcador del inicio */}
      <div ref={topRef}></div>

      {/* FILTRO DE MOVIMIENTOS */}
      <Box
        mb={2}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#383838',
          paddingBottom: 2,
          padding: "110px 10px 0px 0px",
          marginRight: "-10px"
        }}
      >
        <TextField
          fullWidth
          placeholder="Move Name"
          variant="outlined"
          size="small"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
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
				<Select
					fullWidth
					value={damageClassFilter}
					onChange={(e) => setDamageClassFilter(e.target.value)}
					displayEmpty
					size="small"
					sx={{
						marginTop: "10px",
						backgroundColor: '#e0e0e0',
						borderRadius: 1,
						'& .MuiSelect-select': {
							padding: '8px',
							fontWeight: 'bold',
							fontSize: 14,
							color: '#000'
						}
					}}
				>
					<MenuItem value="">
						<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
							<span>All Damage Classes</span>
						</Box>
					</MenuItem>
					<MenuItem value="physical">
						<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
							<span>Physical</span>
							<img src={Phisical} alt="Physical" style={{ width: "50px" }} />
						</Box>
					</MenuItem>
					<MenuItem value="special">
						<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
							<span>Special</span>
							<img src={Special} alt="Special" style={{ width: "50px" }} />
						</Box>
					</MenuItem>
					<MenuItem value="status">
						<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
							<span>Status</span>
							<img src={Status} alt="Status" style={{ width: "50px" }} />
						</Box>
					</MenuItem>
				</Select>
        <Select
          fullWidth
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          displayEmpty
          size="small"
          sx={{
            marginTop: "10px",
            backgroundColor: '#e0e0e0',
            borderRadius: 1,
            '& .MuiSelect-select': {
              padding: '8px',
              fontWeight: 'bold',
              fontSize: 14,
              color: '#000'
            }
          }}
        >
          <MenuItem value="">
            <span>All Types</span>
          </MenuItem>
          {Object.keys(typeColors).map((type) => (
            <MenuItem key={type} value={type}>
              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <span style={{ textTransform: 'capitalize' }}>{type}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </Box>

      {moveNames}

      {/** Boton menu de orden */}
      <Button
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClickMenu}
        sx={{
          position: 'fixed',
					bottom: 100,
					right: 16,
					zIndex: 1000,
					borderRadius: '50%',
					minWidth: 'auto',
					padding: 1.5,
					backgroundColor: '#000'
        }}
      >
        <SortIcon style={{ color: "#fff" }} />
      </Button>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',  // Controla la posición vertical
          horizontal: 'center', // Controla la posición horizontal
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleOrderByPowerAsc}>
          Order by Power ↑
        </MenuItem>
        <MenuItem onClick={handleOrderByPowerDesc}>
          Order by Power ↓
        </MenuItem>
        <MenuItem onClick={handleOrderByAccuracyAsc}>
          Order by Acc ↑
        </MenuItem>
        <MenuItem onClick={handleOrderByAccuracyDesc}>
          Order by Acc ↓
        </MenuItem>
      </Menu>

			{/* Botón fijo en la esquina inferior derecha */}
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

export default Movedex;