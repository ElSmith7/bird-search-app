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

      <div className="grid fixed content-center inset-0">
        <Panel data-testid="modal" className="mx-auto" remove>
          <div className="flex flex-col h-full text-center text-lg font-semibold">
            {children}
            <div className="flex justify-center mt-5 font-normal">
              {actionBar}
            </div>
          </div>
        </Panel>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
