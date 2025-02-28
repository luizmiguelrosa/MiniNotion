import { PanelLeftClose, User } from "lucide-react";
import { useEffect, useState } from "react";
import * as AuthProvider from "../../providers/AuthProvider";
import { cookies } from "../../providers/Provider";

export interface UserInterface {
    username: string,
    name: string,
    surname: string,
    email: string
}

export function AccountDropdown({isHidden, toggleSideBar}) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<UserInterface>({});

    async function fetchUser() {
        const user = await AuthProvider.getUser(cookies.get("userID"));
        setUser(user);
    }

    useEffect(() => {
        fetchUser()
    })

    function handleClick(event) {
        if (!event.target.closest("#right-icon"))
            setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col gap-1 mx-2">
            <div className="flex items-center p-2 rounded-lg hover:bg-stone-700 group/account"  onClick={handleClick}>
                <User className="h-8 w-8 p-1 mr-2 bg-stone-700 rounded-lg"/>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm select-none truncate max-w-[150px]">
                        {user.name} {user.surname}
                    </span>
                    <span className="text-xs text-neutral-400 select-none truncate max-w-[150px]">{user.email}</span>
                </div>
                <PanelLeftClose id="right-icon" onClick={() => toggleSideBar()} className={`${isHidden ? "fixed left-64 visible" : ""} h-7 w-7 p-1 ml-auto hover:bg-stone-600 rounded-lg transition-opacity duration-300 opacity-0 ${isHidden ? "opacity-100": "group-hover/account:opacity-100"}`}/>
            </div>
            {isOpen && (
            <div className="border border-b-0 border-l-0 border-r-0 border-t-1 pt-1 border-t-stone-500">
                <button className="w-full font-semibold select-none text-left px-2 py-0.5 text-sm hover:bg-stone-600 rounded-lg" onClick={() => AuthProvider.logout()}>Sair</button>
            </div>
            )}
        </div>
    )
}