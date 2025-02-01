import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ElementRootProps {
    children: ReactNode;
    id: string;
}

export function ElementRoot({children, id, ...rest}: ElementRootProps) {
    return (
        <div id={id} className={twMerge("mt-4 hover:bg-neutral-800/25 rounded", rest.className)}>
            {children}
        </div>
    )
}