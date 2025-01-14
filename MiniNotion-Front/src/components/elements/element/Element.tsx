import React from "react"
import { ElementRoot } from "./ElementRoot";
import { ElementEditable } from "./ElementEditable";

export interface ElementProps{
    id: string;
    reference: React.RefObject<HTMLDivElement>;
    text: string;
    level?: number
}

export const Element = {
    Root: ElementRoot,
    Editable: ElementEditable
}