import { render, fireEvent } from "@testing-library/react";
import ToggleColorScheme from "../components/ToggleColorScheme";

test("ToggleColorScheme toggles color scheme on click", () => {
  const { getByTestId } = render(<ToggleColorScheme />);

  expect(document.documentElement.getAttribute("data-color-scheme")).toBe(
    "light"
  );
  const switchElement = getByTestId("color-scheme-switch");

  fireEvent.click(switchElement);

  expect(document.documentElement.getAttribute("data-color-scheme")).toBe(
    "dark"
  );
});
