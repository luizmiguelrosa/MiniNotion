import { sendQuery, cookies } from "./Provider"
import * as PageProvider from "./PageProvider"
import { UserInterface } from "../components/sidebar/AccountDropdown"

interface AuthResponse {
    access_token: string,
    userID: string
}

export async function login(username: string, password: string): Promise<AuthResponse> {
    return await sendQuery("POST", "auth/login", {
        username: username,
        password: password
    })
}

export async function register(username: string, password: string, name: string, surname: string, email: string, ): Promise<AuthResponse> {
    return await sendQuery("POST", "auth/register", {
        username: username,
        password: password,
        name: name,
        surname: surname,
        email: email
    })
}

export function logout() {
    cookies.remove("access_token");
    cookies.remove("userID");
}

export async function isLoggedIn() {
    try {
        if (!cookies.get("access_token"))
            throw new Error("Not authenticated");
        await PageProvider.getAll();
        return true;
    } catch {
        return false;
    }
}

export async function getUser(userID: string): Promise<UserInterface> {
    return await sendQuery("GET", `users/${userID}`);
}