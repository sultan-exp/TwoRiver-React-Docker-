import React from "react";
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GeoDropdown from "./geo-dropdown";

export const CityOrLocation = ({ onAddressChange, address }) => {
  const updateAddress = (e) => {
    const newAddress = { ...address, [e.target.name]: e.target.value };

    onAddressChange({ target: { name: "address", value: newAddress } });
  };

  return (
    <Grid container spa>
      <GridItem md={12} sm={12} xs={12}>
        <GeoDropdown
          placeholder="City or Location"
          initialValue={address.location}
          onSuggestSelect={(val) =>
            updateAddress({
              target: { name: "location", value: val.description },
            })
          }
          location={
            new window.google.maps.LatLng(address.latitude, address.longitude)
          }
          radius="20"
        />
      </GridItem>
      <GridItem md={6} sm={6} xs={12}>
        <TextField
          label="Street"
          value={address.street}
          name="street"
          fullWidth
          margin="normal"
          onChange={updateAddress}
          formControlProps={{
            fullWidth: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </GridItem>
      <GridItem md={6} sm={6} xs={12}>
        <TextField
          label="City"
          value={address.city}
          name="city"
          fullWidth
          margin="normal"
          onChange={updateAddress}
          formControlProps={{
            fullWidth: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </GridItem>
      <GridItem md={6} sm={6} xs={12}>
        <TextField
          label="Zip Code"
          value={address.zip}
          name="zip"
          fullWidth
          margin="normal"
          onChange={updateAddress}
          formControlProps={{
            fullWidth: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </GridItem>
      <GridItem md={6} sm={6} xs={12}>
        <TextField
          label="Country"
          value={address.country}
          name="country"
          fullWidth
          margin="normal"
          onChange={updateAddress}
          formControlProps={{
            fullWidth: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </GridItem>
    </Grid>
  );
};
