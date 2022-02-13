import React from 'react';
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
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";


export const MainListItems = () => {
  const history = useHistory();
  const onListItem = (link) => {
    history.push(link)
  }
  return (
    <div>
      <ListItem button onClick={()=>{onListItem("/dashboard")}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Validation Requests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Pickup Codes" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Paid Transactions" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Send Money" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Repayment Requests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Exprenses" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Account Statements" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Summary Reports" />
      </ListItem>
    </div>
  );

}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
