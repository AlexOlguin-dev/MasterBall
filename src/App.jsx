import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Backdrop
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './assets/css/maincss.css';

import Pokedex from './Pokedex/Pokedex';
import PokedexDetail from './Pokedex/PokedexDetail';
import Movedex from './Movedex/Movedex';
import MoveDetails from './Movedex/MoveDetails';
import HabilityDex from './HabilityDex/HabilityDex';
import HabilityDetails from './HabilityDex/HabiityDetails';
import ItemDex from './ItemDex/ItemDex';

import MasterBall from './assets/img/main_icon.png';
import MenuIcon from '@mui/icons-material/Menu';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import CategoryIcon from '@mui/icons-material/Category';

const DrawerContent = React.memo(({ onClose, onNavigate }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    onNavigate(); // activa loader
    onClose();    // cierra menú
    navigate(path);
  };

  return (
    <Box
      sx={{ width: 240 }}
      role="presentation"
      onKeyDown={(event) => {
        if (event.key !== 'Tab' && event.key !== 'Shift') {
          onClose();
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Box component="img" src={MasterBall} alt="Master Ball" sx={{ width: 32, height: 32, marginRight: 1 }} />
        <Typography variant="h5" fontWeight="bold">MasterLab</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button style={{ height: "30px" }} onClick={() => handleNavigation("/")}>
          <ListItemIcon><CatchingPokemonIcon /></ListItemIcon>
          <ListItemText primary="Pokedex" />
        </ListItem>

        <ListItem button style={{ height: "30px" }} onClick={() => handleNavigation("/Movedex")}>
          <ListItemIcon><SportsMmaIcon /></ListItemIcon>
          <ListItemText primary="Movedex" />
        </ListItem>

        <ListItem button style={{ height: "30px" }} onClick={() => handleNavigation("/Habilitydex")}>
          <ListItemIcon><FlashOnIcon /></ListItemIcon>
          <ListItemText primary="Habilitydex" />
        </ListItem>

        <ListItem button style={{ height: "30px" }} onClick={() => handleNavigation("/Itemdex")}>
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Itemdex" />
        </ListItem>
      </List>
    </Box>
  );
});

function AppContent() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const startLoading = () => setLoading(true);
  const finishLoading = () => setLoading(false);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#000', paddingTop: '30px' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerOpen} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box component="img" src={MasterBall} alt="Master Ball" sx={{ width: 32, height: 32, marginRight: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            MasterLab
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        SlideProps={{ timeout: { enter: 150, exit: 100 } }}
      >
        <DrawerContent onClose={handleDrawerClose} onNavigate={startLoading} />
      </Drawer>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
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
      </Backdrop>

      <Box sx={{ marginTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Pokedex onLoadFinish={finishLoading} />} />
          <Route path="/pokedex_detail/:id" element={<PokedexDetail />} />
          <Route path="/Movedex" element={<Movedex onLoadFinish={finishLoading} />} />
          <Route path="/move_detail/:id" element={<MoveDetails />} />
          <Route path="/Habilitydex" element={<HabilityDex onLoadFinish={finishLoading} />} />
          <Route path="/hability_detail/:id" element={<HabilityDetails />} />
          <Route path="/Itemdex" element={<ItemDex onLoadFinish={finishLoading} />} />
        </Routes>
      </Box>
    </>
  );
}

// Wrapping Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;