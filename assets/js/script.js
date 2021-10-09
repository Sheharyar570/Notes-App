const notes = localStorage.getItem('notes');
const addNoteBtn = document.getElementById('add_note_btn');
const saveBtn = document.getElementById('save_note');

addNoteBtn.addEventListener('click', addNewNote);
saveBtn.addEventListener('click', saveNote);

// console.log(JSON.parse(notes));
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


function addNewNote() {
    const noteTextarea = document.getElementById('note_textarea');
    const editNotesHeader = document.getElementsByClassName('edit_notes_header')[0];
    noteTextarea.removeAttribute('readonly');
    editNotesHeader.style.display = "block";
    this.style.display = "none";
    noteTextarea.focus();
    
}

function saveNote() {
    const noteTextarea = document.getElementById('note_textarea');
    const noteText = noteTextarea.value;
    
    const note = {
        id: Date.now(),
        text: noteText.trim()
    }

    const notesList = JSON.parse(localStorage.getItem('notes'));
    notesList.push(note);
    localStorage.setItem('notes', JSON.stringify(notesList));
}