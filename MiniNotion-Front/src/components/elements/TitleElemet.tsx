import { ReactNode } from "react";
import Element from "./Element";

class TitleElement extends Element {
    render(): ReactNode {
        const { id, reference, text, level } = this.props;

        return (
            <div id={id} ref={reference} className={`editable mt-4 font-bold text-h${level}`} suppressContentEditableWarning contentEditable placeholder={`Titulo ${level}`}>
                {text}
            </div>
        )
    }
}

export default TitleElement;