import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormLabel from "./FormLabel";

test("renders a snapshot", () => {
  const { asFragment, getByText } = render(
    <FormLabel field="email" text="Email Address" />,
  );
  expect(getByText("Email Address")).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});
