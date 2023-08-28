import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import GlobalLoadingIndicator from "./GlobalLoadingIndicator";

test("renders a snapshot", () => {
  const { asFragment } = render(<GlobalLoadingIndicator />);
  expect(asFragment()).toMatchSnapshot();
});
