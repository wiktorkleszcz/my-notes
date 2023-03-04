const types = JSON.parse(localStorage.getItem("types")) ?? [];
const values = JSON.parse(localStorage.getItem("values")) ?? [];

const addBtn = document.querySelector('.add')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtns = document.getElementsByClassName('delete-note')
const deleteAllBtn = document.querySelector('.delete-all')

const noteArea = document.querySelector('.note-area')
const notePanel = document.querySelector('.note-panel')
const category = document.querySelector('.category')
const textArea = document.querySelector('.text')
const error = document.querySelector('.error')
let selectedValue;


window.addEventListener('load', () => {

    for (let i = 0; i < types.length; i++) {
        const type = types[i]
        const value = values[i]

        createNote(type, value)
    }

})

const checkColor = note => {
    switch (selectedValue) {
        case 'Shopping':
            note.style.backgroundColor = 'var(--thistle)';
            break;
        case 'Job':
            note.style.backgroundColor = 'var(--rosequartz)';
            break;
        case 'Other':
            note.style.backgroundColor = 'var(--gray)';
            break;
    }
};

const openPanel = () => {
    notePanel.style.display = 'flex';
}

const closePanel = () => {
    notePanel.style.display = 'none'
    error.style.visibility = 'hidden'
    textArea.value = '';
    category.selectedIndex = 0;
}

const addNote = () => {
    if (textArea.value !== '' && category.options[category.selectedIndex].value !== '0') {
        
        const type = selectedValue
        const value = textArea.value

        types.push(type)
        values.push(value)

        localStorage.setItem("types", JSON.stringify(types));
        localStorage.setItem("values", JSON.stringify(values));

        createNote(type, value);
        error.style.visibility = 'hidden'
    } else {
        error.style.visibility = 'visible'
    }
}

const createNote = (type, value) => {
    const newNote = document.createElement('div');
    newNote.classList.add('note');

    const noteHead = document.createElement('div');
    noteHead.classList.add('note-header');
    newNote.appendChild(noteHead);

    const noteTitle = document.createElement('h3');
    noteTitle.classList.add('note-title');
    noteTitle.textContent = type;
    noteHead.appendChild(noteTitle);

    const deleteNote = document.createElement('button');
    deleteNote.classList.add('delete-note');
    noteHead.appendChild(deleteNote);


    const noteIcon = document.createElement('i');
    noteIcon.classList.add('fas');
    noteIcon.classList.add('fa-times');
    noteIcon.classList.add('icon');
    deleteNote.appendChild(noteIcon);

    const noteBody = document.createElement('div');
    noteBody.classList.add('note-body');
    noteBody.textContent = value;
    newNote.appendChild(noteBody);

    noteArea.appendChild(newNote);
    textArea.value = '';
    category.selectedIndex = 0;
    notePanel.style.display = 'none';

    selectedValue = type
    checkColor(newNote);
    deleteNote.addEventListener('click', () => noteDelete(newNote, type, value));
};

const selectValue = () => {
    selectedValue = category.options[category.selectedIndex].text;
};

const noteDelete = (newNote, type, value) => {
    JSON.parse(localStorage.getItem("types"))
    JSON.parse(localStorage.getItem("values"))
    const noteArea = document.querySelector('.note-area')
    noteArea.removeChild(newNote);
    types.pop(type);
    values.pop(value);
    localStorage.removeItem(type);
    localStorage.removeItem(value);
    localStorage.setItem("types", JSON.stringify(types));
    localStorage.setItem("values", JSON.stringify(values));
}

const deleteAllNotes = (type, value) => {
    JSON.parse(localStorage.getItem("types"))
    JSON.parse(localStorage.getItem("values"))
    noteArea.textContent = ''
    const types = []
    const values = []
    localStorage.removeItem(type);
    localStorage.removeItem(value);
    localStorage.setItem("types", JSON.stringify(types));
    localStorage.setItem("values", JSON.stringify(values));
}

addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
deleteAllBtn.addEventListener('click', deleteAllNotes)