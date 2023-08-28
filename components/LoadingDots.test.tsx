import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingDots from "./LoadingDots";

test("renders a snapshot", () => {
  const { asFragment } = render(<LoadingDots />);
  expect(asFragment()).toMatchSnapshot();
});
