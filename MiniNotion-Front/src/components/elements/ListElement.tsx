import {Element, ElementProps} from "./element/Element";
import { Dot } from "lucide-react";

export default function ListElement({id, reference, text}: ElementProps) {
    return (
        <Element.Root id={id} className="flex">
            <Dot strokeWidth={3}/>
            <Element.Editable reference={reference} placeholder="Item da Lista" text={text}/>
        </Element.Root>
    )
}