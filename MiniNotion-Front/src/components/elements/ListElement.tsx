import { ReactNode } from "react";
import Element from "./Element";
import { Dot } from "lucide-react";

class ListElement extends Element {
    render(): ReactNode {
        const { id, reference } = this.props;

        return (
            <div id={id} className="flex mt-4">
                <Dot strokeWidth={3}/>
                <div ref={reference} className="editable" suppressContentEditableWarning contentEditable placeholder="Item da Lista"></div>
            </div>
        )
    }
}

export default ListElement;