import NoteSideBar from "./NoteSideBar"

export default function SideBar() {
    return (
        <aside className="overflow-y-scroll sm:w-64 lg:w-80 h-screen px-2 pt-4 border-r-2 border-stone-600 bg-stone-800 opacity-100 visible transition-transform duration-500">
            <div id="sidebarContent">
                <NoteSideBar name="Teste IA" id=""/>
            </div>
        </aside>
    )
}