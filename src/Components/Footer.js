import {
  Container,
  Box,
  Grid,
  Icon,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MapRounded from "@material-ui/icons/Room";

const useStyles = makeStyles((theme) => ({
  colSpace: {
    padding: theme.spacing(2),
  },
  white: {
    color: "#ffffff",
  },
  pagesLink: {
    color: "#ffffff",
    textDecoration: "none",
    marginBottom: "10px",
  },
  socialIcon: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <Grid className="Footer-sec secInrGap bg-blue">
      <Container className="container">
        <Box
          container
          spacing={3}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
        >
          <Grid item md={4} className={classes.colSpace}>
            <Box className="AboutFooter">
              <Paper className="BoxSdwNone FooterLogo">
                <div display="flex" alignitems="center" className="BrandLogo">
                  <Link to="/">
                    <Logo from="footer" />
                  </Link>
                  <span>Paycruiser</span>
                </div>
              </Paper>
              <Typography>How businessed get paid online</Typography>
              <div className="CopyRight">
                <Typography>2021 PayCruiser®</Typography>
                <Typography>PayCruiser Inc, All rights reserved.</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item md={8} className={classes.colSpace}>
            <Box
              container
              spacing={3}
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
            >
              <Grid item md={4} className={classes.colSpace}>
                <Box className="FooterCont">
                  <Typography className="MenuTtl">Contact</Typography>
                  <Box className="FtrContInfo">
                    <span>
                      <EmailIcon></EmailIcon>hello@paycruiser.com
                    </span>
                  </Box>
                  <Box className="FtrContInfo">
                    <span>
                      <CallIcon></CallIcon> +1 562 999 2511
                    </span>
                  </Box>
                  <Box className="FtrContInfo">
                    <span>
                      <MapRounded></MapRounded>2901 West Coast Highway, Suite
                      200, Newport Beach, CA 92663, USA
                    </span>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4} className={classes.colSpace}>
                <Box className="FooterWidget FooterPage">
                  <Typography className="MenuTtl">Pages</Typography>
                  <Box display="flex" flexDirection="column" flexWrap="wrap">
                    <a
                      className={classes.pagesLink}
                      variant="body2"
                      href={
                        "https://assurance.sysnetgs.com/assurancecard/be8e7fbc4499573fec7f61fac84b68873d3652c685b66709574812762054a0e2/assurancecard/"
                      }
                    >
                      {" "}
                      PCI Compliance{" "}
                    </a>
                    <Link
                      className={classes.pagesLink}
                      variant="body2"
                      to={"/privacy"}
                    >
                      {" "}
                      Privacy Policy{" "}
                    </Link>
                    <Link
                      className={classes.pagesLink}
                      variant="body2"
                      to={"/terms"}
                    >
                      {" "}
                      Terms Of Use{" "}
                    </Link>
                    <Link
                      className={classes.pagesLink}
                      variant="body2"
                      to={"/sales-refunds"}
                    >
                      {" "}
                      Sales & Refunds{" "}
                    </Link>
                    <Link
                      className={classes.pagesLink}
                      variant="body2"
                      to={"/bsa-aml-policy"}
                    >
                      {" "}
                      BSA & AML{" "}
                    </Link>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                sm={12}
                xs={12}
                md={3}
                className={`${classes.colSpace}`}
              >
                <Box className="FooterWidget">
                  <Box className={`FooterSocial ${classes.socialIcon}`}>
                    <a
                      href="https://www.facebook.com/paycruiser/"
                      className="SocialLink"
                      variant="body2"
                      target="_blank"
                    >
                      <FacebookIcon className={classes.white}></FacebookIcon>
                    </a>
                    <a
                      href="https://twitter.com/paycruiser"
                      className="SocialLink"
                      variant="body2"
                      target="_blank"
                    >
                      <TwitterIcon className={classes.white}></TwitterIcon>
                    </a>
                    <a
                      href="https://www.instagram.com/paycruiser/?hl=en"
                      className="SocialLink"
                      variant="body2"
                      target="_blank"
                    >
                      <InstagramIcon className={classes.white}></InstagramIcon>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/paycruiser-inc"
                      className="SocialLink"
                      variant="body2"
                      target="_blank"
                    >
                      <LinkedInIcon className={classes.white}></LinkedInIcon>
                    </a>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
};

export default Footer;
