import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";

import "react-perfect-scrollbar/dist/css/styles.css";
import "./App.css";
import { connect } from "react-redux";
import Header from "./Components/Header";
import DashboardSidebar from "./Components/DashboardSidebar";
import Footer from "./Components/Footer";
import hist from "./history";
import indexRoutes from "./routes/index";
import { validateToken } from "./actions/misc";
import { auth } from "./actions/auth-helper";
// import Sidebar from './Components/Sidebar/Sidebar/Sidebar.js';
import Dashboard from './Pages/Dashboard/Dashboard.js';
const MainApp = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  {
    /* This is what controls wheter the pae should have header/footer. For iframes, we don't want either*/
  }
  const isIframe = location.pathname.includes("/widget") || location.pathname.includes("/dashboard");
  return (
    <>
      {/* {!isIframe && (
        <>
          <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
          <DashboardSidebar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
        </>
      )} */}
      <Dashboard>
        <Switch>
          {indexRoutes.map((prop, key) => {
            const MyComponent = prop.component;
            if (prop.loginRequired && !auth.loggedIn()) {
              return <Redirect from={prop.path} to="/login" key={key} />;
            }
            const Component = (props) => <MyComponent {...props} />;
            return (
              <Route exact path={prop.path} key={key} component={Component} />
            );
          })}
        </Switch> 
      </Dashboard>
    </>
  );
};

const App = connect()(({ dispatch }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => {
    if (auth.loggedIn()) {
      dispatch(validateToken());
    }
  }, []);
  return (
    <Router history={hist}>
      <MainApp />
    </Router>
  );
});

export default App;
