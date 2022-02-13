import React from "react";
import { Box, Grid } from "@material-ui/core";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
// import Header from "components/Header/Header.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
// import Footer from "components/Footer/Footer.jsx";
import GridContainer from "./../Components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";

import loginPageStyle from "../assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";
import VerticalLinearStepper from "../Components/Login";

// import image from "assets/img/bg7.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
// import { Transition } from "../ProductPage/DropZone";
// import logo from "./logo.png";

class LoginPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes, location, history } = this.props;
    // const showDialog = location.search.includes("?inactive=show");

    return (
      <div>
        {/* {showDialog && (
          <Dialog
            // classes={{
            //   root: classes.modalRoot,
            //   paper: classes.modal,
            // }}
            open={true}
            TransitionComponent={Transition}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
            onClose={() => history.push("/login-page")}
          >
            <DialogContent
              id="classic-modal-slide-description"
            //   className={classes.modalBody}
            >
              <div 
              className={classes.modal}
              >
                <div 
                className={classes.modalBody}
                >
                  <img src={logo} width={60} height={60} alt="logo" />
                  <h1 style={{ fontWeight: 400 }}>Action Required</h1>
                  <p>
                    Your account is currently locked (KYC/B verification failed). Please
                    call +1.562.999.2511 (Monday-Friday, 08 AM-5 PM Pacific Time) to
                    verify your account.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )} */}
        <div
          className={classes.pageHeader}
          //   style={{
          //     backgroundImage: "url(" + image + ")",
          //     backgroundSize: "cover",
          //     backgroundPosition: "top center",
          //   }}
        >
          <div className={classes.container}>
            <Grid container justify="center">
              <Grid xs={12} sm={12} md={6}>
                <VerticalLinearStepper />
              </Grid>
            </Grid>
          </div>
          {/* <Footer className={classes.footer} /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
