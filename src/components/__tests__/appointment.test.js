/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment/Index/Index";



describe("Appointment", () => {
    it("renders without crashing", () => {
      render(<Appointment />);
    });
  });
  

