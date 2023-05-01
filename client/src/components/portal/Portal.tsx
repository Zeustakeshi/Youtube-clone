import { useEffect } from "react";
import { createPortal } from "react-dom";

const createPortalWrapper = () => {
    const element = document.createElement("div");
    element.id = "portal-wrapper";
    return element;
};

const portalWrapperElm = createPortalWrapper();

interface IPortal {
    children: React.ReactNode;
}

const Portal = ({ children }: IPortal) => {
    useEffect(() => {
        document.body.appendChild(portalWrapperElm);
    }, []);

    return createPortal(children, portalWrapperElm);
};

export default Portal;
