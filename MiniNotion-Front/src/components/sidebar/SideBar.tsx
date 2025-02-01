import { useEffect, useState } from "react"
import NoteSideBar from "./NoteSideBar"
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [sections, setSections] = useState({
        pessoal: true
    })

    async function fetchPages() {
        try {
            const response = await fetch("http://localhost:3000/page/all");

            if (!response.ok)
                throw new Error(response.statusText);

            const result = await response.json();
            
            setPages(result);
        } catch (error) {
            console.log(error);
        }
    }

    function toggleSection(section: string) {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    async function createNewPage() {
        try {
            const response = await fetch("http://localhost:3000/page/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "Nova Pagina"
                })
            });

            if (!response.ok)
                throw new Error(response.statusText);

            const result = await response.json();

            navigate(`/${result._id}`);
            fetchPages();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPages();
        
        const interval = setInterval(fetchPages, 2500);
        return () => clearInterval(interval);
    }, [])

    return (
        <aside className="overflow-y-scroll sm:w-64 lg:w-80 h-screen px-2 pt-4 border-r-2 border-stone-600 bg-stone-800 opacity-100 visible transition-transform duration-500">
            <div id="sidebarContent">
                <div onClick={(event) => event.target.classList.contains("group/section") && toggleSection("pessoal")} className="flex items-center px-2 py-0.5 rounded hover:bg-stone-700 group/section">
                    <span className="font-semibold text-sm select-none">Pessoal</span>
                    <Plus onClick={() => createNewPage()} className="h-4 w-4 ml-auto hover:bg-stone-600 rounded transition-opacity duration-300 opacity-0 group-hover/section:opacity-100"/>
                </div>
                {sections.pessoal && pages.map((item) => (
                    <NoteSideBar name={item.name} key={item._id} id={item._id}/>
                ))}
            </div>
        </aside>
    )
}