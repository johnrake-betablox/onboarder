import { render } from "@testing-library/react";

export async function renderAsync<T>(
  asyncComponent: (props: T) => Promise<JSX.Element>,
  props: T,
) {
  const jsx = await asyncComponent(props);
  render(jsx);
}
