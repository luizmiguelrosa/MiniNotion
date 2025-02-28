import { useNavigate, useParams } from "react-router-dom"
import Note from "./components/Note"
import SideBar from "./components/sidebar/SideBar"
import { useEffect } from "react";
import { isLoggedIn } from "./providers/AuthProvider";
import { Information } from "./components/Information";


function App() {
    const { pageID } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isLoggedIn())
            navigate("/login");
    }, [])

    return (
        <div className="flex items-center h-screen">
            <SideBar pageID={pageID}/>
            
            {pageID ? <Note pageID={pageID}/> : <Information/>}
        </div>
    )
}

export default App