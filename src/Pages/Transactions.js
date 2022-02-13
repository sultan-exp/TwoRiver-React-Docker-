import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { size, filter } from "lodash";

import "react-image-lightbox/style.css";
import "toastr/build/toastr.css";
import MUIDataTable from "mui-datatables";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Grid, CircularProgress, Button } from "@material-ui/core";
import { getMyTransactions } from "../actions/transactions";
const columns = [
  "Tag",
  "Time",
  "Name Entered",
  "Card Number",
  "Card Type",
  "Amount Paid",
  "Fee",
  "Payout",
  "Type",
  "Status",
  "Payout Status",
  "Merchant Id",
  "Customer Ref.",
  "Payout Date",
];

const options = {
  search: "true",
  download: "true",
  print: "true",
  viewColumns: "true",
  filter: "true",
  filterType: "dropdown",
  responsive: "scrollMaxHeight",
  rowsPerPage: 100,
};

class Transactions extends Component {
  state = {
    hasUnitError: false,
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveScroll: {
            maxHeight: "19px",
          },
        },
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

  render() {
    const data = this.props.transactions;
    let buffer = [];
    if (data && data.length > 0) {
      buffer = data.map((d) => [
        d.tag,
        // d.time,
        "" + d.time,
        d.cardholder_name,
        d.card_number,
        d.card_type,
        d.amount,
        d.processing_fees_str,
        d.payout_amount_str,
        d.transaction_type,
        d.status,
        d.payout_status_str,
        d.ref_num,
        d.cust_ref_num,
        d.payout_record && d.payout_record.current_payout_date,
      ]);
    } else {
      buffer = [];
    }
    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={"Your Transactions History"}
            data={buffer}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

const startDateVar = new Date();
startDateVar.setMonth(startDateVar.getMonth() - 1);
class TransactionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      startDate: startDateVar,
      endDate: new Date(),
      filteredTransactions: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const { transactions } = this.props;
    this.setState({ filteredTransactions: transactions });
  }
  componentDidUpdate(prevState, prevProps) {
    if (prevProps.transactions != this.props.transactions) {
      this.setState({
        transactions: this.props.transactions,
        filteredTransactions: this.props.transactions.results,
      });
    }
  }

  UNSAFE_componentWillMount() {
    this.props.getMyTransactions();
  }
  applyFilter = () => {
    const { startDate, endDate } = this.state;
    if (endDate && endDate) {
      this.setState({ filters: { startDate, endDate } });
    }
    const { transactions } = this.props;
    const filteredTransactions = this.getFilteredTransctions(transactions);
    this.setState({ filteredTransactions });
  };

  filter = () => {
    return (
      <div
        style={{ display: "flex", width: "80%", justifyContent: "flex-end" }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Filter From Date"
              value={this.state.startDate}
              // onChange={handleDateChange}
              onChange={(date) => this.setState({ startDate: date })}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Filter To Date"
              value={this.state.endDate}
              // onChange={this.handleDateChange()}
              onChange={(date) => {
                this.setState({ endDate: date });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />

            <Button
              color="transparent"
              onClick={() =>
                this.setState({ filters: {}, startDate: null, endDate: null })
              }
            >
              Clear
            </Button>
            <Button
              color="rose"
              onClick={() => this.applyFilter()}
              // disabled={!this.state.endDate || !this.state.startDate}
            >
              Apply
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  };

  getFilteredTransctions = (transactions) => {
    const { endDate, startDate } = this.state.filters || {};

    if (!endDate || !startDate) {
      return transactions?.results;
    }

    if (!transactions?.results) return [];
    const results = transactions.results.filter((transaction) => {
      const time = new Date(transaction.created_at);
      return time >= startDate && time <= endDate;
    });
    return results;
  };

  render() {
    // const classes = useStyles();
    const { transactions } = this.props;
    const { filteredTransactions } = this.state;
    // const filteredTransactions = this.getFilteredTransctions(transactions);
    const tablesection = {
      minHeight: "800px",
      paddingTop: 15,
      backgroundColor: "#fff",
      textAlign: "center",
    };
    const Spinnersection = {
      minHeight: "400px",
      paddingTop: 80,
      backgroundColor: "#fff",
      textAlign: "center",
    };
    return this.props.transactions ? (
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <div style={tablesection}>
            {this.filter()}
            <Transactions
              {...this.props}
              transactions={filteredTransactions}
              length={size(filteredTransactions)}
            />
          </div>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    ) : (
      <div style={Spinnersection}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.transactions_list,
  };
};

const matchDispatchToProps = (dispatch) => ({
  getMyTransactions: () => dispatch(getMyTransactions()),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(TransactionsComponent);
