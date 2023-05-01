import { Portal } from "@mui/material";
import React from "react";
import { IModal } from "../../interfaces/Modal.interface";

const Modal: React.FC<IModal> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return <></>;
    return (
        <Portal>
            <div
                onClick={onClose}
                className="w-screen h-screen z-50 bg-black fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-opacity-30 flex justify-center items-center"
            >
                <div onClick={(e) => e.stopPropagation()}>{children}</div>
            </div>
        </Portal>
    );
};

export default Modal;
