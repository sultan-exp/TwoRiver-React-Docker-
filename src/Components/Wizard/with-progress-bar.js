import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Schedule from "@material-ui/icons/Schedule";
import Success from "components/Typography/Success.jsx";
import cardBlog2 from "../../assets/img/examples/card-blog2.jpg";
import marc from "../../assets/img/faces/marc.jpg";

import { BrowserRouter, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Wizard, Steps, Step } from "react-albus";
import { Line } from "rc-progress";
import Navigation from "./Navigation";
import "./wizard-animation.css";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import styles from "../../assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

const useStyles = makeStyles(styles);
export default function WizardWithProgress() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className="row pad-t">
        <div className="col-xs-6 col-xs-offset-3">
          <Route
            render={({ history }) => (
              <Wizard
                history={history}
                render={({ step, steps }) => (
                  <div>
                    <Line
                      percent={((steps.indexOf(step) + 1) / steps.length) * 100}
                      className="pad-b"
                    />
                    <TransitionGroup>
                      <CSSTransition
                        key={step.id}
                        classNames="example"
                        timeout={{ enter: 500, exit: 500 }}
                      >
                        <div className="example-steps fluid">
                          <Steps key={step.id} step={step}>
                            <Step id="gandalf">
                              <h1 className="text-align-center">Gandalf</h1>
                            </Step>
                            <Step id="dumbledore">
                              <h1 className="text-align-center">Dumbledore</h1>
                            </Step>
                            <Step id="ice-king">
                              <h1 className="text-align-center">Ice King</h1>
                            </Step>
                          </Steps>
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                    <Navigation />
                  </div>
                )}
              />
            )}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

// export default AddProgressBar;
