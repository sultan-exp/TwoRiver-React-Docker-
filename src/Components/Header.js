import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ListIcon from "@material-ui/icons/List";
import PersonAdd from "@material-ui/icons/PersonAdd";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import CustomDropdown from "./CustomDropdown/CustomDropdown";
import { onLogout } from "../actions/login";
import { auth } from "../actions/auth-helper";
import headerLinksStyle from "../assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 1,
  },
  signup: {
    background: "#082AA8",
  },
  dropdownHover: {
    background: "#CCC",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function DashboardNavbar({ history, onMobileNavOpen, ...props }) {
  // const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  //const classes = useStyles();
  const { classes, dropdownHoverColor } = props;
  const localClasses = useStyles();

  return (
    <AppBar elevation={0} {...props} color="default" position="sticky">
      <Toolbar>
        <div className="BrandLogo">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </div>
        {/* <Hidden lgDown> */}
        <Box className={classes.title} color="#0428B0">
          Paycruiser®
        </Box>
        <Hidden smDown className="header-links">
          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                className={classes.title}
                color="primary"
              >
                <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="/#payments"
                      className={classes.navLink}
                      color="transparent"
                    >
                      Payments
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="/#send-money"
                      className={classes.navLink}
                      color="transparent"
                    >
                      SEND MONEY
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="/#why-paycruiser"
                      className={classes.navLink}
                      color="transparent"
                    >
                      Why PayCruiser
                    </Button>
                  </ListItem>
                  {/* <ListItem className={classes.listItem}>
                    <Button
                      href="/invoice"
                      className={classes.navLink}
                      color="transparent"
                    >
                      Invoice
                    </Button>
                  </ListItem> */}
                </List>
              </Typography>
            </Grid>
            <Grid item xs>
              <List>
                {!auth.loggedIn() ? (
                  <Typography
                    variant="h6"
                    className={classes.title}
                    color="primary"
                  >
                    <List className={classes.list + " " + classes.mlAuto}>
                      <ListItem className={classes.listItem}>
                        <Button
                          href="/login"
                          className={classes.navLink}
                          color="transparent"
                        >
                          {/* <PersonAdd className={classes.icons} /> */}
                          <b>Login</b>
                        </Button>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Button
                          href="/#signup"
                          // color={window.innerWidth < 720 ? "info" : "rose"}
                          className="btn btn-header-blue"
                          round
                        >
                          {/* <PersonAdd className={classes.icons} /> */}
                          <b>Sign Up</b>
                        </Button>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Button
                          href="/pay-bill"
                          // color={window.innerWidth < 720 ? "info" : "rose"}
                          className="btn btn-header"
                          round
                        >
                          {/* <PersonAdd className={classes.icons} /> */}
                          <b>Pay</b>
                        </Button>
                      </ListItem>
                    </List>
                  </Typography>
                ) : (
                  <>
                    <ListItem className={classes.listItem}>
                      <CustomDropdown
                        noLiPadding
                        navDropdown
                        hoverColor={dropdownHoverColor}
                        buttonText={`${auth.getMerchantId()}`}
                        buttonProps={{
                          className: "btn btn-theme",
                          color: "transparent",
                        }}
                        buttonIcon={PersonAdd}
                        dropdownList={[
                          // <RouterLink
                          //   to="/transactions"
                          //   className={classes.dropdownLink}
                          // >
                          //   <MonetizationOn className={classes.dropdownIcons} />
                          //   My Transactions
                          // </RouterLink>,
                          // <RouterLink
                          //   to="/pay"
                          //   className={classes.dropdownLink}
                          // >
                          //   <MenuIcon className={classes.dropdownIcons} />
                          //   Virtual Terminal
                          // </RouterLink>,
                          // <RouterLink
                          //   to="/store"
                          //   className={classes.dropdownLink}
                          // >
                          //   <MenuIcon className={classes.dropdownIcons} />
                          //   E-Commerce
                          // </RouterLink>,
                          // <RouterLink
                          //   to="/muidashboard/"
                          //   className={classes.dropdownLink}
                          // >
                          //   <MenuIcon className={classes.dropdownIcons} />
                          //   My Dashboard
                          // </RouterLink>,
                          <RouterLink
                            to="/transactions/"
                            className={classes.dropdownLink}
                          >
                            <ListIcon className={classes.dropdownIcons} />
                            My Transactions
                          </RouterLink>,
                          <RouterLink
                            to="/invoice/"
                            className={classes.dropdownLink}
                          >
                            <ListIcon className={classes.dropdownIcons} />
                            Invoice
                          </RouterLink>,
                          <RouterLink
                            to="/login"
                            className={classes.dropdownLink}
                            onClick={() => onLogout(false)}
                          >
                            <AccountCircle className={classes.dropdownIcons} />
                            Log Out
                          </RouterLink>,
                        ]}
                      />
                    </ListItem>
                  </>
                )}
                {/* <ListItem className={classes.listItem}>
                  <Button
                    href="/contact/"
                    color={window.innerWidth < 960 ? "info" : "primary"}
                    className={classes.navButton}
                    round
                  >
                    <ViewQuilt />
                    Contact Us
                  </Button>
                </ListItem> */}
              </List>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default withStyles(headerLinksStyle)(DashboardNavbar);
// export default withRouter(withStyles(headerLinksStyle)(HeaderLinks));
