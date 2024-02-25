import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import logo_wide from "../assets/img//logo_full_light.svg";
import logo from '../assets/img/logo.svg';
export default function MainMenu() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <Box
       sx={{height: '78px',padding:'25px 20px 20px 20px',margin:'auto'}}
        component="img"
        alt="Logo"
        src={logo_wide}
      />

<Divider aria-hidden="true" />




    <List>
        <ListItem disablePadding>
            <ListItemButton component={Link} to={"/create/outcome"}>
                <ListItemIcon>
                <CollectionsBookmarkIcon sx={{color:'#eceff1'}} />
                </ListItemIcon>
                <ListItemText primary="Уређивање" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to={"/"}>
                <ListItemIcon>
                <WorkspacesIcon sx={{color:'#eceff1'}} /> 
                </ListItemIcon>
                <ListItemText primary="Час" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to={"/classes"}>
                <ListItemIcon>
                <PeopleAltIcon sx={{color:'#eceff1'}} /> 
                </ListItemIcon>
                <ListItemText primary="Одељења" />
            </ListItemButton>
        </ListItem>
    </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Box
            component="img"
            sx={{
            height: 36,
            }}
            alt="Formativo logo."
            src={logo}
        />  

                        </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
}