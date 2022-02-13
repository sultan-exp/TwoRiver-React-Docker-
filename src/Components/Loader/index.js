import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const style = {
  margin: "auto",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignitems: "center",
};
const App = (props) => (
  <div style={style} {...props}>
    <CircularProgress />
  </div>
);

export default App;
