import { MdClose } from "react-icons/md";

{/* passes some Props to make this component resulable accordingly to the function linked via Main page to the Context API - to use Edit and Delete */}
const ConfirmBox = ({
  show,
  onClose,
  onConfirm,
  action = "perform this action",
}) => {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center 
                  bg-black bg-opacity-40 transition-opacity duration-300
                  ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`bg-[var(--bg-secondary)] text-[var(--text-secondary)]
                    border border-[var(--border-color)] shadow-lg 
                    shadow-[var(--shadow-color)]
                    rounded-lg p-6 w-11/12 sm:w-[400px] relative
                    transform transition-transform duration-300 ease-in-out
                    ${show ? "translate-y-0" : "-translate-y-10"}
        `}
      >
        {/* Close Button with corner icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--bg-primary)]"
        >
          <MdClose size={24} />
        </button>

        {/* The action to be performed */}
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <p className="mb-6">
          You are about to{" "}
          <span className="text-[var(--accent-primary)] font-semibold">
            {action}
          </span>
          .
        </p>

        {/* Buttons for closure and confirmation */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[var(--bg-primary)] hover:bg-blue-800 text-white text-sm font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
