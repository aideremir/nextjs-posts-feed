import React from "react";

const ModalDeleteConfirm = ({ isOpen, onCancel, onApprove }) => {
  const handleDelete = () => {
    onApprove();
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="modal dialog"
      className={`fixed inset-0 z-50 overflow-auto ${
        isOpen ? "block" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white p-4 w-full max-w-md mx-auto rounded-xl">
          <div>
            <h3 className="text-lg font-semibold">Delete Post</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this post?
            </p>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              aria-label="Cancel"
              className="bg-gray-200 text-gray-500 rounded-md px-4 py-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              role="button"
              type="button"
              aria-label="Delete"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteConfirm;
