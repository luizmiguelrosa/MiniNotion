import { File, Ellipsis } from "lucide-react";

type Note = {
    name: string;
    id: string;
}

export default function NoteSideBar({ name, id }: Note) {
    function limitName(name: string, limit: number) {
        if (name.length <= limit) return name;

        const nameSplited = name.substring(0, limit - 1);
        return nameSplited + " ..."
    }

    return (
        <a href={`/${id}`} className="flex items-center px-2 py-0.5 rounded hover:bg-stone-700 transition-colors duration-200 text-sm font-semibold group/noteSide">
            <File className="h-5 w-5 text-zinc-100 mr-2"/>
            {limitName(name, 19)}
            <Ellipsis className="h-5 w-5 text-zinc-100 ml-auto transition-opacity duration-300 opacity-0 group-hover/noteSide:opacity-100" />
        </a>
    )
}