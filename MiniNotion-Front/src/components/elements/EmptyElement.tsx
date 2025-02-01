import {Element, ElementProps} from "./element/Element";

export default function EmptyElement({id, reference, text}: ElementProps) {
    return (
        <Element.Root id={id}>
            <Element.Editable reference={reference} placeholder="Digite aqui o seu texto..." text={text}/>
        </Element.Root>
    )
}