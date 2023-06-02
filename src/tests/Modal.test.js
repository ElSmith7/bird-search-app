import { screen, fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../utils/utils-for-tests";
import Modal from "../components/Modal";

const modalContainerMock = document.createElement("div");
modalContainerMock.setAttribute("class", "modal-container");
document.body.appendChild(modalContainerMock);

describe("Modal", () => {
  test("displays the children", () => {
    renderWithProviders(
      <Modal onClose={jest.fn()} actionBar={null}>
        <div>Test Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("displays the action bar", () => {
    renderWithProviders(
      <Modal onClose={jest.fn()} actionBar={<button>Close</button>}>
        <div>Test Content</div>
      </Modal>
    );

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  test("closes when modal background is clicked", () => {
    const handleClose = jest.fn();

    renderWithProviders(
      <Modal onClose={handleClose} actionBar={null}>
        <div>Test Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-background"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
