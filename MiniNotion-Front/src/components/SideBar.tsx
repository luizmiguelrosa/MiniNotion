import NoteSideBar from "./NoteSideBar"
import './SideBar.css'

function SideBar() {
    return (
        <>
            <aside className="overflow-y-scroll w-80 h-screen px-2 pt-4 border-r-2 border-stone-600 bg-stone-800 opacity-100 visible transition-transform duration-500">
                <div id="sidebarContent">
                    <NoteSideBar name="Teste IA"/>
                </div>
            </aside>
        </>
    )
}

export default SideBar