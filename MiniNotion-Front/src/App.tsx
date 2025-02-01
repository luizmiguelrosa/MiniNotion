import { useParams } from "react-router-dom"
import Note from "./components/Note"
import SideBar from "./components/sidebar/SideBar"

function App() {
    const { pageID } = useParams();

    return (
        <div className="flex items-center h-screen">
            <SideBar/>
            
            {pageID && <Note pageID={pageID}/>}
        </div>
    )
}

export default App