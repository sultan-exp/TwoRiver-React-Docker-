import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { container } from "./../../assets/jss/material-kit-pro-react";

const style = {
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
};

function GridContainer({ ...props }) {
  const { classes, children, className, direction, ...rest } = props;
  return (
    <Grid
      container
      {...rest}
      className={classes.grid + " " + className}
      direction={direction == "column" ? "column" : "row"}
    >
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: "",
};

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default withStyles(style)(GridContainer);
