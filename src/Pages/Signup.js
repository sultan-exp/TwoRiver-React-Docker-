import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//signup wizard
import SignUpWizard from "../DashboardViews/Forms/SignUpWizard";
import signupPageStyle from "../assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1],
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <SignUpWizard />
        </div>
      </div>
    );
  }
}

export default withStyles(signupPageStyle)(Signup);
