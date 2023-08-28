import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextField from "./TextField";

const onChange = (value: any) => {};

test("renders a snapshot", () => {
  const { asFragment } = render(
    <TextField field="firstName" value="John" onChange={onChange} />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders a required field", () => {
  const { asFragment } = render(
    <TextField field="firstName" value="John" onChange={onChange} required />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders with a specific type", () => {
  const { asFragment } = render(
    <TextField
      field="password"
      value="secret"
      onChange={onChange}
      type="password"
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders with an autocomplete", () => {
  const { asFragment } = render(
    <TextField
      field="email"
      value="john@betablox.com"
      onChange={onChange}
      type="email"
      autoComplete="email"
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
