// ##############################
// // // Info component styles
// #############################

import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  title
} from "assets/jss/material-kit-pro-react.jsx";

const infoStyle = {
  infoArea: {
    maxWidth: "360px",
    minHeight: "100px",
    margin: "0 auto",
    padding: "30px 0 30px"
  },
  iconWrapper: {
    float: "left",
    marginTop: "24px",
    marginRight: "10px"
  },
  primary: {
    color: primaryColor
  },
  warning: {
    color: warningColor
  },
  danger: {
    color: dangerColor
  },
  success: {
    color: successColor
  },
  info: {
    color: infoColor
  },
  rose: {
    color: roseColor
  },
  gray: {
    color: grayColor
  },
  icon: {
    width: "2.25rem",
    height: "2.25rem",
    fontSize: "2.25rem"
  },
  descriptionWrapper: {
    color: grayColor,
    overflow: "hidden"
  },
  title: {
    ...title,
    margin: "1.75rem 0 0.875rem !important",
    minHeight: "unset",
    color: grayColor
  },
  description: {
    color: "#000",
    overflow: "hidden",
    marginTop: "0px",
    fontSize: "18px",
    fontWeight: "320",
    "& p": {
      color: grayColor,
      fontSize: "18px"
    }
  },
  iconWrapperVertical: {
    float: "none"
  },
  iconVertical: {
    width: "61px",
    height: "61px"
  }
};

export default infoStyle;
