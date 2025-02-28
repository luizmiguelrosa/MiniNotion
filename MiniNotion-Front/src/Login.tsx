import { useCookies } from "react-cookie"
import { Input } from "./components/inputs/Input"
import * as AuthProvider from "./providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";

export default function Login() {
    const [, setCookie,] = useCookies(["access_token", "userID"]);
    const [status, setStatus] = useState([]);
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const token = await AuthProvider.login(username, password);
            if (token?.access_token) {
                setCookie("access_token", token.access_token);
                setCookie("userID", token.userID);
                navigate("/");
            }
        } catch (error) {
            const erros = error.message.split("; ")
            setStatus(erros);
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2 fixed top-1 end-0 mt-3 me-3 z-1">
                {status.map((message) => {
                    return (
                        <div className="flex gap-2 px-2 py-1 bg-red-700 rounded-md">
                            <TriangleAlert className="h-6 w-6"/>
                            {message}
                        </div>
                    )
                })}
            </div>

            <form className="flex flex-col items-center justify-center min-h-screen gap-8" onSubmit={handleLogin}>
                <h1 className="text-h3">Entre na sua Conta</h1>

                <div className="flex flex-col items-center justify-center w-full">
                    <Input id="username" type="text" label="Usuário" rounded="rounded-t-lg" placeholder="Digite seu usuário"/>
                    <Input id="password" type="password" label="Senha" rounded="rounded-b-lg" placeholder="Digite sua senha"/>
                </div>

                <input type="submit" className="w-1/4 text-neutral-200 bg-stone-800 border border-stone-500 focus:outline-none hover:bg-stone-900 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5" value="Entrar"></input>

                <span>Não possui uma conta ? <a href="/register" className="text-stone-400 hover:underline">Crie agora</a></span>

                <a href="" className="text-stone-400 hover:underline" onClick={() => alert("Em desenvolvimento")}>Esqueci minha senha</a>
            </form>
        </div>
    )
}