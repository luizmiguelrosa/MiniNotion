import Element from "./Element";

class EmptyElement extends Element{
    render(): React.ReactNode {
        const { id, reference } = this.props;

        return (
            <div id={id} ref={reference} className="editable mt-4" suppressContentEditableWarning contentEditable placeholder="Digite aqui o seu texto..."></div>
        )
    }
}

export default EmptyElement;