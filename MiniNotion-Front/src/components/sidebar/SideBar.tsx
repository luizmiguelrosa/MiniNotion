import { useEffect, useState } from "react"
import NoteSideBar from "./NoteSideBar"
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as PageProvider from "../../providers/PageProvider";
import { AccountDropdown } from "./AccountDropdown";
import { isLoggedIn } from "../../providers/AuthProvider";

export default function SideBar({pageID}) {
    const navigate = useNavigate();
    const [pages, setPages] = useState<PageProvider.PageSideBarInterface[]>([]);
    const [isHidden, setIsHidden] = useState(false);
    const [sections, setSections] = useState({
        pessoal: true
    })

    async function fetchPages() {
        if (await isLoggedIn())
            await PageProvider.getAll().then((result) => {          
                setPages(result);
            });
        else 
            navigate("/login");
    }

    function toggleSection(section: string) {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    function toggleSideBar() {
        setIsHidden(!isHidden);
    }

    async function createPage() {
        await PageProvider.createPage().then((result => {
            navigate(`/${result._id}`);
            fetchPages();
        }))
    }

    useEffect(() => {
        fetchPages();
        
        const interval = setInterval(fetchPages, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <aside className={`flex flex-col gap-6 sm:w-64 lg:w-80 h-screen pt-4 border-r-2 border-stone-600 bg-stone-800 transition-transform duration-300 ${!isHidden ? "translate-x-0 z-10" : "-translate-x-full"}`}>
            <AccountDropdown isHidden={isHidden} toggleSideBar={toggleSideBar}/>

            <div id="sidebarContent" className="overflow-y-auto px-2">
                <div onClick={(event) => !event.target.classList.contains("transition-opacity") && toggleSection("pessoal")} className="flex items-center px-2 py-1 rounded-lg hover:bg-stone-700 group/section">
                    <span className="font-semibold text-xs select-none">Pessoal</span>
                    <Plus onClick={() => createPage()} className="h-5 w-5 p-0.5 ml-auto hover:bg-stone-600 rounded-lg transition-opacity duration-300 opacity-0 group-hover/section:opacity-100"/>
                </div>
                {sections.pessoal && pages.map((item) => (
                    <NoteSideBar name={item.name} key={item._id} id={item._id} focus={item._id == pageID}/>
                ))}
            </div>
        </aside>
    )
}