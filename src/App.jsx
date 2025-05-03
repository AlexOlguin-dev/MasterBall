import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Pokedex from './Pokedex/Pokedex';
import PokedexDetail from './Pokedex/PokedexDetail';
import MasterBall from './assets/img/main_icon.png';

// DrawerContent como componente separado y memoizado
const DrawerContent = React.memo(({ onClose }) => (
  <Box
    sx={{ width: 240 }}
    role="presentation"
    onClick={onClose}
    onKeyDown={(event) => {
      if (event.key !== 'Tab' && event.key !== 'Shift') {
        onClose();
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Box
        component="img"
        src={MasterBall}
        alt="Master Ball"
        sx={{ width: 32, height: 32, marginRight: 1 }}
      />
      <Typography variant="h5" fontWeight="bold">
        MasterLab
      </Typography>
    </Box>
    <Divider />
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Pokedex" />
      </ListItem>
      {/* Agrega aquí más rutas si las necesitas */}
    </List>
  </Box>
));

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Router>
      <AppBar position="fixed" sx={{ backgroundColor: '#000', paddingTop: '30px' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerOpen} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={MasterBall}
            alt="Master Ball"
            sx={{ width: 32, height: 32, marginRight: 2 }}
          />
          <Typography variant="h6" color="inherit" noWrap>
            MasterLab
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // mejora el rendimiento en móviles
        }}
        SlideProps={{
          timeout: { enter: 150, exit: 100 }, // animación más rápida
        }}
      >
        <DrawerContent onClose={handleDrawerClose} />
      </Drawer>

      <Box sx={{ marginTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokedex_detail/:id" element={<PokedexDetail />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;