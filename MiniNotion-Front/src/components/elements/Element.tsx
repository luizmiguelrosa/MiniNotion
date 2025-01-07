import React from "react"

interface ElementInterface{
    id: string;
    reference: React.RefObject<HTMLDivElement>; 
}

class Element extends React.Component<ElementInterface> {
    componentDidMount(): void {
        this.props.reference.current?.focus()
    }
}

export default Element;