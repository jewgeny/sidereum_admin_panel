import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from "../images/logo.svg";
import "../styles/logo.css";
import "../styles/sidebar.css";
import { FaUser, FaThLarge } from 'react-icons/fa';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "lightgrey",
  },
  toolbar: theme.mixins.toolbar,
}));

const Sidebar = () => {
  const classes = useStyles();
  const list = [
    {label: "Produkte", icon: <FaThLarge className="panelIcon" />},
    {label: "Benutzer", icon: <FaUser className="panelIcon" />},
  ]
      

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className="panelWrapper" />
         <div className="logoWrapper"><img src={logo} /></div>
        <List className="listWrapper">
          {list.map((text, index) => (
            <ListItem  button key={index}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
    </div>
  );
}


export default  Sidebar;