// elements.js
function createTitle(element, matchTitle) {
    let level = Math.min(matchTitle[1].length, 6); // Limita o nível do título entre 1 e 6
    let content = matchTitle[2];

    let title = document.createElement(`h${level}`);
    title.classList.add('editable');
    title.setAttribute('contenteditable', 'true');
    title.setAttribute('placeholder', `Título ${level}`);
    title.innerText = content;

    element.innerHTML = '';
    element.appendChild(title);

    elementFocus(title);
}

function createList(element, matchList) {
    element.style = 'display: flex; align-items: center;'

    let dot = document.createElement(`div`);
    dot.classList.add('dot')
    dot.innerText = '•'
    dot.style = 'margin-left: 0.5rem; margin-right: 0.5rem;' 

    let list = document.createElement(`div`);
    list.classList.add('editable');
    list.setAttribute('contenteditable', 'true');
    list.setAttribute('placeholder', `Lista`);

    element.innerHTML = '';
    element.appendChild(dot);
    element.appendChild(list);

    elementFocus(list);
}