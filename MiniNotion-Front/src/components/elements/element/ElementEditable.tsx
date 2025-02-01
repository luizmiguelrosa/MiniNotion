import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ElementEditableProps {
    reference: React.RefObject<HTMLDivElement>;
    placeholder: string
    text?: string;
}

export function ElementEditable({reference, placeholder, text, ...rest}: ElementEditableProps) {
    useEffect(()=> {
        reference.current?.focus()
    })

    return (
        <div ref={reference} className={twMerge("editable w-full", rest.className)} suppressContentEditableWarning contentEditable placeholder={placeholder}>
            {text}
        </div>
    )
}