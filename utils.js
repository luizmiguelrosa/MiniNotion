// utils.js
function elementFocus(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

function createNoteElement(main) {
    let div = document.createElement('div');
    div.classList.add('editable');
    div.setAttribute('contenteditable', 'true');
    div.setAttribute('placeholder', 'Digite aqui seu texto...');

    main.appendChild(div)

    elementFocus(div)
}