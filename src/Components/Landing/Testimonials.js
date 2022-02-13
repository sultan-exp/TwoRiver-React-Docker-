import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

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
}));

const Testimonials = (props) => {
  const classes = useStyles();

  return (
    <Grid className="TestimonialS-sec secInrGap">
      <Container className="container">
        <Box className="MainHeading">
          <Typography className="SecTitle">What They Say</Typography>
        </Box>
        <Carousel
          showThumbs={false}
          interval={3000}
          statusFormatter={() => null}
          renderArrowNext={() => null}
          renderArrowPrev={() => null}
        >
          <div className="SliderItem">
            <Box
              container
              spacing={3}
              className=""
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
            >
              <Grid item md={6} className={classes.colSpace}>
                <Box className="TestmnlCapt">
                  <FormatQuoteIcon />
                  <Typography className="TestCapt">
                    Provides One of the Most Advanced Security Platforms for
                    Commercial Financial Transactions “As a ‘security first’
                    company running on a fully proprietary microservice
                    architecture platform with multi-layer security running
                    on-premise and, on the cloud, PayCruiser meets or exceeds
                    compliance requirements from global financial institutions.”
                  </Typography>
                  <Typography className="AuthName">CIO View</Typography>
                </Box>
              </Grid>
              <Grid item md={6} className={classes.colSpace}>
                <Box className="TestmnlCapt">
                  <FormatQuoteIcon />
                  <Typography className="TestCapt">
                    ...The most advanced security for commercial financial
                    transactions. PayCruiser(PayCruiser) also offers customers
                    the ability to track their sales daily, weekly and monthly,
                    offering valuable real-time analysis of their best-selling
                    products, top clients, most profitable geographic areas—and
                    more—helping them further increase their business and stay
                    ahead of their competition
                  </Typography>
                  <Typography className="AuthName">
                    CIO Review Magazine
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </div>
          <div className="SliderItem">
            <Box
              container
              spacing={3}
              className=""
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
            >
              <Grid item md={6} className={classes.colSpace}>
                <Box className="TestmnlCapt">
                  <FormatQuoteIcon />
                  <Typography className="TestCapt">
                    Credit card payment systems will always get you with their
                    hidden fees, and that is why we were so relieved to finally
                    find out about PayCruiser. With PayCruiser, we pay an
                    extremely low fee only when we use the system, avoiding all
                    the monthly fees charged at the end of every month by other
                    solutions. We couldn’t be happier with our decision to
                    PayCruiser!
                  </Typography>
                  <Typography className="AuthName">
                    Los Angeles Afrobeats Festival
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6} className={classes.colSpace}>
                <Box className="TestmnlCapt">
                  <FormatQuoteIcon />
                  <Typography className="TestCapt">
                    Before PayCruiser, I was used to been charged so much
                    fees...I am so happy I switched to PayCruiser. Their
                    customer service is amazing. I can always get someone on the
                    phone within minutes and now, my monthly reports are
                    extremely easy to read and the fees are extremely simple to
                    understand. Plus, this is also a minority owned company - I
                    love it
                  </Typography>
                  <Typography className="AuthName">
                    Village Treasures ART Gallery
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </div>
          <div className="SliderItem">
            <Box
              container
              spacing={3}
              className=""
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
            >
              <Grid item md={6} className={classes.colSpace}>
                <Box className="TestmnlCapt">
                  <FormatQuoteIcon />
                  <Typography className="TestCapt">
                    "...The most advanced security for commercial financial
                    transactions. PayCruiser(PayCruiser) also offers customers
                    the ability to track their sales daily, weekly and monthly,
                    offering valuable real-time analysis of their best-selling
                    products, top clients, most profitable geographic areas—and
                    more—helping them further increase their business and stay
                    ahead of their competition"
                  </Typography>
                  <Typography className="AuthName">
                    CIO Review Magazine
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6} className={classes.colSpace}>
                <Box className="TestmnlCapt">
                  <FormatQuoteIcon />
                  <Typography className="TestCapt">
                    "Credit card payment systems will always get you with their
                    hidden fees, and that is why I was so relieved to finally
                    find out about PayCruiser. With PayCruiser, we pay an
                    extremely low fee only when we use the system, avoiding all
                    the monthly fees charged at the end of every month by the
                    competition. We couldn’t be happier with our decision to
                    PayCruiser!"
                  </Typography>
                  <Typography className="AuthName">
                    Los Angeles Afrobeats Dance Festival
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </div>
        </Carousel>
      </Container>
    </Grid>
  );
};

export default Testimonials;
