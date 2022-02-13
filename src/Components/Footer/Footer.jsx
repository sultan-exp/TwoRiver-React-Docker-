/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import footerStyle from "assets/jss/material-kit-pro-react/components/footerStyle.jsx";

function Footer(props) {
  const { children, content, classes, theme, big, className } = props;
  const themeType =
    theme === "transparent" || theme == undefined ? false : true;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes[theme]]: themeType,
    [classes.big]: big || children !== undefined,
    [className]: className !== undefined
  });
  const aClasses = classNames({
    [classes.a]: true
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <div>
                &copy; {1900 + new Date().getYear()} PayCruiser&trade;, PayCruiser Inc,  All rights reserved.
              </div>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/privacy">Privacy Policy</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/terms">Terms of Use</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/sales-refunds">Sales and Refunds</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/bsa-aml-policy">BSA & AML</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://assurance.sysnetgs.com/assurancecard/be8e7fbc4499573fec7f61fac84b68873d3652c685b66709574812762054a0e2/assurancecard/">PCI Compliance</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/contact-us">Contact us</a>
            </ListItem>
            Version {process.env.BUILD_VERSION_NUMBER ? process.env.BUILD_VERSION_NUMBER:'2020.11.0001'}
          </List>
        </div>
        <div className={classes.clearFix} />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(["dark", "white", "transparent"]),
  big: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
