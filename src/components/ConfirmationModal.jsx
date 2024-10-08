import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="flex justify-center items-center z-50 fixed inset-0 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="mb-4">Are you sure you want to delete your account?</h2>
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
