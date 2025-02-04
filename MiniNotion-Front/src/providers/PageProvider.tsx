const baseURL = "http://localhost:3000/page"

export interface PageSideBarInterface {
    _id: string,
    name: string,
    parentPage: string
}

export interface PageInterface extends PageSideBarInterface {
    content: object[]
}

export class PageProvider {
    constructor() {}

    private async sendQuery<T>(method: string, url: string, body?: object, headers = { "Content-Type": "application/json" }): Promise<T> {
        try {
            const response = await fetch(`${baseURL}/${url}`, {
                method,
                headers: headers,
                body: body ? JSON.stringify(body) : null
            });
            if (!response.ok) throw new Error(response.statusText);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getAll(): Promise<PageSideBarInterface[]> {
        return await this.sendQuery<PageSideBarInterface[]>("GET", "");
    }

    async getPage(pageID: string): Promise<PageInterface> {
        return await this.sendQuery<PageInterface> ("GET", `${pageID}`);
    }
    
     async createPage(): Promise<PageInterface> {
        return await this.sendQuery<PageInterface> ("POST", "", { name: "Nova Pagina" });
    }

    async createElement(pageID: string, position: number, newElement: object): Promise<PageInterface> {
        return await this.sendQuery<PageInterface> ("POST", `${pageID}/${position}`, newElement);
    }

    async removeElement(pageID: string, elementID: string): Promise<PageInterface> {
        return await this.sendQuery<PageInterface> ("DELETE", `${pageID}/${elementID}`);
    }

    async updateElement(pageID: string, elementID: string, newElement: object): Promise<PageInterface>  {
        return await this.sendQuery<PageInterface> ("PATCH", `${pageID}/${elementID}`, newElement);
    }
}