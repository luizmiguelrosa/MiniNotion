import Note from "./components/Note"
import SideBar from "./components/sidebar/SideBar"

function App() {
    return (
        <div className="flex items-center h-screen">
            <SideBar/>
            <Note/>
        </div>
    )
}

export default App