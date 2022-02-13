// ##############################
// // // Table styles
// #############################

import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from "assets/jss/material-kit-pro-react.jsx";

const tableStyle = (theme) => ({
  warning: {
    color: warningColor,
  },
  primary: {
    color: primaryColor,
  },
  danger: {
    color: dangerColor,
  },
  success: {
    color: successColor,
  },
  info: {
    color: infoColor,
  },
  rose: {
    color: roseColor,
  },
  gray: {
    color: grayColor,
  },
  right: {
    textalign: "right",
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    overflow: "auto",
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
    "& > tbody > tr, & > thead > tr": {
      height: "auto",
      fontFamily:
        '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
    },
  },
  tableShoppingHead: {
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
    fontSize: "0.75em !important",
    textTransform: "uppercase !important",
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.5em",
    padding: "12px 8px!important",
    verticalAlign: "middle",
    fontSize: "0.875rem",
    borderBottom: "none",
    borderTop: "1px solid #ddd",
    position: "relative",
    color: "#3C4858",
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
  },
  tableHeadCell: {
    fontSize: "1.063rem",
    borderBottomWidth: "1px",
    fontWeight: "300",
    color: "#555",
    borderTopWidth: "0 !important",
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
  },
  tableCellTotal: {
    fontWeight: "500",
    fontSize: "1.0625rem",
    paddingTop: "20px",
    textalign: "right",
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
  },
  tableCellAmount: {
    fontSize: "26px",
    fontWeight: "300",
    marginTop: "5px",
    textalign: "right",
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
  },
  tableResponsive: {
    minHeight: "0.1%",
    overflowX: "auto",
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
  },
  tableStripedRow: {
    backgroundColor: "#f9f9f9",
    fontFamily:
      '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
      fontFamily:
        '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif"',
    },
  },
  warningRow: {
    backgroundColor: "#fcf8e3",
    "&:hover": {
      backgroundColor: "#faf2cc",
    },
  },
  dangerRow: {
    backgroundColor: "#f2dede",
    "&:hover": {
      backgroundColor: "#ebcccc",
    },
  },
  successRow: {
    backgroundColor: "#dff0d8",
    "&:hover": {
      backgroundColor: "#d0e9c6",
    },
  },
  infoRow: {
    backgroundColor: "#d9edf7",
    "&:hover": {
      backgroundColor: "#c4e3f3",
    },
  },
});

export default tableStyle;
