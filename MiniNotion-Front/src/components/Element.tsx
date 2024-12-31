import React from "react"

interface Element{
    id: number;
    reference: React.RefObject<HTMLDivElement>; 
}


class EmptyElement extends React.Component{
    constructor(props: Element) {
        super(props);
        setTimeout(()=> {props.reference.current?.focus()}, 50)
        
    }
    render(): React.ReactNode {
        return (
            <div id={this.props.id} ref={this.props.reference} className="editable mt-4 hover:bg-neutral-800/25 rounded" suppressContentEditableWarning contentEditable placeholder="Digite aqui o seu texto..."></div>
        )
    }
}

export default EmptyElement;