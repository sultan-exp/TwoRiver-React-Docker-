import {
  container,
  description,
  cardTitle,
} from "../../material-kit-pro-react.jsx";

const signupPageStyle = (theme) => ({
  description,
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF !important",
  },
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px",
    },
  },
  pageHeader: {
    color: "#fff",
    border: "0",
    height: "100%",
    margin: "0",
    display: "flex!important",
    // padding: "120px 0",
    position: "relative",
    minHeight: "100vh",
    alignitems: "center",
    color: "rgba(0, 0, 0, 0.87)",
    "&:before": {
      background: "#fafafa",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
  },
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    textalign: "center",
  },
  socialLine: {
    marginTop: "1rem",
    textalign: "center",
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
  },
  textCenter: {
    textalign: "center",
  },
  iconButtons: {
    marginRight: "3px !important",
    marginLeft: "3px !important",
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  left: {
    float: "left!important",
    display: "block",
    "&,& *,& *:hover,& *:focus": {
      color: "#FFFFFF !important",
    },
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
    "&,& *,& *:hover,& *:focus": {
      color: "#FFFFFF !important",
    },
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative",
  },
  footer: {
    position: "absolute",
    width: "100%",
    background: "transparent",
    bottom: "0",
    color: "#fff",
    zIndex: "2",
  },
  modal: {
    display: "flex",
    height: 500,
    textalign: "center",
    justifyContent: "center",
    alignitems: "center",
    width: 400,
    paddingLeft: 30,
    paddingRight: 30,
  },
  modalBody: {
    height: 200,
    marginTop: -50,
  },
});

export default signupPageStyle;
