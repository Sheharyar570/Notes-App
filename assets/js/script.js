const notes = localStorage.getItem('notes');
const addNoteBtn = document.getElementById('add_note_btn');
const saveBtn = document.getElementById('save_note');
const deleteBtn = document.getElementById('delete_note');
const editBtn = document.getElementById('edit_note');
const editNotesHeader = document.getElementsByClassName('edit_notes_header')[0];
const noteTextarea = document.getElementById('note_textarea');

addNoteBtn.addEventListener('click', addNewNote);
saveBtn.addEventListener('click', saveNote);
editBtn.addEventListener('click', editNote);
deleteBtn.addEventListener('click', deleteNote);

populateNotesList(JSON.parse(notes));

function populateNotesList(notes) {
    const notesList = document.getElementById('notes_list');

    notes.forEach(note => {
        let text = document.createTextNode(note.text);
        let note_item = document.createElement("div");
        let paragraph = document.createElement("p");
        
        paragraph.appendChild(text)
        note_item.appendChild(paragraph);
       
        note_item.className = "note_list_item";
        note_item.setAttribute('data-id', note.id);
        note_item.addEventListener('click', displayNote);
        notesList.appendChild(note_item);
    });
}

function displayNote() {
    noteTextarea.value = "";
    
    editNotesHeader.style.display = "block";
    saveBtn.style.display = "none";
    deleteBtn.setAttribute('data-note_id', this.getAttribute('data-id'));
    
    const notesList = JSON.parse(localStorage.getItem('notes'));
    notesList.forEach(note => {
        if(note.id == this.getAttribute('data-id')) {
            noteTextarea.value = note.text;
        }
    });
}


function addNewNote() {
    noteTextarea.removeAttribute('readonly');
    editNotesHeader.style.display = "block";
    this.style.display = "none";
    noteTextarea.focus();
    
}

function saveNote() {
    const noteText = noteTextarea.value;
    
    const note = {
        id: Date.now(),
        text: noteText.trim()
    }

    const notesList = JSON.parse(localStorage.getItem('notes'));
    notesList.push(note);
    localStorage.setItem('notes', JSON.stringify(notesList));
}

function saveNote() {

}

function saveNote() {

}