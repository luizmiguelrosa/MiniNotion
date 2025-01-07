import { ReactNode } from "react";
import Element from "./Element";

class TitleElement extends Element {
    render(): ReactNode {
        const { id, reference, level } = this.props;

        return (
            <div id={id} ref={reference} className="" suppressContentEditableWarning contentEditable placeholder={`Titulo ${level}`}></div>
        )
    }
}

export default TitleElement;