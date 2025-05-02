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

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 240 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Box
          component="img"
          src={MasterBall}
          alt="Master Ball"
          sx={{ width: 40, height: 40, marginRight: 1 }}
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
  );

  return (
    <Router>
      <AppBar position="fixed" sx={{ backgroundColor: '#000', paddingTop: "30px" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box component="img" src={MasterBall} alt="Master Ball" sx={{ width: 40, height: 40, marginRight: 2 }}/>
          <Typography variant="h6" color="inherit" noWrap>
            MasterLab
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawerContent}
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