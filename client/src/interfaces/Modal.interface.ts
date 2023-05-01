import React from "react";

export interface IModal {
    onClose: () => void;
    isOpen: boolean;
    children: React.ReactNode;
}
