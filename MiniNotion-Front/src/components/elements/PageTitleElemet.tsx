import {Element, ElementProps} from "./element/Element";

export default function PageTitleElement({id, reference, text}: ElementProps) {
    return (
        <Element.Root id={id}>
            <Element.Editable reference={reference} placeholder={`Nova Pagina`} text={text} className={`font-bold text-4xl`}/>
        </Element.Root>
    )
}