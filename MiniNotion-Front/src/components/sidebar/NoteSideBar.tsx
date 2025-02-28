import { Ellipsis, FileText, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { removePage } from "../../providers/PageProvider";

type Note = {
    name: string;
    id: string;
    focus: boolean
}

export default function NoteSideBar({ name, id, focus }: Note) {
    const [dropdownisOpen, setDropdownIsOpenIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: "auto", bottom: "auto" });


    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownIsOpenIsOpen(false);
        }
    }
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })

    useEffect(() => {
        if (dropdownisOpen) {
          const rect = dropdownRef.current.getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;
          const spaceAbove = rect.top;
    
          if (spaceBelow < 10 && spaceAbove > spaceBelow) {
            setDropdownPosition({ top: "auto", bottom: `10px`});
          } else {
            setDropdownPosition({ top: `${rect.bottom-10}px`, bottom: "auto" });
          }
        }
      }, [dropdownisOpen]);

    return (
        <div className="mt-0.5" ref={dropdownRef}>
            <div className={`flex items-center px-2 py-1 rounded-lg ${focus ? "text-neutral-100": "text-neutral-400"} ${focus ? "bg-stone-700": "hover:bg-stone-700"}  group/noteSide`}>
                <a href={`/${id}`} className={`flex items-center w-full select-none transition-colors duration-200 text-sm font-semibold`}>
                    <FileText className={`h-5 w-5 ${focus ? "text-neutral-100": "text-neutral-400"} mr-2`}/>
                    <span className="truncate max-w-[150px]">{name}</span>
                </a>
                <Ellipsis className="h-5 w-5 text-neutral-400 hover:text-neutral-100 ml-auto transition-opacity duration-300 opacity-0 group-hover/noteSide:opacity-100" onClick={() => setDropdownIsOpenIsOpen(!dropdownisOpen)}/>
            </div>
            {dropdownisOpen && (
                <div className="absolute w-56 -right-24 p-1 mt-2 z-10 shadow-md bg-stone-800 border border-stone-500 rounded-lg" style={{ top: dropdownPosition.top, bottom: dropdownPosition.bottom }}>
                    <button className="flex items-center w-full px-2 py-0.5 text-sm rounded-lg select-none hover:bg-stone-700 hover:text-red-500" onClick={() => removePage(id)}>
                        <Trash2 className="h-5 w-5 mr-2"/>
                        Remover página
                    </button>
                </div>
            )}
        </div>
    )
}