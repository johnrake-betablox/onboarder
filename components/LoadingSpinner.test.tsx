import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./LoadingSpinner";

test("renders a snapshot", () => {
  const { asFragment } = render(<LoadingSpinner />);
  expect(asFragment()).toMatchSnapshot();
});
