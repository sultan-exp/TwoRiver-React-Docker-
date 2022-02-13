import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import StopIcon from "@material-ui/icons/Stop";

import { makeStyles } from "@material-ui/core/styles";

import BannerFig from "./../assets/banner.png";
import SendMoneyIpad from "./../assets/Sendmoneyipad.png";
import PAycruiserMobile from "./../assets/PAycruiserMobile.png";
import Logo from "./../assets/logo.png";
import AppleIcon from "@material-ui/icons/Apple";
import AndroidIcon from "@material-ui/icons/Android";
import cardIcon1 from "./../assets/card-icon1.png";
import cardIcon2 from "./../assets/card-icon2.png";
import cardIcon3 from "./../assets/card-icon3.png";
import cardIcon4 from "./../assets/card-icon4.png";
import cardIcon5 from "./../assets/card-icon5.png";
import cardIcon6 from "./../assets/card-icon6.png";
import cardIcon7 from "./../assets/card-icon7.png";
import Testimonials from "../Components/Landing/Testimonials";
import CustomizedSignupSteppers from "./CustomizedSignupSteppers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  colSpace: {
    padding: theme.spacing(2),
  },
  banner: {
    background: "#f5f5f5",
    boxShadow: "none",
  },
  secTwo: {
    background: "#fcfcfc",
  },
  avtarFigHeight: {
    height: "50px",
  },
  boxShadow: {
    boxShadow: "0px 2px 25px -1px rgb(0 0 0 / 20%)",
  },
}));
function Landing() {
  const classes = useStyles();

  return (
    <Fragment key={"landing-page"}>
      <div className="landing-page">
        <div className="main-wrapper">
          <Grid className={"secInrGap " + classes.banner}>
            <Container className="container" spacing={2}>
              <Box
                display="flex"
                flexDirection="row"
                alignitems="center"
                flexWrap="wrap"
              >
                <Grid boxshadow={0} item md={6}>
                  <Paper
                    className={"bannerCaption " + classes.banner}
                    boxshadow={0}
                  >
                    <div className="bannerCaptInr">
                      <Typography className="Title_h2">
                        Reinventing Payments
                      </Typography>
                      <Typography className="Title_h4">
                        Enabling businesses to accept, access, and send money
                        anywhere, anytime, without requiring credit cards or
                        bank accounts.
                      </Typography>
                      {/* <Typography className="Title_h6">
                        PayCruiser is a financially inclusive technology for
                        businesses, the unbanked and underbanked.
                      </Typography> */}
                      <div className="btn-banner">
                        <Button href="/#signup" className="btn btn-theme">
                          GET STARTED
                        </Button>
                      </div>
                    </div>
                  </Paper>
                </Grid>
                <Grid boxshadow={0} item md={6}>
                  <Paper className={"bannerFig " + classes.banner}>
                    <img src={BannerFig} alt="" />
                  </Paper>
                </Grid>
              </Box>
            </Container>
          </Grid>

          <Grid className={"businessesSec secInrGap " + classes.secTwo}>
            <Container className={"container " + classes.secTwo}>
              <Box className={"MainHeading " + classes.secTwo}>
                <Typography className="SecTitle">
                  PayCruiser is how businesses get paid online{" "}
                </Typography>
                <Typography
                  className="SecSubTitle"
                  style={{ "text-align": "justify" }}
                >
                  Get paid, send and receive funds in near real-time, without
                  exposing your customers bank accounts or credit card
                  information. Our patent-pending mobile payments technology
                  connects businesses with the other half of the world's
                  population, the unbanked–previously excluded from the global
                  financial ecosystem. Businesses and government organizations
                  use PayCruiser every day to accept payments in areas such as
                  healthcare, real estate, and e-commerce.
                </Typography>
              </Box>
              <Box
                spacing={3}
                display="flex"
                flexDirection="row"
                alignitems="start"
                flexWrap="wrap"
              >
                <Grid item md={4} className={classes.colSpace}>
                  <Paper className={"ColCard " + classes.boxShadow}>
                    <Box boxshadow={0} className={`cardContent`}>
                      <Box className={`BussCard`}>
                        <CardMedia
                          className={"AvtarFig " + classes.avtarFigHeight}
                        >
                          <img src={cardIcon1} alt="" />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Payments Infrastructure
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Cross-Platform Payments Infrastructure enabling
                            businesses to accept payments online, offline,
                            In-App, and In-Store
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item md={4} className={classes.colSpace}>
                  <Paper className={`ColCard ${classes.boxShadow}`}>
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard">
                        <CardMedia
                          className={"AvtarFig " + classes.avtarFigHeight}
                        >
                          <img src={cardIcon2} alt="" />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Send and Receive Money
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            <b>Free</b> transfers to bank accounts, credit cards
                            and mobile numbers in 129 countries–Built for the
                            unbanked.
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={4} className={classes.colSpace}>
                  <Paper className={`ColCard ${classes.boxShadow}`}>
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard">
                        <CardMedia
                          className={"AvtarFig " + classes.avtarFigHeight}
                        >
                          <img src={cardIcon3} alt="" />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Fraud Prevention & AML
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Protecting businesses from theft, fraud & cash
                            management and meet or exceed Anti Money Laundering
                            (AML) compliances
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Box>
              <Box id="why-paycruiser" className={classes.colSpace}></Box>
              <Box
                className={"paycruBlock " + classes.colSpace}
                display="flex"
                flexDirection="row"
                alignitems="start"
                flexWrap="wrap"
              >
                <Grid item md={1} className={classes.colSpace}></Grid>
                <Grid item md={4} className={classes.colSpace}>
                  <MenuList className="secMenuList">
                    <MenuItem className="menuItem">
                      <Box>
                        <Paper className="blueBox"></Paper>
                        <Typography variant="inherit">
                          Accepts Payments
                        </Typography>
                        <ListItemIcon>
                          <ArrowForwardIosIcon fontSize="small" />
                        </ListItemIcon>
                      </Box>
                    </MenuItem>
                    <MenuItem className="menuItem">
                      <Paper className="blueBox"></Paper>
                      <Typography variant="inherit">Send Money</Typography>
                      <ListItemIcon>
                        <ArrowForwardIosIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem className="menuItem">
                      <Paper className="blueBox"></Paper>
                      <Typography variant="inherit" noWrap>
                        Mobile Bank Account
                      </Typography>
                      <ListItemIcon>
                        <ArrowForwardIosIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem className="menuItem">
                      <Paper className="blueBox"></Paper>
                      <Typography variant="inherit" noWrap>
                        Security & Compliance
                      </Typography>
                      <ListItemIcon>
                        <ArrowForwardIosIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  </MenuList>
                </Grid>
                {/* <Grid item md={1} className={classes.colSpace}></Grid> */}
                <Grid item md={7} className={classes.colSpace}>
                  <Box className={"PaycruCapt " + classes.colSpace}>
                    <Typography className="SecTitle">
                      What is Paycruiser?
                    </Typography>
                    <Typography className="SecSubTitle">
                      <b>
                        PayCruiser is the way businesses get paid worldwide.
                      </b>{" "}
                      We enable businesses and individuals to accept and send
                      money anywhere (with no fees), anytime. Funds are securely
                      received in near real-time, without exposing bank accounts
                      or credit card information. Through our patent-pending
                      phonepay technology, customers can make payments using
                      their phone number as a method of payment (instead of
                      their credit card or bank account)– This enables us to
                      connect businesses and individuals with the world’s 2.7
                      billion unbanked and underbanked population previously
                      excluded from the global financial ecosystem. PayCruiser
                      is a financially inclusive technology for businesses, the
                      unbanked and underbanked.
                      <br />
                      <br />
                      Businesses and government organizations use PayCruiser
                      every day to accept payments in areas such as healthcare,
                      real estate, and e-commerce.
                      <br />
                      <br />
                      Most recently, PayCruiser launched its <b>free</b>{" "}
                      cross-border remittance app, allowing users to securely
                      send money anywhere.
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Container>
          </Grid>

          <Grid className="why-Paycruiser bg-blue secInrGap">
            <Container className="container">
              <Box className="MainHeading">
                <Typography className="SecTitle TitleWhite">
                  Why Paycruiser?
                </Typography>
              </Box>
              <Box
                spacing={5}
                display="flex"
                flexDirection="row"
                alignitems="start"
                flexWrap="wrap"
              >
                <Grid item md={6} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardMedia className="AvtarFig">
                          <img src={cardIcon4} alt="" />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Personal Experience
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            Our team has roots, relationships, and personal
                            experience in target markets experiencing issues we
                            are addressing
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={6} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardMedia className="AvtarFig">
                          <img src={cardIcon5} alt="" />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Security and Compliance
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            We are a "Security First" company running on a fully
                            proprietary microservice infrastructure with multi
                            layer security running on premise and in the cloud,
                            enabling businesses to meet compliance requirements
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={6} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardMedia className="AvtarFig">
                          <img src={cardIcon6} alt="" />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Built for the unbanked
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            65% of the world's 2.7Bn unbanked and underbanked
                            population cannot read or write western languages
                            and therefore, are unable to open bank accounts by
                            themselves. PayCruiser empowers this population to
                            access the global financial system to make and
                            receive payments
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={6} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardMedia className="AvtarFig">
                          <img src={cardIcon7} alt="" />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Speed and Flexibility
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            Our patent-pending flexible distributed technology
                            enables us to scale globally while easily allowing
                            for customization to address realities in developing
                            markets
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Box>
            </Container>
          </Grid>

          <Grid id={"send-money"} className="SendMoney-sec secInrGap">
            <Container className="container">
              <Box
                container
                spacing={3}
                className=""
                display="flex"
                flexDirection="row"
                alignitems="start"
                flexWrap="wrap"
              >
                <Grid item md={6} className={classes.colSpace}>
                  <Box className="PaycruCapt">
                    <Typography className="SecTitle">
                      Send Money To Mobile Wallets Everywhere
                    </Typography>
                    <Typography className="SecSubTitle">
                      Securely send money to your recipient's mobile number,
                      debit card or bank account. Funds are received within
                      minutes. <b>Mobile Money transfers are 100% free</b>. We
                      also provide seamless transfers to bank accounts worldwide
                    </Typography>
                    <Box
                      container
                      spacing={3}
                      className=""
                      dsisplay="flex"
                      flexDirection="row"
                      alignitems="start"
                      flexWrap="wrap"
                    >
                      <Grid container>
                        <Grid item md={6}>
                          <List
                            component="nav"
                            className="squareList"
                            aria-label="contacts"
                          >
                            <ListItem button>
                              <ListItemIcon>
                                <StopIcon />
                              </ListItemIcon>
                              <ListItemText primary="Send to Money to +129 Countries" />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item md={6}>
                          <List
                            component="nav"
                            className="squareList"
                            aria-label="contacts"
                          >
                            <ListItem button>
                              <ListItemIcon>
                                <StopIcon />
                              </ListItemIcon>
                              <ListItemText primary="Free transfers to mobile numbers worldwide" />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item md={6}>
                          <List
                            component="nav"
                            className="squareList"
                            aria-label="contacts"
                          >
                            <ListItem button>
                              <ListItemIcon>
                                <StopIcon />
                              </ListItemIcon>
                              <ListItemText primary="Include unbanked customers into the global financial ecosystem" />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item md={6}>
                          <List
                            component="nav"
                            className="squareList"
                            aria-label="contacts"
                          >
                            <ListItem button>
                              <ListItemIcon>
                                <StopIcon />
                              </ListItemIcon>
                              <ListItemText primary="Programmatic ACH transfers to US Bank Accounts" />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item md={12} xs={12} xm={12}>
                          <div className="btn-section">
                            <Box
                              component="div"
                              display="inline"
                              // display="block" //for vertical alignment
                              p={1}
                              m={1}
                              // bgcolor="background.paper"
                            >
                              <Button
                                href="https://apps.apple.com/us/app/paycruiser/id1420821593"
                                rel=""
                                target="_blank"
                                startIcon={<AppleIcon />}
                                xs={12}
                                sm={12}
                                md={6}
                                className="btn btn-theme-white"
                              >
                                {" "}
                                DOWNLOAD IOS APP{" "}
                              </Button>
                            </Box>
                            <Box
                              component="div"
                              display="inline"
                              // display="block"
                              p={1}
                              m={1}
                              // bgcolor="background.paper"
                            >
                              <Button
                                href="https://play.google.com/store/apps/details?id=com.paycruiser.app"
                                rel=""
                                target="_blank"
                                startIcon={<AndroidIcon />}
                                xs={12}
                                sm={12}
                                md={6}
                                className="btn btn-theme-white"
                                round
                              >
                                {" "}
                                GET IT ON ANDROID{" "}
                              </Button>
                            </Box>
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={6} className={classes.colSpace}>
                  {SendMoneyIpad ? <img src={SendMoneyIpad} alt="" /> : null}
                </Grid>
              </Box>
            </Container>
          </Grid>

          <Grid id="payments" className="ServicesSec secInrGap">
            <Container className="container">
              <Box className="MainHeading">
                <Typography className="SecTitle">
                  We offer a huge variety of Payments Solutions{" "}
                </Typography>
                <Typography className="SecSubTitle">
                  We have custom solutions across a wide range of businesses. We
                  believe that each of business has different needs, hence, our
                  PCI compliant payments infrastructure was built to support for
                  customization and speed of delivery at scale.
                </Typography>
              </Box>

              <Box
                className="ServicesList"
                spacing={5}
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
              >
                <Grid item md={4} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard ServicesCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Mobile and Desktop Payments
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            IOS, Android mobile apps and desktop applications to
                            accept, access and send payments anywhere, anytime
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={4} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard ServicesCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            In Store and Contactless Payments
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            Instantly turn your connected devices into a smart
                            point of sale system and accept payments from all
                            credits/debit cards. Use our sleek, modern
                            contactless card readers to securely accept all
                            major credit, debit, and EMV chip cards
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={4} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard ServicesCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Online & Recurring Payments
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            Start accepting credit card payments from your smart
                            phones, tablets, on your website, or through our
                            simple API, at the lowest rate in the market. Use
                            our contactless credit card readers, or charge
                            manually, your choice
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={4} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard ServicesCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Google Voice and Alexa Payments
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            A financially inclusive technology for businesses,
                            the unbanked and underbanked, allowing clients to
                            use their voice to securely accept, access and send
                            money anywhere, anytime
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={4} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard ServicesCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Phone, SMS and Email Payments
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            A financially inclusive technology for businesses,
                            the unbanked and underbanked, allowing clients to
                            use their mobile number to securely accept, access
                            and send money anywhere, anytime
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item md={4} className={classes.colSpace}>
                  <Paper className="ColCard BoxSdwNone buleCard ServicesCard">
                    <Box boxshadow={0} className="cardContent">
                      <Box className="BussCard" textalign="left">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Programmable Payments API
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            textalign="left"
                          >
                            Programmable payments infrastructure to securely
                            send, accept or facilitate card payments within your
                            website or mobile applications, via REST APIs. Our
                            API support both card present and card not present
                            transactions
                          </Typography>
                        </CardContent>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Box>
            </Container>
          </Grid>

          <Testimonials />

          {/* <Grid className="PaycruiserMob-sec secInrGap">
            <Container className="container">
              <Box
                container
                spacing={3}
                className=""
                display="flex"
                flexDirection="row"
                alignitems="center"
                flexWrap="wrap"
              >
                <Grid item md={6} className={classes.colSpace}>
                  <Paper className="BoxSdwNone" textalign="left">
                    <img src={PAycruiserMobile} alt="" />
                  </Paper>
                </Grid>
                <Grid item md={6} className={classes.colSpace}>
                  <Box className="PaycruCapt">
                    <Typography className="SecTitle">
                      Paycruiser for mobile
                    </Typography>
                    <Typography className="SecSubTitle">
                      With the Payment app, your payment is never more than a
                      click away
                    </Typography>
                    <div className="btn-section">
                      <Button
                        xs={12}
                        sm={12}
                        md={12}
                        className="btn btn-theme"
                        startIcon={<AppleIcon />}
                      >
                        {" "}
                        DOWNLOAD APP{" "}
                      </Button>
                    </div>
                  </Box>
                </Grid>
              </Box>
            </Container>
          </Grid> */}
          <Grid className="PaycruiserMob-sec secInrGap">
            <Container className="container">
              <Box id={"signup"} className="MainHeading">
                {/* <Typography className="SecTitle">Sign Up</Typography> */}
                <CustomizedSignupSteppers />
              </Box>
            </Container>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
}

export default Landing;
