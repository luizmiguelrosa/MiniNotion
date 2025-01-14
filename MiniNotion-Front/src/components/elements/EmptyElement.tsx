import {Element, ElementProps} from "./element/Element";

export default function EmptyElement({id, reference}: ElementProps) {
    return (
        <Element.Root id={id}>
            <Element.Editable reference={reference} placeholder="Digite aqui o seu texto..."/>
        </Element.Root>
    )
}