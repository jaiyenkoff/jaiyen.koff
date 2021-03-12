import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import ListAltIcon from '@material-ui/icons/ListAlt';

import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../../../redux/User/user.actions';
import './styles.scss'



const MainListItems = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };
  
  return (
  <div className="listitems">
    <Link to="/adminportal">
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Admin Portal" />
    </ListItem>
    </Link>
    <Link to="/adminportal:manageproduct">
    <ListItem button>
      <ListItemIcon>
        <FreeBreakfastIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <Divider />
    <Link to="/">
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Back to Lobby" />
    </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" onClick={() => signOut()} />
    </ListItem>
  </div>
  )
}

export default MainListItems
