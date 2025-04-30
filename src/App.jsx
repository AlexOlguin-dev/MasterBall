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
import Pokedex from './Pokedex/Pokedex';
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
        <ListItem button>
          <ListItemText primary="Pokedex" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* AppBar con botón para abrir el Drawer */}
      <AppBar position="fixed" sx={{ backgroundColor: '#000' }}>
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

      {/* Drawer lateral desplegable */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* Contenido principal con margen superior */}
      <Box sx={{ marginTop: '64px' }}>
        <Pokedex />
      </Box>
    </>
  );
}

export default App;