 

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Grid,
  Hidden,
  IconButton,
  Link,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const classes = useStyles();

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Grid>
          <Typography>
            <Link component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
              href="#">Payments</Link>
            <Link component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
              href="#">Pricing</Link>
            <Link component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
              href="#">Business+</Link>

          </Typography>

        </Grid>
        <Box sx={{ flexGrow: 1 }} />

        <Hidden lgDown>
          <Button variant="contained" color="primary">Contact Us</Button>
          <Button variant="contained" color="primary">Login</Button>
          <Button variant="contained" color="primary">SIGN UP</Button>
          {/* <Button m={2} variant="contained" color="primary">Contact Us</Button> */}
          {/* <Button m={2} variant="contained" color="primary" href="#"> */}
          {/* Link */}
          {/* </Button> */}
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              // color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          {/* <IconButton color="inherit">
            <InputIcon />
          </IconButton> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
