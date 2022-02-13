/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get } from "lodash";
import Button from "@material-ui/core/Button";

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const CalendlyComponent = ({ setSkipBooking, onSchedule }) => {
  const [bookingComplete, setBookingComplete] = useState(false);
  useEffect(() => {
    window.Calendly.initInlineWidget({
      url: "https://calendly.com/paycruiser/30min?hide_event_type_details=1&text_color=132a51&hide_landing_page_details=1",
      parentElement: document.getElementById("calendlyDiv"),
    });
  }, []);

  const isCalendlyEvent = (e) => {
    return e.data.event && e.data.event.indexOf("calendly") === 0;
  };

  const messageListener = (evt) => {
    if (
      isCalendlyEvent(evt) &&
      get(evt, "data.event") === "calendly.event_scheduled"
    ) {
      setBookingComplete(true);
    }
  };

  useEffect(() => {
    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  return (
    <>
      <Section>
        <h2>Setup a 30 minutes free on boarding session.</h2>
      </Section>
      <div
        id="calendlyDiv"
        style={{
          width: "100%",
          height: 650,
          overflow: "hidden",
        }}
      />
      {/* <Section>
        {bookingComplete ? (
          <Button round color="primary" onClick={onSchedule}>
            Close
          </Button>
        ) : (
          <Button round color="primary" onClick={() => setSkipBooking(true)}>
            Skip
          </Button>
        )}
      </Section> */}
    </>
  );
};

export default CalendlyComponent;
