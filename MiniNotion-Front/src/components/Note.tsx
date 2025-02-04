import React, { createRef, useEffect, useRef, useState } from "react"
import EmptyElement from "./elements/EmptyElement";
import TitleElement from "./elements/TitleElemet";
import ListElement from "./elements/ListElement";
import PageTitleElement from "./elements/PageTitleElemet";
import { PageProvider, PageInterface } from "../providers/PageProvider";

interface ElementData {
    id: string; 
    ref: React.RefObject<HTMLDivElement>; 
    type: string;
    text?: string;
    level?: number;
} 

interface NoteProps {
    pageID: string
}

export default function Note({pageID}: NoteProps) {
    const [page, setPage] = useState<PageInterface>({})
    const [elements, setElements] = useState<ElementData[]>([]);
    const pageTitleRef = useRef<HTMLDivElement>(null);
    const pageProvider = new PageProvider();

    useEffect(() => {
        if (page?.content) {         
            setElements(() => []);   
            page.content.forEach(element => {
                addElement(element.type, -1, element.text, element.level, element._id);
            });
        }
    }, [page]);

    useEffect(() => {
        fetchPage();   
    }, [pageID]);

    async function fetchPage() {
        await pageProvider.getPage(pageID).then((result) => {
            setPage(result);
        })
    }
    
    function getLastElement(): HTMLDivElement | null { 
        const lastElements = elements.at(-1);
        return lastElements?.ref.current || null;
    }

    function getFirstChild(): ChildNode | null {
        return getLastElement()?.firstChild || null;
    }

    function findIndexByID(elementID: string): number {
        return elements.findIndex((comp) => comp.id == elementID)
    }

    function addElement(type: string, position: number = -1, text: string = '', level: number = 1, id: string = Date.now().toString()): void {
        let newElement = {
            id: id, 
            ref: createRef<HTMLDivElement>(), 
            type: type,
            text: text,
            level: level
        };
        
        setElements((prevElements) => {
            const updatedElements = [...prevElements];
            if (position === -1) {
                updatedElements.push(newElement);
            } else {
                updatedElements.splice(position, 0, newElement);
            }
            return updatedElements
        })
    }

    async function createElement(type: string, position: number = -1, text: string = '', level: number = 1): void {
        const newElement = { 
            type: type,
            text: text,
            level: level
        };

        await pageProvider.createElement(pageID, position, newElement).then((result) => {
            setElements(() => []);
            setPage(result);
        });
    }

    async function removeElement(position: number): void {
        const element = elements[position];
        if (!element) return;

        await pageProvider.removeElement(pageID, element.id);
        
        setElements((prevElements) => {
            const updatedElements = [...prevElements];
            updatedElements.splice(position, 1);
            return updatedElements;
        });

        const lastElement = elements[position - 1] || elements[position + 1]
        if (lastElement) lastElement.ref.current?.focus();
    }

    async function updateElement(element: HTMLElement, text: string) {
        let body: object;
        let elementID: string;
        
        if (element.parentElement.id && element.parentElement.id == pageID) {
            text = (text.length < 1) ? element.getAttribute("placeholder") : text;
            body = { name: text };
            elementID = "";
        } else {
            const elementInPage = page.content.find((element_) => element_._id == element.parentElement.id);
            body = {
                type: elementInPage.type, 
                text: text, 
                level: elementInPage.level
            };
            elementID = elementInPage._id;
        }

        await pageProvider.updateElement(pageID, elementID, body);
    }
    
    async function handleInput(event: React.FormEvent): void {
        const element = event.target as HTMLElement;
        if (!element.classList.contains('editable')) return;
        
        const index = findIndexByID(element.parentElement.id);
        const breakPoint = element.innerText.search("\n");
        
        if (event.nativeEvent.inputType === 'insertParagraph' && breakPoint > -1) {
            const splited = element.innerText.split("\n");
            element.lastChild?.remove()
            
            await updateElement(element, splited[0]);
            await createElement('empty', index + 1, splited[1])
        } else if (event.nativeEvent.inputType === 'insertText') {
            const text = element.innerText;
            if (/^(#+) (.*)/.test(text)) {
                const [, hashes, content] = text.match(/^(#+) (.*)/);
                await removeElement(index);
                await createElement('title', index, content, Math.min(hashes.length, 4));
            } else if (/^(-+) (.*)/.test(text)) {
                const [, , content] = text.match(/^(-+) (.*)/);
                await removeElement(index);
                await createElement('list', index, content);
            } else
                await updateElement(element, text);
        }
    }
    
    function handleClick(event: React.MouseEvent): void {
        const target = event.target as HTMLElement;
        if (!target.classList.contains('editable')) {
            if (getFirstChild() || elements.length == 0)
                createElement('empty');
            else
                getLastElement()?.focus();
        }
    }

    function navigateEditable(key: string, target: HTMLElement): void {
        const index = findIndexByID(target.parentElement.id);
        const nextElement = key === 'ArrowDown' ? elements[index + 1] : elements[index - 1];

        if (nextElement) nextElement.ref.current?.focus();
    }
    
    function handleBackspace(target: HTMLElement) {
        const breakPoint = target.innerText.search("\n");
        if (target.innerText === '' && breakPoint == -1) {
            const index = findIndexByID(target.parentElement.id)
            removeElement(index);
        } else if (breakPoint == 0) {
            target.innerText = '';
            updateElement(target, '');
        } else
            updateElement(target, target.innerText);
    }
    
    function handleKeyUp(event: React.KeyboardEvent) {
        const { key, target } = event;

        if (key === 'Backspace' && target.classList.contains('editable'))
            handleBackspace(target);
        else if (['ArrowUp', 'ArrowDown'].includes(key) && target.classList.contains('editable'))
            navigateEditable(key, target);
    }

    return (
            <main onKeyUp={handleKeyUp} onClick={handleClick} onInput={handleInput} className="h-screen overflow-y-scroll container mx-auto sm:p-6 lg:p-8">
                <PageTitleElement id={page._id} reference={pageTitleRef} text={page.name}/>
                
                {elements.map((comp)=>{
                    switch (comp.type) {
                        case 'empty':
                            return <EmptyElement key={comp.id} id={comp.id} reference={comp.ref} text={comp.text}/>
                        case 'title':
                            return <TitleElement key={comp.id} id={comp.id} reference={comp.ref} level={comp.level} text={comp.text}/>
                        case 'list':
                            return <ListElement key={comp.id} id={comp.id} reference={comp.ref} text={comp.text}/>
                    }
                })}
            </main>
        )
}