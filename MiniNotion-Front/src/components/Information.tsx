import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as PageProvider from "../providers/PageProvider";

export function Information() {
    const navigate = useNavigate();
    
    async function createPage() {
        await PageProvider.createPage().then((result => navigate(`/${result._id}`)))
    }

    return (
        <main className="flex flex-col gap-10 items-center h-screen overflow-y-scroll container mx-auto sm:p-6 lg:p-8">
            <h1 className="font-bold text-4xl select-none">Não possui página criada ?</h1>

            <div className="flex gap-24">
                <div className="flex gap-2">
                    <ArrowLeft />
                    <span className="select-none">Se sim, clique em alguma ao lado</span>
                </div>

                <div className="flex gap-2 px-2 hover:bg-stone-700 rounded" onClick={() => createPage()}>
                    <Plus />
                    <span className="select-none">Se não, crie uma página</span>
                </div>
            </div>
        </main>
    )
}