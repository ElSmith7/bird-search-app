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
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>

      <div className="fixed inset-0">
        <Panel className="mx-auto" remove>
          <div className="flex flex-col text-center h-full">
            {children}
            <div className="flex justify-center">{actionBar}</div>
          </div>{" "}
        </Panel>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
