import { File, Ellipsis } from "lucide-react";

type Note = {
    name: string;
    id: string;
}

function NoteSideBar({ name = "Nova nota", id }: Note) {
    return (
        <a href="" className="flex px-2 py-1 rounded hover:bg-stone-700 transition-colors duration-200 font-bold group/noteSide">
            <File className="h-6 w-6 text-zinc-100 mr-2" />
            {name}
            <Ellipsis className="h-6 w-6 text-zinc-100 ml-auto transition-opacity duration-300 opacity-0 group-hover/noteSide:opacity-100" />
        </a>
    )
}

export default NoteSideBar