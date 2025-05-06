import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Habilities from '../assets/json/Habilities_DB.json';

const HabilityDex = ({ onLoadFinish }) => {
	const topRef = useRef(null);
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			onLoadFinish?.();
		}, 10);
		return () => clearTimeout(timer);
	}, [onLoadFinish]);

	const scrollToTop = () => {
		if (topRef.current) {
			topRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const filteredHabilities = Object.entries(Habilities).filter(([_, ability]) =>
		ability.name.en.toLowerCase().includes(searchTerm.toLowerCase())
	);

	function getAbikityIdByName(abilityName, dict) {
		return Object.keys(dict).find((key) => dict[key].name.en === abilityName);
	}

	return (
		<Box
			style={{ position: 'relative', padding: "10px 10px 40px 10px", marginTop: "-80px", overflowX: 'hidden' }}
			bgcolor="#383838"
			minHeight="100vh"
			color="#fff"
		>
			{/* Marcador del inicio */}
			<div ref={topRef}></div>

			<Box style={{ padding: "110px 10px 20px 10px" }}>
				<TextField
					variant="outlined"
					fullWidth
					placeholder="Ability name"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
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

			{filteredHabilities.map(([id, ability]) => (
				<Box
					key={id}
					mb={1}
					p={1}
					borderRadius={2}
					bgcolor="#4a4a4a"
					boxShadow={3}
					onClick={() => {
						const Id = getAbikityIdByName(ability.name.en, Habilities);
						navigate(`/hability_detail/${Id}`);
					}}
				>
					<Typography variant="h6" fontWeight="bold" gutterBottom style={{ textAlign: "center" }}>
						{ability.name.en}
					</Typography>
					<Box style={{ backgroundColor: "#c4c4c4", borderRadius: "10px" }}>
						<Typography fontSize={14} whiteSpace="pre-line" style={{ textAlign: "center", color: "#000", padding: "5px" }}>
							{ability.description.en.split('.')[0] + '.'}
						</Typography>
					</Box>
				</Box>
			))}

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

export default HabilityDex;