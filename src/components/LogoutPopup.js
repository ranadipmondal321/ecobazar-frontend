import React from "react";

export default function LogoutPopup({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-xl shadow-xl w-80 p-6 text-center animate-scaleIn">
        
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Confirm Logout
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          Are you sure you want to logout?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}