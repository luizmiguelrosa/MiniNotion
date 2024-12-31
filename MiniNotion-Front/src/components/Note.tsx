import React, { createRef } from "react"
import EmptyElement from "./Element";

interface ParentState {
    components: {
        id: number; 
        ref: React.RefObject<HTMLDivElement>; 
        type:string
    }[];
} 

class Note extends React.Component <{}, ParentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            components: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    getLastElement(): HTMLDivElement | null { 
        const lastComponent = this.state.components.at(-1);
        return lastComponent?.ref.current || null;
    }

    getFirstChild(): ChildNode | null {
        return this.getLastElement()?.firstChild || null;
    }

    createElement(type: string, position: number) {
        const newElement = {
            id: Date.now(), 
            ref: createRef<HTMLDivElement>(), 
            type: type
        };
        
        this.setState((prevState) => {
            const updatedComponents = [...prevState.components];
            if (position === -1) {
                updatedComponents.push(newElement);
            } else {
                updatedComponents.splice(position, 0, newElement);
            }
            return { components: updatedComponents };
        })
    }

    removeElement(position: number) {
        this.setState((prevState) => {
            const updatedComponents = [...prevState.components];
            updatedComponents.splice(position, 1);
            return { components: updatedComponents };
        })

        const lastElement = this.state.components[position - 1] || this.state.components[position + 1]
        if (lastElement) lastElement.ref.current?.focus();
    }

    handleClick(event: React.MouseEvent) {
        if (!event.target.classList.contains('editable')) {
            if (this.getFirstChild() || this.state.components.length == 0)
                this.createElement('empty', -1);
            else
                this.getLastElement()?.focus();
        }
    }

    hasBR(element): boolean {
        return element.nodeName === 'BR';
    }

    findIndexByID(elementID: number) {
        return this.state.components.findIndex((comp) => comp.id == elementID)
    }

    handleInput(event) {
        const element = event.target;
        if (element.classList.contains('editable')) {
            const text = element.innerText;
            
            if (element.firstChild.lastChild && this.hasBR(element.firstChild.lastChild) && this.hasBR(element.lastChild.lastChild)) {
                element.firstChild.remove();
                element.lastChild.remove();
            }
            
            if (element.lastChild && element.lastChild.lastChild && this.hasBR(element.lastChild.lastChild)) {
                element.lastChild.remove();
                const index = this.findIndexByID(element.id);
                
                this.createElement('empty', index + 1);
            }
        }
    }

    navigateEditable(key: string, target) {
        const index = this.findIndexByID(target.id);
        let nextElement;
        switch (key) {
            case 'ArrowDown':
                nextElement = this.state.components[index + 1];
                break;
            case 'ArrowUp':
                nextElement = this.state.components[index - 1];
                break;
            default:
                break;
        }
        if (nextElement) nextElement.ref.current?.focus();
    }

    handleBackspace(target) {
        if (target.firstChild && this.hasBR(target.firstChild) && this.hasBR(target.lastChild))
            target.lastChild.remove();
        else if (target.innerText === '') {
            const index = this.findIndexByID(target.id)
            this.removeElement(index);
        }
    }

    handleKeyUp(event) {
        const { key, target } = event;

        if (key === 'Backspace' && target.classList.contains('editable'))
            this.handleBackspace(target);
        else if (['ArrowUp', 'ArrowDown'].includes(key) && target.classList.contains('editable'))
            this.navigateEditable(key, target);
    }

    render(): React.ReactNode {
        const components = this.state.components.map((comp)=>{
            switch (comp.type) {
                case 'empty':
                    return <EmptyElement key={comp.id} id={comp.id} reference={comp.ref}/>
            }
        })

        return (
            <>
                <main onKeyUp={this.handleKeyUp} onClick={this.handleClick} onInput={this.handleInput} className="h-screen overflow-y-scroll container mx-auto sm:px-6 lg:px-8">
                    <div className="header">
                        <h1 className="editable font-bold text-4xl mt-8 mb-4" element="titleheader" suppressContentEditableWarning contentEditable>Nova Nota</h1>
                    </div>

                    {components}
                </main>
            </>
        )   
    }
}

export default Note