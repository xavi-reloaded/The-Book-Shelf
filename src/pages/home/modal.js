import React from 'react';

const Modal = ({ showModal, onClose, children }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-6 w-full h-full max-w-3xl md:max-h-[90%]">
                <button className="float-right text-gray-600 text-2xl" onClick={onClose}>
                    &times;
                </button>
                <div className="mt-4 overflow-auto h-[calc(100%-50px)] p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
