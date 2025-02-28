import { sendQuery } from "./Provider";

export interface PageSideBarInterface {
    _id: string,
    name: string,
    parentPage: string
}

export interface PageInterface extends PageSideBarInterface {
    content: object[]
}

export async function getAll(): Promise<PageSideBarInterface[]> {
    return await sendQuery<PageSideBarInterface[]>("GET", "page/");
}

export async function getPage(pageID: string): Promise<PageInterface> {
    return await sendQuery<PageInterface> ("GET", `page/${pageID}`);
}

export async function createPage(): Promise<PageInterface> {
    return await sendQuery<PageInterface> ("POST", "page/", { name: "Nova Pagina" });
}

export async function createElement(pageID: string, position: number, newElement: object): Promise<PageInterface> {
    return await sendQuery<PageInterface> ("POST", `page/${pageID}/${position}`, newElement);
}

export async function removeElement(pageID: string, elementID: string): Promise<PageInterface> {
    return await sendQuery<PageInterface> ("DELETE", `page/${pageID}/${elementID}`);
}

export async function updateElement(pageID: string, elementID: string, newElement: object): Promise<PageInterface>  {
    return await sendQuery<PageInterface> ("PATCH", `page/${pageID}/${elementID}`, newElement);
}

export async function removePage(pageID: string): Promise<PageInterface> {
    return await sendQuery<PageInterface> ("DELETE", `page/${pageID}`);
}