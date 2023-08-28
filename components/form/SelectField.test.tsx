import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectField from "./SelectField";

const onChange = (value: any) => {};
const options = [
  { value: "KS", label: "Kansas" },
  { value: "CA", label: "California" },
  { value: "TX", label: "Texas" },
];

test("renders a snapshot", () => {
  const { asFragment } = render(
    <SelectField
      field="state"
      value="KS"
      onChange={onChange}
      options={options}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders a required field", () => {
  const { asFragment } = render(
    <SelectField
      field="state"
      value="CA"
      onChange={onChange}
      options={options}
      required
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
