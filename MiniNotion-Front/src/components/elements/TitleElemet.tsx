import {Element, ElementProps} from "./element/Element";

export default function TitleElement({id, reference, text, level}: ElementProps) {
    return (
        <Element.Root id={id}>
            <Element.Editable reference={reference} placeholder={`Titulo ${level}`} text={text} className={`font-bold text-h${level}`}/>
        </Element.Root>
    )
}