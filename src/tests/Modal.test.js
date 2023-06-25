import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { renderWithProviders } from "../utils/utils-for-tests";
import { _modalContainerMock } from "./mocks/modalContainer";
import Modal from "../components/Modal";

function renderModal({ onClose, actionBar, children }) {
  renderWithProviders(
    <Modal onClose={onClose} actionBar={actionBar}>
      {children}
    </Modal>
  );
}

test("displays the children", () => {
  renderModal({
    onClose: jest.fn(),
    actionBar: null,
    children: <div>Test Content</div>,
  });

  expect(screen.getByText("Test Content")).toBeInTheDocument();
});

test("displays the action bar", () => {
  renderModal({
    onClose: jest.fn(),
    actionBar: <button>Close</button>,
    children: <div>Test Content</div>,
  });

  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
});

test("closes when modal background is clicked", () => {
  const handleClose = jest.fn();

  renderModal({
    onClose: handleClose,
    actionBar: null,
    children: <div>Test Content</div>,
  });

  user.click(screen.getByTestId("modal-background"));

  expect(handleClose).toHaveBeenCalledTimes(1);
});
