import { renderWithProviders } from "../utils/utils-for-tests";
import { screen, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal";

test("modal shows children and a close ");
// test("modal shows when user enters nothing in search fields", async () => {
//   renderWithProviders(<SearchBird />);

//   const birdInput = screen.getByRole("textbox");
//   const numberInput = screen.getByRole("spinbutton");
//   const button = screen.getByRole("button");

//   expect(birdInput).toHaveValue("");

//   expect(numberInput).toHaveValue(null);

//   user.click(button);
//   await waitFor(() => {
//     expect(screen.getByTestId("modal")).toBeInTheDocument();
//   });
// });
