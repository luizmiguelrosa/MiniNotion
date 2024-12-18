function createDiv() {
    let div = document.createElement('div');
    div.innerHTML = '<svg class="h-4 w-4 text-zinc-300 transition-opacity duration-200 opacity-0 absolute -left-8 group-hover:opacity-100" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="5" cy="5" r="1" />  <circle cx="12" cy="5" r="1" />  <circle cx="19" cy="5" r="1" />  <circle cx="5" cy="12" r="1" />  <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" />  <circle cx="5" cy="19" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="19" cy="19" r="1" /></svg>'

    div.classList.add('flex', 'items-center', 'relative', 'mt-4', 'group')

    return div
}

function createTitle(element, matchTitle) {
    let level = Math.min(matchTitle[1].length, 4); // Limita o nível do título entre 1 e 6
    let content = matchTitle[2];

    let title = document.createElement(`h${level}`);
    title.classList.add('editable', 'font-bold');
    switch (level) {
        case 1:
            title.classList.add('text-2xl');
            break;
        case 2:
            title.classList.add('text-xl');
            break;
        case 3:
            title.classList.add('text-lg');
            break;
        case 4:
            title.classList.add('text-base');
            break;
    }
    title.setAttribute('element','titleElement');
    title.setAttribute('contenteditable', 'true');
    title.setAttribute('placeholder', `Título ${level}`);
    title.innerHTML = content;

    let div = createDiv();

    element.innerText = '';
    div.appendChild(title);
    element.appendChild(div)

    elementFocus(title);
}

function createList(element, matchList) {
    element.classList.add('flex', 'items-center');

    let dot = document.createElement('div');
    dot.classList.add('dot')
    dot.innerText = '•'
    dot.classList.add('mx-2') 

    let list = document.createElement('div');
    list.classList.add('editable');
    list.setAttribute('element','listElement');
    list.setAttribute('contenteditable', 'true');
    list.setAttribute('placeholder', 'Lista');

    let div = createDiv();

    element.innerHTML = '';
    div.appendChild(dot);
    div.appendChild(list);
    element.appendChild(div)

    elementFocus(list);
}