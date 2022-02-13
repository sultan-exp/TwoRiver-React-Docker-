import React from "react";

import GridItem from "../../DashboardComponents/Grid/GridItem.jsx";
import CustomInput from "../../DashboardComponents/CustomInput/CustomInput.jsx";

const Input = ({ labelText, id, name, onChange, classname }) => (
  <GridItem xs={10} sm={10} md={10} lg={10} className={classname}>
    <CustomInput
      labelText={labelText}
      id={id}
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        onChange: onChange,
        name
      }}
    />
  </GridItem>
);

export default Input;
