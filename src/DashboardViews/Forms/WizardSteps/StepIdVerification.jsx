import React from "react";
import toastr from "toastr";
import { withRouter } from "react-router-dom";
import Button from "../../../Components/CustomButtons/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { UpdateMerchantInfo } from "../../../actions/misc";
import { SignUpStepsFooter } from "../../../DashboardComponents/Wizard/SignUpStepper";

class PersonaVerification extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  state = {};

  client = new window.Persona.Client({
    templateId: "tmpl_dpUFQtjPzFHStyHzXYhHueec",
    environment:
      process.env.REACT_APP_HOST_ENV === "development"
        ? "sandbox"
        : "production",
    onLoad: () => {
      this.setState({ inquiryId: null });
    },
    onComplete: inquiryId => {
      this.setState({ inquiryId });
      this.save();
    }
  });

  componentDidMount() {
    this.setState({ inquiryId: null });
    this.client.open();
  }

  isValidated() {
    if (!this.state.inquiryId) {
      toastr.error("Id verification was not successful");
    }
    return this.state.inquiryId;
  }

  save = () => {
    const { UpdateMerchantInfo, wizardState, history } = this.props;
    const { bankingInfo } = wizardState;
    this.setState({ saving: true });
    return UpdateMerchantInfo({
      ...bankingInfo,
      id_verification_ref: this.state.inquiryId
    })
      .then(() => {
        history.push("/on-boarding");
        toastr.success("You sucessfully signed up");
        this.setState({ saving: false });
        return bankingInfo;
      })
      .catch(err => {
        toastr.options.timeOut = 10000;
        toastr.options.extendedTimeOut = 10000;
        toastr.error(err.message);
        throw err;
      });
  };

  render() {
    const { hasPrevious, onPrevious, hasNext } = this.props;
    const { saving } = this.state;
    return (
      <>
        <div>
          <Button
            color="rose"
            simple
            block
            size="lg"
            onClick={() => this.client.open()}
          >
            Try Again
          </Button>
        </div>
        <SignUpStepsFooter
          {...{
            hasPrevious,
            onPrevious,
            isSubmitting: saving,
            hasNext,
            submitForm: this.save
          }}
        />
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatch = { UpdateMerchantInfo };

export const StepIdVerification = withRouter(
  withStyles({})(
    connect(
      mapStateToProps,
      mapDispatch,
      null
    )(PersonaVerification)
  )
);
