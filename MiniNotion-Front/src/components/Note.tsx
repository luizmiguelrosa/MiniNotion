import React, { createRef, useState } from "react"
import EmptyElement from "./elements/EmptyElement";
import TitleElement from "./elements/TitleElemet";
import ListElement from "./elements/ListElement";

interface ComponentData {
    id: string; 
    ref: React.RefObject<HTMLDivElement>; 
    type: string;
    text?: string;
    level?: number;
} 

export default function Note() {
    const [elements, setElements] = useState<ComponentData[]>([]);
    
    function getLastElement(): HTMLDivElement | null { 
        const lastElements = elements.at(-1);
        return lastElements?.ref.current || null;
    }

    function getFirstChild(): ChildNode | null {
        return getLastElement()?.firstChild || null;
    }

    function createElement(type: string, position: number = -1, text: string = ''): void {
        let newElement = {
            id: Date.now().toString(), 
            ref: createRef<HTMLDivElement>(), 
            type: type
        };

        if (type == 'title') {
            const matchTitle = text.match(/^(#+) (.*)/);
            const level = Math.min(matchTitle[1].length, 4);
            const content = matchTitle[2];
            
            newElement.text = content;
            newElement.level = level;  
        } else if (type == 'list') {
            const matchTitle = text.match(/^(-+) (.*)/);
            const content = matchTitle[2];
            
            newElement.text = content;
        }
        
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
    
    function removeElement(position: number): void {
        setElements((prevElements) => {
            const updatedElements = [...prevElements];
            updatedElements.splice(position, 1);
            return updatedElements;
        })

        const lastElement = elements[position - 1] || elements[position + 1]
        if (lastElement) lastElement.ref.current?.focus();
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

    function hasBR(element: HTMLElement): boolean {
        return element.nodeName === 'BR';
    }

    function findIndexByID(elementID: string): number {
        return elements.findIndex((comp) => comp.id == elementID)
    }

    function removeBreakPoints(element: HTMLElement): void {
        if (element.firstChild.lastChild && hasBR(element.firstChild.lastChild) && hasBR(element.lastChild.lastChild)) {
            element.firstChild.remove();
            element.lastChild.remove();
        }

        if (element.firstChild && hasBR(element.firstChild) && hasBR(element.lastChild))
            element.lastChild.remove();
    }

    function isNewLine(element: HTMLElement): boolean | null {
        return element.lastChild && element.lastChild.lastChild && hasBR(element.lastChild.lastChild)
    }
    
    function handleInput(event: React.FormEvent): void {
        console.log(event);
        
        const element = event.target as HTMLElement;
        const index = findIndexByID(element.parentElement.id);
        if (element.classList.contains('editable')) {
            const text = element.innerText;
            if (/^(#+) (.*)/.test(text)) {
                removeElement(index);
                createElement('title', index, text);
            } else if (/^(-+) (.*)/.test(text)) {
                removeElement(index);
                createElement('list', index, text);
            }
            
            removeBreakPoints(element);
            if (isNewLine(element)) {
                element.lastChild.remove();
                createElement('empty', index + 1);
            }
        }
    }
    
    function navigateEditable(key: string, target: HTMLElement): void {
        const index = findIndexByID(target.parentElement.id);
        const nextElement = key === 'ArrowDown' ? elements[index + 1] : elements[index - 1];

        if (nextElement) nextElement.ref.current?.focus();
    }
    
    function handleBackspace(target: HTMLElement) {
        if (target.innerText === '') {
            const index = findIndexByID(target.id)
            removeElement(index);
        }
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
                <div className="mb-4">
                    <h1 className="editable font-bold text-4xl" suppressContentEditableWarning contentEditable>Nova Nota</h1>
                </div>
                
                {elements.map((comp)=>{
                    switch (comp.type) {
                        case 'empty':
                            return <EmptyElement key={comp.id} id={comp.id} reference={comp.ref}/>
                        case 'title':
                            return <TitleElement key={comp.id} id={comp.id} reference={comp.ref} level={comp.level} text={comp.text}/>
                        case 'list':
                            return <ListElement key={comp.id} id={comp.id} reference={comp.ref} text={comp.text}/>
                    }
                })}
            </main>
        )
    
}