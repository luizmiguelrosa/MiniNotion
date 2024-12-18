document.addEventListener('DOMContentLoaded', ()=> {
    const main = document.querySelector('main');
    var lastJSONContent;

    setInterval(function(){
        let elements = document.querySelectorAll('.editable');
        //console.log(Array.from(elements))
        let jsonData = Array.from(elements).map(element => ({
            type: element.getAttribute('element'),
            tag: element.tagName.toLowerCase(),
            content: element.innerText,
        })).filter((item, index, array) => {
        // Ignore o elemento se o texto for igual ao do próximo elemento
        return index === array.length - 1 || !(item.type == null && array[index + 1].type !== null);
    });

        let currentJSONString = JSON.stringify(jsonData);
        if (lastJSONContent !== currentJSONString) {
            lastJSONContent = currentJSONString
            //console.log(currentJSONString)
        }
    }, 1000)

    document.addEventListener('click', (event)=> {
        const elements = main.getElementsByClassName('editable');
        let lastElement = elements[elements.length - 1];

        if (event.target == main) {
            if (lastElement.firstChild) createNoteElement(main);
            else elementFocus(lastElement);
        }
    });

    document.addEventListener('keyup', handleKeyNavigation);
    document.addEventListener('input', handleInput);

    function handleKeyNavigation(event) {
        let { key, target } = event;

        if (key === 'Backspace' && target.classList.contains('editable')) {
            handleBackspace(target);
        } else if (['ArrowUp', 'ArrowDown'].includes(key) && target.classList.contains('editable')) {
            navigateEditable(key, target);
        }
    }

    function navigateEditable(key, target) {
        const elements = main.getElementsByClassName('editable');
        let nextElement, lastElement;

        if (key === 'ArrowDown') {
            for (let i = 0; i < elements.length - 1; i++) {
                if (elements[i] === target && i + 1 < elements.length) {
                    nextElement = elements[i + 1].parentElement === main ? elements[i + 1] : elements[i + 2];
                    break;
                }
            }
            if (nextElement) elementFocus(nextElement);
        } else if (key === 'ArrowUp') {
            for (let i = elements.length - 1; i >= 0; i--) {
                if (elements[i] === target && i - 1 >= 0) {
                    lastElement = elements[i - 1];
                    break;
                }
            }
            if (lastElement) elementFocus(lastElement);
        }
    }

    function handleBackspace(target) {
        if (!target.parentElement.classList.contains('header') && target.innerText === '') {
            target.remove();
            let lastChild = main.lastElementChild;
            elementFocus(lastChild && lastChild.firstChild ? lastChild.firstChild : lastChild);
        }
    }

    function handleInput(event) {
        const element = event.target;
        if (element.classList.contains('editable')) {
            const text = element.innerText;
            if (/^(#+) (.*)/.test(text)) createTitle(element, text.match(/^(#+) (.*)/));
            if (/^(-+) (.*)/.test(text)) createList(element, text.match(/^(-+) (.*)/));
            console.log(element.lastChild.lastChild.innerHTML)
            if (element.lastChild && element.lastChild.innerHTML === '<br>') {
                element.lastChild.remove();
                createNoteElement(main);
            } else if (element.lastChild.lastChild && element.lastChild.lastChild.innerHTML === '<br>') {
                element.lastChild.lastChild.remove();
                createNoteElement(main);
            }
            if (text.trim() === '') element.innerHTML = '';
        }
    }
})