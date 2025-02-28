interface InputProps {
    type: string, 
    label: string, 
    placeholder: string, 
    id: string,
    rounded?: string
}

export function Input({type, label, placeholder, id, rounded = ""}: InputProps) {
    return (
        <div className={`w-1/4 px-3 py-2 ${rounded} border border-stone-500`}>
            <div className="flex flex-col gap-0.5">
                <label htmlFor={id} className="text-sm font-medium text-neutral-200">
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    className="w-full focus:outline-none h-10 bg-transparent placeholder-neutral-200"
                    placeholder={placeholder}
                    
                />
            </div>
        </div>
    )
}