import ReactDOM from "react-dom";
import { useEffect } from "react";
import Panel from "./Panel";

function Modal({ onClose, children, actionBar }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div data-testid="modal">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-200 opacity-80"
        data-testid="modal-background"
      ></div>

      <Panel
        className="grid fixed mx-auto my-auto h-max place-content-center inset-0"
        remove
      >
        <div className="flex flex-col h-full text-center text-lg font-semibold">
          {children}
          <div className="flex justify-center mt-5 font-normal">
            {actionBar}
          </div>
        </div>
      </Panel>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
