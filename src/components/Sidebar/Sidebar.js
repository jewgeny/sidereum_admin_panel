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
import floristik from "../images/icons/floristik.svg";
import sarg from "../images/icons/sarg.svg";
import urne from "../images/icons/urne.svg";
import bgImage from "../images/bg.jpg";
import {Link} from "react-router-dom";


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
    background: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "70% 80%",
    height: "100%"
    
  },
  toolbar: theme.mixins.toolbar,
}));

const Sidebar = () => {
  const classes = useStyles();
  const list = [
    {label: "Auswahl", icon: <FaThLarge className="auswahllIcon" />, path: "/"},
    {label: "Särge", icon: <img src={sarg}  alt="Särge" className="panelIcon" />, path: "/saerge"},
    {label: "Urnen", icon: <img src={urne} alt="Urnen" className="panelIcon" />, path: "/urnen"},
    {label: "Floristik", icon: <img src={floristik} alt="Floristik" className="panelIcon" />, path: "floristik"},
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
          <Link className="link" key={index} to={text.path}>
              <ListItem className="listItem" button>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText className="iconTitel" primary={text.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
       
      </Drawer>
    </div>
  );
}


export default  Sidebar;