import React from "react";
import { withRouter } from "react-router-dom";
import GridContainer from "../../DashboardComponents/Grid/GridContainer.jsx";
import GridItem from "../../DashboardComponents/Grid/GridItem.jsx";
import { StepContactInfo } from "./WizardSteps/StepContactInfo.jsx";
import { StepVerification } from "./WizardSteps/StepVerification.jsx";
import { StepBankInfo } from "./WizardSteps/StepBankInfo.jsx";
import { auth } from "../../actions/auth-helper";
import { getSubDomain } from "../../DashboardComponents/Wizard/utils";
import { SignUpStepper } from "../../DashboardComponents/Wizard/SignUpStepper";
import { StepIdVerification } from "./WizardSteps/StepIdVerification";

class WizardView extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    if (auth.loggedIn()) {
      history.push("/on-boarding");
    }
  }

  render() {
    const subDomain = getSubDomain();
    const title = subDomain
      ? `Sign up on ${subDomain.toUpperCase()}`
      : "Sign Up";
    return (
      <Grid container justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <SignUpStepper
            validate
            steps={[
              {
                stepName: "Contact Info",
                stepComponent: StepContactInfo,
                stepId: "about",
              },
              {
                stepName: "Account Verification",
                stepComponent: StepVerification,
                stepId: "account",
              },
              {
                stepName: "Payout Information",
                stepComponent: StepBankInfo,
                stepId: "payoutInfo",
              },
              {
                stepName: "ID Verification",
                stepComponent: StepIdVerification,
                stepId: "persona",
              },
            ]}
            title={title}
            subtitle="This information will expedite your on-boarding process."
          />
        </GridItem>
      </Grid>
    );
  }
}

export default withRouter(WizardView);
