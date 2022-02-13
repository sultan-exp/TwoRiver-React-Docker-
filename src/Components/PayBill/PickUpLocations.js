import React, { Component } from "react";
import "react-image-lightbox/style.css";
import "toastr/build/toastr.css";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { connect } from "react-redux";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Loader from "../Loader";
import { pickupLocations } from "../../actions/remittances";

const columns = ["Agence", "Action", "Quartier", "Adresse", "Ville"];

const options = {
  filterType: "dropdown",
  responsive: "scrollMaxHeight",
  rowsPerPage: 250,
  download: false,
};

class PickupLocationsPure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUnitError: false,
    };
  }

  componentDidMount() {
    // this.props.pickupLocations();
  }

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            fontFamily:
              '"SF Pro Display","SF Pro Icons","Helvetica Neue",Helvetica,Arial,"sans-serif" !important',
          },
        },
      },
    });

  shouldComponentUpdate(nextProps) {
    const { length } = nextProps;
    return length !== this.props.length;
  }

  handleButton = () => {};

  render() {
    const { locations: data } = this.props;
    const { classes, handleUpay } = this.props;
    let buffer = [];
    if (data && data.length > 0) {
      buffer = data.map((d) => [
        d.agency_name,
        <Link
          // className={classes.button}
          // color="primary"
          onClick={handleUpay}
          variant="contained"
        >
          payer ici
        </Link>,
        d.neighborhood,
        d.address,
        d.city,
      ]);
    } else {
      buffer = [];
    }
    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={"Agences de proximité de paiement en especes"}
            data={buffer}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

class PickUpLocationsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return this.props.locations ? (
      <PickupLocationsPure {...this.props} {...this.state} />
    ) : (
      <Loader size={40} thickness={4} />
    );
  }
}

export default PickUpLocationsComponent;

// const mapStateToProps = ({ locations }) => ({
//   locations: locations.locations.results, //pickup_location
// });

// const matchDispatchToProps = (dispatch) => ({
//   pickupLocations: () => dispatch(pickupLocations()),
// });

// export default connect(
//   mapStateToProps,
//   matchDispatchToProps
// )(withStyles(transactionsStyle)(PickUpLocationsComponent));
