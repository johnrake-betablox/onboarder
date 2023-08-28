import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubmitButton from "./SubmitButton";

test("renders a snapshot", () => {
  const { asFragment, getByText } = render(<SubmitButton />);
  expect(getByText("Save")).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

test("renders with optional text", () => {
  const { asFragment, getByText } = render(
    <SubmitButton text="Create Account" />,
  );
  expect(getByText("Create Account")).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});
