import { render, fireEvent } from "@testing-library/react";
import { ErrorPage } from "../components/ErrorPage";

test("ErrorPage renders correctly and refreshes on button click", () => {
  const reloadSpy = jest
    .spyOn(window.location, "reload")
    .mockImplementation(() => {});
  const { getByText } = render(<ErrorPage />);

  expect(getByText("Error.")).toBeInTheDocument();
  expect(
    getByText("An error occurred during the data retrieval process.")
  ).toBeInTheDocument();

  const refreshButton = getByText("Refresh");
  fireEvent.click(refreshButton);

  expect(reloadSpy).toHaveBeenCalled();

  reloadSpy.mockRestore();
});
